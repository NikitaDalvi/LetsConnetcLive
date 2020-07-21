/*jshint esversion: 6*/
import React,{useState,useEffect} from "react";
import EmployeeTableItem from "./subComponents/AdminPageItem";
import {Container,Paper,Button,TextField,Grid,makeStyles,CircularProgress,Backdrop,Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser,selectProfessionalList} from '../redux/user/user-selector';
import {setProfessionalList} from '../redux/user/user-actions';
import { API } from "../API";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function SPAdmin(props){
  const [EmployeeDetail, setDetail]=useState({
    FullName:"",
    EmailId:"",
    ContactNo:"",
    AddedBy:'',
    ServiceTypeId:'',
    CompanyId:'',
    Ticket:null
  });

  const[Employee,setEmployee]=useState([]);
  const[btnName,setBtn]=useState("Add");
  const[Identity,setID]=useState("");
  const[loading,setLoading] =useState(false);
  const [open, setOpen] = useState(false);
  const [alert,setAlert] = useState('');
  const [severity,setSeverity] = useState('error');

  const {currentUser} = props;

  function handleChange(event){
    const {name,value}=event.target;
    setDetail(prevValue=>{
      return{
        ...prevValue,
        [name]:value,
        AddedBy:currentUser.Id,
        ServiceTypeId:currentUser.ServiceTypeId,
        CompanyId:currentUser.CompanyId,
        Ticket: currentUser.Ticket
    };
  });
  }

  const {employeeList} = props;

  useEffect(()=>{

      if(currentUser){
        setLoading(true);
          const request = {
            CorporateAdminId: currentUser.Id,
            ticket: currentUser.Ticket
          };

          getEmployeeList(request)
          .then(res => {setEmployee(res);setLoading(false);});
      }


  },[currentUser]);

  async function getEmployeeList(data){
    const result = await axios.post(`${API.URL}GetServiceProviderListByCorporateAdmin`,data);
    return result.data.output;
  }

  async function Add(){
    // setEmployee(prevValue => {
    //   return [ ...prevValue,EmployeeDetail];
    // });
    setLoading(true);
    const res = await axios.post(`${API.URL}addServiceProvider`,EmployeeDetail);
    if(res){
      if(res.data.output){
        if(res.data.output === 'Email Id Already Exist'){
          setAlert('Email Id already exists! Please try another email Id');
          setSeverity('warning');
          setLoading(false);
          setOpen(true);

          return;
        }else{
          console.log(res.data.output);
          setEmployee(prevValue => {
            return[...prevValue,res.data.output];
          });
          setAlert('User added successfully!');
          setSeverity('success');
          setLoading(false);
          setOpen(true);
        }
      }
    }
      setDetail({
        name:"",
        email:"",
        contact:""
      });
  }

  function Edit(){
    var id = Identity+1;
    removeEmployee(id);
    Add();
    setBtn('Add')
  }

  function addEmployee(){
  btnName ==="Add" ?
  Add()
:Edit()
  }

  function removeEmployee(id){
    // var ID = id -1;
    // setEmployee(prevValue => {
    //   return prevValue.filter((Employee, index) => {
    //     return index !== ID;
    //   });
    // });
setLoading(true);
    const request = {
      Id: id,
      ticket:currentUser.Ticket
    };

    deactivatingUser(request)
    .then(res => {
      if(res === true){
        Employee.map(item => item.Id === id?{...item,userStatus:8}:item);
        setAlert('User deactivated successully!');
        setSeverity('success');
        setLoading(false);
        setOpen(true);
      }else{
        setAlert('User could not be deactivated!');
        setSeverity('error');
        setLoading(false);
        setOpen(true);
      }
    });
}

async function deactivatingUser(data){
  const result = await axios.post(`${API.URL}DeActivateAccount`,data);
  return result.data.output;
}

function handleEdit(id){
  var ID = id -1;
  var CA = Employee.filter((emp,index)=>{
    return index === ID;
  });
  setDetail({
    name: CA[0].name,
    email: CA[0].email,
    contact: CA[0].contact
  });
  console.log(ID);
  setID(ID);
  setBtn("Edit");
}
//8o8s0D
const useStyles = makeStyles((theme) => ({
  button:{
    width:'60%',
    height:'40px',
    background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
    color:'white'
  },
  backdrop: {
   zIndex: theme.zIndex.drawer + 1,
   color: '#fff',
 },
}));

const handleClose = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   setOpen(false);
 };

const classes = useStyles();
  return (

    <Container>
    <Backdrop className={classes.backdrop} open={loading} >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {alert}
        </Alert>
      </Snackbar>
    <br/>
      <Paper  style={{padding:'15px',height:'80px',textAlign:'center',marginBottom:'5%'}}>
        <Grid container>
          <Grid item xs={3} >
              <TextField label='Full Name' style={{width:'80%'}} onChange={handleChange} name="FullName"   placeholder="Fullname" value={EmployeeDetail.FullName} />
          </Grid>
          <Grid item xs={4}>
              <TextField label='Email Id' style={{width:'80%'}} onChange={handleChange} name="EmailId"  type="text" placeholder="Email" value={EmployeeDetail.EmailId} />
          </Grid>
          <Grid item xs={3}>
          <TextField label='Contact No' style={{width:'80%'}} onChange={handleChange} name="ContactNo" type="text" placeholder="Contact No." value={EmployeeDetail.ContactNo} />

          </Grid>
          <Grid item xs={2}>
                    <Button variant='login' onClick={addEmployee} className={classes.button}  type="submit"  >{btnName}</Button>
          </Grid>
        </Grid>
        </Paper>
        <div style={{textAlign:"center"}}>
        <p class="lead" style={{textDecoration:"underline"}}>Employee List</p>
        <table className="table admin-table">
          <thead>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact No.</th>
            <th scope="col">KYC Status</th>
            <th scope="col"></th>
          </thead>
          <tbody>
            {
              Employee.map((emp,index) => {
              return <EmployeeTableItem key={index} index={index+1} id={emp.Id} DP={emp.DPPath} name={emp.FullName} email={emp.EmailId} contact={emp.ContactNo} isRemove={removeEmployee} isEdit={handleEdit} kyc={emp.userStatus} />
            })
          }
          </tbody>
        </table>
</div>
      </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  employeeList:selectProfessionalList
})

const mapDispatchToProps = dispatch => ({
  setEmployeeList : value => dispatch(setProfessionalList(value))
})

export default connect(mapStateToProps,mapDispatchToProps)(SPAdmin);
