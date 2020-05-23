/*jshint esversion:9*/

import React,{useState,useEffect} from "react";
import Heading from "./subComponents/page-headings";
import ServiceItem from "./subComponents/ServiceListItems";
// import {Link} from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user-selector';
import {selectDropdownItems,selectServices,selectServiceType} from '../redux/service/service-selector';
import {setServiceType,addService,setDropdown,removeService,clearDropdown} from '../redux/service/service-actions';
import {withStyles,TableContainer,Paper,Table,TableHead,TableBody,TableCell,TableRow,TextField,Grid,FormControl,InputLabel,Select,MenuItem, makeStyles,Button,Typography} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import WarningIcon from '@material-ui/icons/Warning';
import SaveAltIcon from '@material-ui/icons/SaveAlt';


function ServicesProvide(props){
  // constructor(props){
  //   super(props);
  //   this.state={
  //     userId:'',
  //     Services:{
  //       Id:'',
  //       Service:"",
  //       Fee:"",
  //     }
  //
  //   }
  // }
  const [data,setData] = useState({
    Id:'',
    location:'',
    service:'',
    fees:'',
    type:''
  });

const {currentUser,AddToDropdown,clearDropdown,SetServiceType} = props;

  const [loading,setLoading] = useState(true);

  function handleChange(event){
    const {name,value} = event.target;
    if(name === 'service'){
        const service = props.dropdownList.find(service => service.Services === value);
        setData(prevValue => {
          return{...prevValue,
          Id:service.Id};
        });
    }
    setData(prevValue => {
      return{...prevValue,
      [name]:value};
    });
    console.log(data);
  }


  function addToList(){
    // setRow(prevValue => [...prevValue, data]);

    props.AddService(data);

    setData({
      Id:'',
      location:'',
      service:'',
      fees:'',
      type:''
    });
  }

  function editService(row){
    setData({
      Id:row.Id,
      location:row.location,
      service:row.service,
      fees:row.fees,
      type:row.type
    });
  }

  function removeService(service){
    props.removeService(service);
  }

async function saveToDatabase(){
    const postData = [];
    props.serviceList.map(service => {
      var type= '';
      switch (service.type) {
        case 'hour':
          type = 'PerHr';
          break;
        case 'month':
            type = 'PerMon';
            break;
        case 'assignment':
          type = 'PerAs';
          break;
        default:
          type='';
      }

      const entry = {
        ServiceId:service.Id,
        ServiceTypeId:props.serviceType,
        ServiceProviderId:currentUser.Id,
        Fees:service.fees,
        ServiceGiven:service.location,
        ServiceCharge:type
      };

      postData.push(entry);
    });

    const res = await axios.post('https://localhost:44327/api/AddService',postData);
    console.log(res);
  }

// async function getServices(){
//
//   if(loading){
//   if(props.currentUser!==null){
//   const data = {ServiceProviderId: props.currentUser.Id};
//   const result = await axios.post('https://localhost:44327/api/GetServiceTypesByUserId',data);
//   if(result!= null){
//          const serviceTypeId = result.data.output[0].ServiceTypeId;
//          props.SetServiceType(serviceTypeId);
//          const typeId = {ServiceTypeId: serviceTypeId};
//           const dropdownItems = await axios.post('https://localhost:44327/api/GetServices',typeId);
//             console.log(dropdownItems);
//             dropdownItems.data.output.map(item => (props.AddToDropdown(item)));
//             setLoading(false);
//             return 'success';
//           }else{
//             return 'failure';
//           }
//        }else{
//          return 'failure';
//        }
//      }
// }



  useEffect(()=>{
    const status = async() => {

      clearDropdown();
      if(currentUser!==null){
      const data = {ServiceProviderId: currentUser.Id};
      axios.post('https://localhost:44327/api/GetServiceTypesByUserId',data)
      .then((res) => {
          const serviceTypeId = res.data.output[0].ServiceTypeId;
          SetServiceType(serviceTypeId);
          const typeId = {ServiceTypeId: serviceTypeId};
          axios.post('https://localhost:44327/api/GetServices',typeId)
          .then((res) => {
              console.log(res);
              res.data.output.map(item => (AddToDropdown(item)));


          });


      });
    }else{
      console.log('fail');
    }
    };

    const Status =  status();
    console.log(Status);
  },[currentUser,AddToDropdown,clearDropdown,SetServiceType]);
//  async componentDidMount(){
//    if(this.props.currentUser!==null){
//      const data = {ServiceProviderId: this.props.currentUser.Id};
//      const result = await axios.post('https://localhost:44327/api/GetServiceType',data);
//      if(result!= null){
//        const serviceTypeId = result.data.output.ServiceTypeId;
//        this.props.SetServiceType(serviceTypeId);
//        const typeId = {ServiceTypeId: serviceTypeId};
//         const dropdownItems = await axios.post('https://localhost:44327/api/GetServices',typeId);
//         if(dropdownItems!=null){
//           console.log(dropdownItems);
//           dropdownItems.data.output.map(item => (this.props.AddToDropdown(item)));
//         }
//      }else{
//        console.log(null);
//      }
//
//
//
//    }
// }


 // handleChange=(event)=>{
 //    const{name, value} = event.target;
 //
 //    this.setState(prevState =>
 //  (  {
 //        Services:{
 //        ...prevState.Services,
 //        [name]:value
 //      }
 //    }
 //  ))
 //  }


 // handleClick=()=>{
 //    const services = this.state.Services;
 //    const existing = this.props.serviceList.find(item => item.Service === services.Service);
 //    if(existing == null){
 //          this.props.AddService(services);
 //    }else{
 //      alert('This service has already been selected!');
 //    }
 //
 //  };

// deleteItem=(Service)=>{
//   this.props.removeService(Service);
//   }


const useStyles = makeStyles((theme) => ({
  grid:{
    margin: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
  text:{
    marginTop:'8px'
  },
  button:{
    width:'100%',
    height:'50px',
    background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
    color:'white'
  },
  table: {
   minWidth: 700,
 },
 tableBtn:{
   margin: theme.spacing(1),
 }

}));



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const classes = useStyles();
  return (

    <div>
      <Grid container >
        <Grid item xs={3} className={classes.grid}>
          <Grid container>
            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
     <InputLabel id="demo-simple-select-outlined-label">Select Service Location</InputLabel>
     <Select
       labelId="demo-simple-select-outlined-label"
       id="demo-simple-select-outlined"
       label="Select Service Location"
       value={data.location}
       onChange={handleChange}
       name='location'
     >
       <MenuItem value="">
         <em>None</em>
       </MenuItem>
       <MenuItem value='OffShore'>Offshore</MenuItem>
       <MenuItem value='OnSite'>Onsite</MenuItem>
       <MenuItem value='Remote'>Remote</MenuItem>
     </Select>
   </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
     <InputLabel id="demo-simple-select-outlined-label">Select Service</InputLabel>
     <Select
       labelId="demo-simple-select-outlined-label"
       id="demo-simple-select-outlined"
       label="Select Service"
       value={data.service}
       onChange={handleChange}
       name='service'
     >
       <MenuItem value="">
         <em>None</em>
       </MenuItem>
       {props.dropdownList.map(item => (<MenuItem key={item.Id} value={item.Services}>{item.Services}</MenuItem>))}
     </Select>
   </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField className={classes.text} id="outlined-basic" name='fees' onChange={handleChange} value={data.fees} label="Fees" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
            <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Per</InputLabel>
      <Select
       labelId="demo-simple-select-outlined-label"
       id="demo-simple-select-outlined"
       label="Per"
       value={data.type}
       name='type'
       onChange={handleChange}
      >
       <MenuItem value="">
         <em>None</em>
       </MenuItem>
       <MenuItem value='hour'>hour</MenuItem>
       <MenuItem value='assignment'>assignment</MenuItem>
       <MenuItem value='month'>month</MenuItem>
      </Select>
      </FormControl>
            </Grid>
            <Grid item xs={12}>
            <Button className={classes.button} onClick={addToList} variant="contained" >
              ADD TO LIST &#10095;
            </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.grid}>

        <TableContainer component={Paper}>
   <Table className={classes.table} aria-label="customized table">
     <TableHead>
       <TableRow>
         <StyledTableCell>#</StyledTableCell>
         <StyledTableCell align="center">Location</StyledTableCell>
         <StyledTableCell align="center">Services</StyledTableCell>
         <StyledTableCell align="center">Fees</StyledTableCell>
         <StyledTableCell align="center">Action</StyledTableCell>
       </TableRow>
     </TableHead>
        <TableBody>
        {props.serviceList.map((row,index) => (
          <StyledTableRow key={index}>
            <StyledTableCell component="th" scope="row">
              {index+1}
            </StyledTableCell>
            <StyledTableCell align="right">{row.location}</StyledTableCell>
            <StyledTableCell align="right">{row.service}</StyledTableCell>
            <StyledTableCell align="right">{row.fees}/{row.type}</StyledTableCell>
            <StyledTableCell align="right">  <Button
         variant="contained"
         style={{backgroundColor:'#b71c1c',color:'white'}}
         className={classes.tableBtn}
         startIcon={<RemoveCircleOutlineIcon />}
         onClick={()=>removeService(row)}
       >
         Remove
       </Button>

       <Button
   variant="contained"
   style={{backgroundColor:'#1976d2',color:'white'}}
   className={classes.tableBtn}
   startIcon={<EditIcon />}
   onClick={()=>editService(row)}
 >
   Edit
 </Button>

       </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>

   </Table>

 </TableContainer>
   {props.serviceList.length === 0? <Typography variant='h5' style={{textAlign:'center',marginTop:'50px',color:'#bdbdbd'}}><WarningIcon/>  No services added yet!</Typography> :
   <div style={{width:'100%',textAlign:'right'}}>
    <Button className={classes.button} style={{width:'22%',margin:'5px'}} onClick={() =>{saveToDatabase();}} variant="contained"  startIcon={<SaveAltIcon/>}>
       Apply & Save
     </Button>
     </div>
   }
        </Grid>
        </Grid>
      </div>


  );


}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  dropdownList:selectDropdownItems,
  serviceList:selectServices,
  serviceType:selectServiceType
})

const mapDispatchToProps = dispatch => ({
  SetServiceType : serviceType =>dispatch(setServiceType(serviceType)),
  AddService : service => dispatch(addService(service)),
  AddToDropdown: service => dispatch(setDropdown(service)),
  removeService: service => dispatch(removeService(service)),
  clearDropdown: () => dispatch(clearDropdown())
})

export default connect(mapStateToProps,mapDispatchToProps)(ServicesProvide);




// <br/>
//   <Heading text="Tell us about services you wish to provide.."/>
//   <br/>
//   <div className="container Services-Container">
//     <div className="form-row pl-5">
//     <label className="col-lg-3" style={{marginTop:"10px"}}> You can provide services...</label>
//     <div className="col-lg-2">
//     <select name='Service' class="form-control" >
//     <option>Onsite</option>
//     <option>Offshore</option>
//     <option>Both</option>
// </select>
// </div>
//     </div>
//     <hr style={{width:'50%', marginLeft:'180px'}}/>
//     <div className="form-row pl-5">
//     <label className="col-lg-1" style={{marginTop:"10px"}}> Service</label>
//     <div className="col-lg-4">
//     <select name='Service' class="form-control" onChange={this.handleChange} value={this.state.Services.Service}>
//     <option></option>
//     {this.props.dropdownList.map(item => (item !== null ?item.Services != null?<option>{item.Services}</option>:<option></option>:''))}
// </select>
// </div>
//     <label className="col-lg-1" style={{marginTop:"10px"}}>Fees</label>
//     <div className="col-lg-2">
//     <input onChange={this.handleChange} name ="Fee" className="form-control"  type="text" placeholder="&#8377;/hour" value={this.state.Services.Fee}/>
//     </div>
//     <Button variant='login'  onClick={this.handleClick} className=" col-lg-1" style={{marginLeft:"20px"}}> Add </Button>
//     </div>
//     <br/>
//     <table className="table service-table">
//       <thead style={{color:"#4B66EA"}}>
//         <th scope="col">#</th>
//         <th scope="col">Service</th>
//         <th scope="col">Fees/hr</th>
//         <th scope="col"></th>
//       </thead>
//       <tbody>
//       {
//         this.props.serviceList.map((serviceItem, index) => (
//           <ServiceItem key={index} id={index+1} service={serviceItem} Name={serviceItem.Service} Fee={serviceItem.Fee} isClicked={this.deleteItem}/>
//         ))
//       }
//       </tbody>
//     </table>
//     <br/>
//     <Link to="/UserPage/ServiceProvider/Availability" style={{textDecoration: "none"}}>
//     <a><Button variant='login'  type="submit">Next</Button></a>
//     </Link>
//   </div>
