/*jshint esversion:9*/

import React,{useState,useEffect} from "react";
import Heading from "./subComponents/page-headings";
import ServiceItem from "./subComponents/ServiceListItems";
// import {Link} from "react-router-dom";
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user-selector';
import {selectDropdownItems,selectServices,selectServiceType,selectSavedServices} from '../redux/service/service-selector';
import {setServiceType,addService,setDropdown,removeService,clearDropdown,setSavedServices,setServicesProgress} from '../redux/service/service-actions';
import {setCurrentUser,setUserServiceStatus} from '../redux/user/user-actions';
import {Snackbar,withStyles,TableContainer,Paper,Table,TableHead,TableBody,TableCell,TableRow,TextField,Grid,FormControl,InputLabel,Select,MenuItem, makeStyles,Button,Typography} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import WarningIcon from '@material-ui/icons/Warning';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';


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
    location:localStorage.getItem('location') || null,
    service:'',
    fees:localStorage.getItem('fees') || '',
    type:localStorage.getItem('type') || null,
    workingDays: localStorage.getItem('workingDays') || null,
    otherService:''
  });

const {currentUser,AddToDropdown,clearDropdown,SetServiceType,setUserStatus,setSavedServices,savedServices} = props;

  const [loading,setLoading] = useState(true);
  const[locationError,setLocationError] = useState(false);
  const[serviceError,setServiceError] = useState(false);
  const[feesError,setFeesError] = useState(false);
  const[typeError,setTypeError] = useState(false);
  const[SavedServices,setSaveServices] = useState([]);

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
    debugger
    if(name === 'type' && value === 'Full-Time'){
      setOpen(true);
    }
    console.log(data);
  }


  function addToList(){
    // setRow(prevValue => [...prevValue, data]);
    if(data.location === ''){
      setLocationError(true);
      return;
    }else{
      setLocationError(false);
    }
    if(data.service === ''){
      setServiceError(true);
      return;
    }else{
      setServiceError(false);
    }
    if(data.fees === ''){
      setFeesError(true);
      return;
    }else{
      setFeesError(false);
    }
    if(data.type === ''){
      setTypeError(true);
      return;
    }else{
      setTypeError(false);
    }

    props.AddService(data);

    if(data.type==='Full-Time'){
      setData({
        Id:'',
        service:'',
        type:data.type,
        fees:data.fees,
        location:data.location,
        workingDays:data.workingDays
      });
    }else{
      setData({
        Id:'',
        service:'',
        fees:'',
        type:data.type,
        location:data.location
      });
    }

  }

  function editService(row){
    if(row.type==='Full-Time'){
      setData({
        Id:row.Id,
        service:row.service,
        fees:row.fees,
        type:data.type,
        location:data.location,
        workingDays:data.workingDays
      });
    }else{
      setData({
        Id:row.Id,
        service:row.service,
        fees:row.fees,
        type:data.type,
        location:data.location
      });
    }

  }

  function removeService(service){
    props.removeService(service);
  }

async function saveToDatabase() {
  var type = '';
  switch (data.type) {
    case 'hour':
      type = 'PerHr';
      break;
    case 'Full-Time':
      type = 'Full_Time';
      break;
    case 'assignment':
      type = 'PerAs';
      break;
    default:
      type = '';
  }
debugger
  const postData = {
    UserId: currentUser.Id,
    ServiceCharge: type,
    ServiceGiven: data.location,
    WorkingDays: data.workingDays,
    services: [],
    ticket: currentUser.Ticket
  };
  props.serviceList.map(service => {

    const entry = {
      ServiceId: service.Id,
      ServiceTypeId: props.serviceType,
      ServiceProviderId: currentUser.Id,
      Fees: service.fees
    };

    postData.services.push(entry);
  });
debugger
  if (type === 'Full_Time') {
    var days = 0;
    const modelData = {
      WorkingHours: [],
      ticket: currentUser.Ticket
    }
    // var hoursData = {
    //   ServiceProviderId: currentUser.Id,
    //   ServiceTypeId: props.serviceType,
    //   WorkingDays: null,
    //   TimeSlots: []
    // }
    const Timeslot = {
      StartTime: '9:00',
      EndTime: '18:30',
      BufferTime: '0'
    };
    if (data.workingDays === 'Monday_To_Friday') {
      for (var i = 0; i < 5; i++) {
        var hoursData = {
          ServiceProviderId: currentUser.Id,
          ServiceTypeId: props.serviceType,
          WorkingDays: i+1,
          TimeSlots: [Timeslot]
        };
        modelData.WorkingHours.push(hoursData);
      }
    } else {
      for (var j = 0; j < 6; j++) {
        var HoursData = {
          ServiceProviderId: currentUser.Id,
          ServiceTypeId: props.serviceType,
          WorkingDays: j+1,
          TimeSlots: [Timeslot]
        };
        modelData.WorkingHours.push(HoursData);
      }
    }
    const res = await saveWorkingHours(modelData);
    if(res==='success'){
      const result = await saveServices(postData);
      if (result === 'success') {
        const servicesSaved = {
          type: 1,
          ServiceCharge: type,
          ServiceGiven: data.location
        };
        const hoursSaved = {
          type: 2,
          ServiceCharge: type,
          ServiceGiven: data.location
        };
        setUserStatus(servicesSaved);
        setUserStatus(hoursSaved);
        if(currentUser.isLocationsAdded){
          props.setProgress(100);
        }else{
          props.setProgress(66);
        }
      }else{
        alert('unexpected error occured !');
      }
    }else{
      alert('unexpected error occured !');
    }
  } else {
    const result = await saveServices(postData);
    if (result === 'success') {
      const servicesSaved = {
        type: 1,
        ServiceCharge: type,
        ServiceGiven: data.location
      };
      setUserStatus(servicesSaved);
      if(currentUser.isLocationsAdded){
        props.setProgress(66);
      }else{
        props.setProgress(34);
      }
    }else{
      alert('unexpected error occured !');
    }
  }
}

 async function saveServices(postData){


    const res = await axios.post('https://localhost:44327/api/AddService',postData);
    if(res){
      if(res.data){
        if(res.data.responseCode === 200){
          console.log('hit');
                  return "success";
        }else{
          return 'fail';
        }
      }
    }
    console.log(res);
}

async function saveWorkingHours(workingHours){
  const res = await axios.post('https://localhost:44327/api/AddWorkingHours',workingHours);
  if(res){
    if(res.data){
      if(res.data.responseCode === 200){
        return 'success';
      }else{
        return 'fail';
      }
    }
  }
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

useEffect(() => {
  localStorage.setItem('location', data.location);
  localStorage.setItem('type',data.type);
  if(data.type==='Full-Time'){
    localStorage.setItem('fees',data.fees);
    localStorage.setItem('workingDays',data.workingDays);
  }
}, [data]);

useEffect(()=>{
  if(savedServices){
    console.log(savedServices);
    setSaveServices(savedServices);
  }
},[savedServices])



  useEffect(()=>{
    const status = async() => {

      clearDropdown();
      if(currentUser){
      const data = {
        ServiceProviderId: currentUser.Id,
        ticket:currentUser.Ticket
      };
      axios.post('https://localhost:44327/api/GetServiceTypesByUserId',data)
      .then((res) => {
          const serviceTypeId = res.data.output[0].ServiceTypeId;
          SetServiceType(serviceTypeId);
          const typeId = {
            ServiceTypeId: serviceTypeId,
            ticket:currentUser.Ticket
          };
          axios.post('https://localhost:44327/api/GetServices',typeId)
          .then((res) => {
              console.log(res);
              res.data.output.map(item => (AddToDropdown(item)));
              const savedServicesRequest = {
                ServiceProviderId: currentUser.Id,
                ticket: currentUser.Ticket
              };
              axios.post('https://localhost:44327/api/GetServiceListByServiceProviderId',savedServicesRequest)
              .then((res)=>setSavedServices(res.data.output))

          });


      });
    }else{
      console.log('fail');
    }
    };

    const Status =  status();
    console.log(Status);
  },[currentUser,AddToDropdown,clearDropdown,SetServiceType,setSavedServices]);
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
    margin: theme.spacing(1),
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
 },
 paper:{
   width:'80%',
   padding:'5px'
 },
 icon:{
   '&:hover':{
     cursor:'pointer'
   }
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const [open, setOpen] = useState(false);


const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

const classes = useStyles();

if(SavedServices.length === 0){
  return (

    <div>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Note: Full-Time Service-Providers will have preferred working hours of 9:00 am to 6:30 pm .
        </Alert>
      </Snackbar>

    <Grid container style={{marginLeft:'50px'}}>
      <Grid item xs='2' style={{marginRight:'8px'}}>
      <FormControl variant="outlined" className={classes.formControl}>
<InputLabel id="demo-simple-select-outlined-label">Select fees as per</InputLabel>
<Select
 labelId="demo-simple-select-outlined-label"
 id="demo-simple-select-outlined"
 label="Select fees as per"
 value={data.type}
 name='type'
 onChange={handleChange}
 error={typeError}
>
 <MenuItem value="">
   <em>None</em>
 </MenuItem>
 <MenuItem value='hour'>hour</MenuItem>
 <MenuItem value='assignment'>assignment</MenuItem>
 <MenuItem value='Full-Time'>Full-Time</MenuItem>
</Select>
</FormControl>
      </Grid>

      <Grid item xs='2' style={{marginRight:'15px'}}>
      <FormControl variant="outlined" className={classes.formControl}>
<InputLabel id="demo-simple-select-outlined-label">Select Location</InputLabel>
<Select
 labelId="demo-simple-select-outlined-label"
 id="demo-simple-select-outlined"
 label="Select Location"
 value={data.location}
 onChange={handleChange}
 name='location'
 error={locationError}
>
 <MenuItem value="">
   <em>None</em>
 </MenuItem>
 <MenuItem value='OffShore'>OffShore</MenuItem>
 <MenuItem value='OnSite'>Onsite</MenuItem>
 <MenuItem value='Remote'>Remote</MenuItem>
</Select>
</FormControl>
      </Grid>

      <Grid item xs='2' style={{display:data.type==='Full-Time'?'':'none'}}>
<TextField className={classes.text} error={feesError} id="outlined-basic" name='fees' onChange={handleChange} value={data.fees} label="Fees/day" variant="outlined" />
      </Grid>

      <Grid item xs='2' style={{marginRight:'8px',display:data.type==='Full-Time'?'':'none'}}>
      <FormControl variant="outlined" className={classes.formControl}>
<InputLabel id="demo-simple-select-outlined-label">Working Days</InputLabel>
<Select
 labelId="demo-simple-select-outlined-label"
 id="demo-simple-select-outlined"
 label="Working Days"
 value={data.workingDays}
 onChange={handleChange}
 name='workingDays'
 error={locationError}
>
 <MenuItem value="">
   <em>None</em>
 </MenuItem>
 <MenuItem value='Monday_To_Friday'>Monday_To_Friday</MenuItem>
 <MenuItem value='Monday_To_Saturday'>Monday_To_Saturday</MenuItem>
</Select>
</FormControl>
      </Grid>

    </Grid>
      <Grid container >
        <Grid item xs={3} className={classes.grid}>
          <Grid container>


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
       error={serviceError}
     >
       <MenuItem value="">
         <em>None</em>
       </MenuItem>
       {props.dropdownList.map(item => (<MenuItem key={item.Id} value={item.Services}>{item.Services}</MenuItem>))}
     </Select>
   </FormControl>
            </Grid>
            <Grid item xs={8}>
              <TextField className={classes.text} error={feesError} style={{marginBottom:'10px',marginLeft:'8px',display:data.service === 'Others'?'':'none'}} id="outlined-basic" name='otherService' onChange={handleChange} value={data.otherService} label='Other Service' variant="outlined" />
            </Grid>
            <Grid item xs={8}>
              <TextField className={classes.text} error={feesError} style={{marginBottom:'10px',marginLeft:'8px',display:data.type==='Full-Time'?'none':''}} id="outlined-basic" name='fees' onChange={handleChange} value={data.fees} label={`Fees/${data.type}`} variant="outlined" />
            </Grid>

            <Grid item xs={12}>
            <Button className={classes.button} style={{width:'98%',marginLeft:'10px'}} onClick={addToList} variant="contained" >
              ADD TO LIST &#10095;
            </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.grid}>
        <Grid container>
        {props.serviceList.map((item,index)=>(
          <Grid item xs='12' className={classes.grid} key={index}>
          <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs='8'>
            <Typography variant='h6'>{item.service}</Typography>
            <Typography variant='body1'>Rs{item.fees} /{item.type==='Full-Time'?'day':item.type}</Typography>
            </Grid>
            <Grid item xs='4' style={{textAlign:'right',padding:'20px'}}>
              <EditIcon onClick={()=>editService(item)} className={classes.icon} color='secondary' style={{marginRight:'10px'}}/>
              <DeleteIcon className={classes.icon} onClick={()=>removeService(item)}/>
            </Grid>
          </Grid>
          </Paper>
          </Grid>
        ))}
</Grid>
<div style={{width:'100%',textAlign:'right',paddingRight:'150px'}}>
<Button className={classes.button} style={{width:'32%',margin:'5px'}} onClick={() =>{saveToDatabase();}} variant="contained"  startIcon={<SaveAltIcon/>}>
Apply & Save
</Button>
</div>
        </Grid>
        </Grid>
      </div>


  );
}else{
  return(
    <div style={{width:'100%',textAlign:'center'}}>
    <Grid container>
      <Grid item xs='4'>
      <Grid container>
      <Grid item xs="12">
      <FormControl variant="outlined" className={classes.formControl} >
<InputLabel id="demo-simple-select-outlined-label">Select Service</InputLabel>
<Select
 labelId="demo-simple-select-outlined-label"
 id="demo-simple-select-outlined"
 label="Select Service"
 value={data.service}
 onChange={handleChange}
 name='service'
 error={serviceError}
 style={{width:'80%'}}
>
 <MenuItem value="">
   <em>None</em>
 </MenuItem>
 {props.dropdownList.map(item => (<MenuItem key={item.Id} value={item.Services}>{item.Services}</MenuItem>))}
</Select>
</FormControl>
      </Grid>
      <Grid item xs={8}>
        <TextField className={classes.text} error={feesError} style={{width:'80%',marginRight:'40px',marginBottom:'10px',display:data.service === 'Others'?'':'none'}} id="outlined-basic" name='otherService' onChange={handleChange} value={data.otherService} label='Other Service' variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <TextField className={classes.text} error={feesError} style={{width:'80%',marginRight:'55px',marginBottom:'10px',display:data.type === 'Full-Time'?'none':''}}  id="outlined-basic" name='fees' onChange={handleChange} value={data.fees} label={`Fees/${data.type === 'Full-Time'? 'day' : data.type}`} variant="outlined" />
      </Grid>

      <Grid item xs="12">
      <Button className={classes.button} style={{width:'80%',marginRight:'55px'}} onClick={addToList} variant="contained" >
        ADD TO LIST &#10095;
      </Button>
      </Grid>
      </Grid>


      </Grid>
      <Grid item xs='8'>
      <TableContainer component={Paper} style={{width:'100%',height:'500px'}}>
      <Table className={classes.table} aria-label="customized table">
      <TableHead>
      <TableRow>
       <StyledTableCell>#</StyledTableCell>
       <StyledTableCell align="center">Services</StyledTableCell>
       <StyledTableCell align="center">Fees (&#8377;)</StyledTableCell>
      </TableRow>
      </TableHead>
      <TableBody>
      {SavedServices.map((row,index) => (
        <StyledTableRow key={index}>
          <StyledTableCell component="th" scope="row">
            {index+1}
          </StyledTableCell>
          <StyledTableCell align="center">{row.Service}</StyledTableCell>
          <StyledTableCell align="center">{row.Fees}</StyledTableCell>

        </StyledTableRow>
      ))}
      </TableBody>

      </Table>

      </TableContainer>
      </Grid>
    </Grid>

    </div>
  )
}



}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  dropdownList:selectDropdownItems,
  serviceList:selectServices,
  serviceType:selectServiceType,
  savedServices:selectSavedServices
})

const mapDispatchToProps = dispatch => ({
  SetServiceType : serviceType =>dispatch(setServiceType(serviceType)),
  AddService : service => dispatch(addService(service)),
  AddToDropdown: service => dispatch(setDropdown(service)),
  removeService: service => dispatch(removeService(service)),
  clearDropdown: () => dispatch(clearDropdown()),
  setCurrentUser: value => dispatch(setCurrentUser(value)),
  setUserStatus: type => dispatch(setUserServiceStatus(type)),
  setSavedServices : value => dispatch(setSavedServices(value)),
  setProgress : value =>dispatch(setServicesProgress(value)),
})

export default connect(mapStateToProps,mapDispatchToProps)(ServicesProvide);


// <TableContainer component={Paper}>
// <Table className={classes.table} aria-label="customized table">
// <TableHead>
// <TableRow>
//  <StyledTableCell>#</StyledTableCell>
//  <StyledTableCell align="center">Location</StyledTableCell>
//  <StyledTableCell align="center">Services</StyledTableCell>
//  <StyledTableCell align="center">Fees (&#8377;)</StyledTableCell>
//  <StyledTableCell align="center">Action</StyledTableCell>
// </TableRow>
// </TableHead>
// <TableBody>
// {props.serviceList.map((row,index) => (
//   <StyledTableRow key={index}>
//     <StyledTableCell component="th" scope="row">
//       {index+1}
//     </StyledTableCell>
//     <StyledTableCell align="right">{row.location}</StyledTableCell>
//     <StyledTableCell align="right">{row.service}</StyledTableCell>
//     <StyledTableCell align="right">{row.fees}/{row.type}</StyledTableCell>
//     <StyledTableCell align="right">  <Button
//  variant="contained"
//  style={{backgroundColor:'#b71c1c',color:'white'}}
//  className={classes.tableBtn}
//  startIcon={<RemoveCircleOutlineIcon />}
//  onClick={()=>removeService(row)}
// >
//  Remove
// </Button>
//
// <Button
// variant="contained"
// style={{backgroundColor:'#1976d2',color:'white'}}
// className={classes.tableBtn}
// startIcon={<EditIcon />}
// onClick={()=>editService(row)}
// >
// Edit
// </Button>
//
// </StyledTableCell>
//   </StyledTableRow>
// ))}
// </TableBody>
//
// </Table>
//
// </TableContainer>
// {props.serviceList.length === 0? <Typography variant='h5' style={{textAlign:'center',marginTop:'50px',color:'#bdbdbd'}}><WarningIcon/>  No services added yet!</Typography> :
// <div style={{width:'100%',textAlign:'right'}}>
// <Button className={classes.button} style={{width:'22%',margin:'5px'}} onClick={() =>{saveToDatabase();}} variant="contained"  startIcon={<SaveAltIcon/>}>
// Apply & Save
// </Button>
// </div>
// }






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
