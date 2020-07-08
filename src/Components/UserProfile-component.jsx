/*jshint esversion: 6*/

import 'date-fns';
import React,{useState,useEffect} from "react";
import userIcon from "../Images/user.jpg";
import {Container,Avatar,makeStyles,TextField,FormControl,InputLabel,Select,MenuItem,Grid,Button,Snackbar,CircularProgress,Backdrop,Paper,Typography} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser,selectUserType} from '../redux/user/user-selector';
import {editCurrentUser,setProfilePicture} from '../redux/user/user-actions';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    width:'120px',
    height:'120px',

    marginBottom:'40px',
    transition:'0.8s',

    '&:hover':{
      filter:'grayscale(100%)',
      cursor:'pointer',

    }
  },
  container:{
    textAlign:'center',
 marginBottom:'100px'
  },
  formControl: {
   margin: theme.spacing(1),
   minWidth: 120,
 },
 innerContainer:{
   width:'60%',
   marginLeft:'20%',
   marginBottom:'20px'
 },
 button:{
   width:'30%',
   height:'50px',
   borderColor:'#FF5343',
   //background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
   color:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
   marginTop:'20px'
 },
 input:{
   display:'none'
 },
 backdrop: {
   zIndex: theme.zIndex.drawer + 1,
   color: '#fff',
 }

}));



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function UserProfile({currentUser,editUser,setDPPath,userType}){

 const [selectedDate, setSelectedDate] = useState(null);
 const [data,setData] = useState({
   Id:'',
   FullName:'',
   EmailId:'',
   ContactNo:'',
   Gender:'',
   DOB:'',
   Description:'',
   ticket:{},
   detailedAddress1:'',
   detailedAddress2:''
 });

const[path,setPath] = useState(userIcon);

const [open, setOpen] = useState(false);

const [alert,setAlert] = useState('');

const [severity,setSeverity] = useState('');

const [loading,setLoading] = useState(false);

const [editable1,setEditable1] = useState(false);

const [editable2,setEditable2] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

const classes = useStyles();

// onChange = date => this.setState({ date })
const handleDateChange = (date) => {
  setSelectedDate(date);
  const DateTime = date.toString();
  setData(prevValue => {
    return{
      ...prevValue,
      DOB:DateTime.toString()
    };
  });
  };

const handleChange = (event) => {
  const {name, value} = event.target;
  setData(prevValue => {
    return{
      ...prevValue,
      [name]:value
    };
  });
  console.log(data);
}

const handleClick = async() => {
  setLoading(true);
  const res = await axios.post('https://localhost:44327/api/UpdateProfile',data);
  if(res!=null){
    console.log(res);
    if(res.data.responseCode === 200){

          const request = {
            ServiceProviderId:currentUser.Id,
            Description: data.Description,
            ticket: currentUser.Ticket,
            LocationDetails:[]
          };
          if(address1.Address!==''){
            request.LocationDetails.push(address1);
          }
          if(address2.Address!=''){
            request.LocationDetails.push(address2);
          }
          const result = await axios.post('https://localhost:44327/api/UpdateServiceProviderDescription',request);
          if(result){
            if(result.data.output === true){
              const editData = {FullName:data.FullName,EmailId:data.EmailId,ContactNo:data.ContactNo,Gender:data.Gender==='Male'?1:data.Gender==='Female'?2:3,DOB:data.DOB,Description:data.Description};
                  editUser(editData );
              setLoading(false);
              setAlert('Profile updated successfully !');
              setSeverity('success');
              setOpen(true);
            }else{
              setLoading(false);
              setAlert('Profile update unsuccessfull ! Try Again later.');
              setSeverity('error');
              setOpen(true);
            }
          }
    }else{
      setLoading(false);
      setAlert('Profile update unsuccessfull ! Try Again later.');
      setSeverity('error');
      setOpen(true);
    }
  }
};

const[address1,setAddress1] = useState({
Id:'',
ServiceProviderId:'',
Address:'',
Latitude:'',
Longitude:''
});
const[address2,setAddress2] = useState({
  Id:'',
  ServiceProviderId:'',
Address:'',
Latitude:'',
Longitude:''
});

const[add1,setAdd1] = useState('');
const[add2,setAdd2] = useState('');

const [coordinates,setCoordinates] = useState({
  lat:null,
  lng:null
});

const handleSelect1 = async (value) => {

  const result = await geocodeByAddress(value);
  const latlng = await getLatLng(result[0]);
  console.log(latlng);
  setAdd1(value);
  setAddress1(prevValue=>{
    return{
      ...prevValue,
      Latitude:latlng.lat,
      Longitude:latlng.lng
    };
  });
  setCoordinates(latlng);
  console.log(coordinates);
};

const handleSelect2 = async (value) => {

  const result = await geocodeByAddress(value);
  const latlng = await getLatLng(result[0]);
  setAdd2(value);
  console.log(latlng);
  setAddress2(prevValue=>{
    return{
      ...prevValue,
      Latitude:latlng.lat,
      Longitude:latlng.lng
    };
  });
  setCoordinates(latlng);
  console.log(coordinates);
};



const dpChange = async (event) => {
  let image = event.target.files[0];
  let formdata = new FormData();
  formdata.append('Files',image);
  formdata.append('AddedById',currentUser.Id);
  formdata.append('DocumentType','6');
//   const result = await fetch(`https://localhost:44327/api/UploadProfilePicture/${currentUser.Id}/6`,
//   {
//     method:'POST',
//     body:formdata
//   }
// );

const result = await axios.post(`https://localhost:44327/api/UploadProfilePicture/${currentUser.Id}/6`,formdata)


if(result!=null){
    console.log(result.data);
    if(result.data.responseCode === 200){
      const DPPath = result.data.output.DPPath;
      setDPPath(DPPath);
      setSeverity('success');
      setAlert('Display picture was changed successfully !');
      setOpen(true);
    }else{
      setSeverity('error');
      setAlert('Some error occured, while changing the display picture !');
      setOpen(true);
    }

}

};


  useEffect(()=>{
    if(currentUser!=null){
        setLoading(true);
      const request ={
        UserId:currentUser.Id,
        ticket:currentUser.Ticket
      }

      getProfileDetails(request)
      .then(res => {
        if(res.data.output){
          setData({
            Id:res.data.output.UserBasicDetails.Id,
            FullName:res.data.output.UserBasicDetails.FullName,
            EmailId:res.data.output.UserBasicDetails.EmailId,
            ContactNo:res.data.output.UserBasicDetails.ContactNo,
            Gender:res.data.output.UserBasicDetails.Gender === 1? 'Male':currentUser.Gender === 2? 'Female':currentUser.Gender === 3?'Others':'',
            Description:res.data.output.UserBasicDetails.Description,
            ticket: currentUser.Ticket,
            DOB:res.data.output.UserBasicDetails.DOB
          });
          if(res.data.output.LocationDetails.length !==0){
            setAddress1(res.data.output.LocationDetails[0]);
            setAdd1(res.data.output.LocationDetails[0].Address);
            if(res.data.output.LocationDetails.length === 2){
              setAddress2(res.data.output.LocationDetails[1]);
              setAdd2(res.data.output.LocationDetails[1].Address);
            }
          }

          const dateTime = new Date(res.data.output.UserBasicDetails.DOB);
          setSelectedDate(dateTime);
          const path = `https://localhost:44327/${res.data.output.UserBasicDetails.DPPath}`
          setPath(path);
            setLoading(false);
        }

      })

    }
  },[currentUser])

  async function getProfileDetails(data){
    const result = await axios.post('https://localhost:44327/api/getProfileDetails',data);
    return result;
  }


  function handleAddressEdit(type){
    debugger
    var address;
    if(type===1){
      if(add1){
        data.detailedAddress1?address = `${data.detailedAddress1},${add1}`:address = `${add1}`;

        setAddress1(prevValue=>{
          return{
            ...prevValue,
            Address:address,
          };
        });
        setEditable1(false);
      }else{
        return;
      }

    }else{
      if(add2){
      data.detailedAddress2?address = `${data.detailedAddress2},${add2}`:address = `${add2}`;

      setAddress2(prevValue=>{
        return{
          ...prevValue,
          Address:address,
        };
      });
      setEditable2(false);
    }
    }
  }

  return(
    <div style={{paddingTop:'100px'}}>
    <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity={severity}>
    {alert}
  </Alert>
</Snackbar>
    <Container maxWidth='sm' className={classes.container}>
     <input onChange={dpChange} className={classes.input} id="icon-button-file" type="file" />
     <label htmlFor="icon-button-file">
        <Avatar alt="Remy Sharp" src={path}  className={classes.large} />
      </label>
        <form>
          <TextField id="standard-basic" name='FullName' value={data.FullName} onChange={handleChange} style={{width:'50%',marginBottom:'10px'}} label="Full Name" />
          <TextField id="standard-basic" name='EmailId' value={data.EmailId} onChange={handleChange} style={{width:'60%',marginBottom:'10px'}} label="Email Address" />
          <TextField id="standard-basic" name='ContactNo' value={data.ContactNo} onChange={handleChange} style={{width:'50%',marginBottom:'10px'}} label="Mobile No." />
          <br/>

             <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container className={classes.innerContainer}>
            <Grid item xs='6' style={{paddingTop:'8px'}}>
            <FormControl  className={classes.formControl}>
         <InputLabel id="demo-simple-select-label">Gender</InputLabel>
         <Select
           labelId="demo-simple-select-label"
           id="demo-simple-select"
           name='Gender'
           value={data.Gender}
           onChange={handleChange}
         >
           <MenuItem value=''></MenuItem>
           <MenuItem value='Male'>Male</MenuItem>
           <MenuItem value='Female'>Female</MenuItem>
           <MenuItem value='Others'>Others</MenuItem>
         </Select>
       </FormControl>
            </Grid>
            <Grid item xs='6'>
            <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Birth Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </Grid>
          <TextField id="outlined-multiline-static" multiline placeholder='Tell people about what you will provide' variant='outlined' rows={5} name='Description' value={data.Description} InputLabelProps={{shrink: true,}} onChange={handleChange} style={{width:'60%',marginBottom:'10px',display:userType==='Service-Provider'?'':'none'}} label="Description" />
{
  editable1?
          (<Paper elevation={1} style={{padding:'10px 10px',width:'400px',textAlign:'left',margin:'8px 80px'}}>

          <PlacesAutocomplete
     value={add1}
     onChange={setAdd1}
     onSelect={handleSelect1}
   >

    {({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
      <div>
      <TextField id="standard-basic" multiline rows={3} style={{width:'80%',marginBottom:'10px',display:userType==='Customer'?'':'none'}} label="Address 1"
             {...getInputProps({
               placeholder: 'Search Places ...',
               className: 'location-search-input',
             })}
           />
           <div className="autocomplete-dropdown-container">
             {loading && <div>loading...</div>}
             {suggestions.map(suggestion => {
               const className = suggestion.active
                 ? 'suggestion-item--active'
                 : 'suggestion-item';
               // inline style for demonstration purpose
               const style = suggestion.active
                 ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                 : { backgroundColor: '#ffffff', cursor: 'pointer' };

                 console.log(suggestion);
               return (
                 <div
                   {...getSuggestionItemProps(suggestion, {
                     className,
                     style,
                   })}
                 >
                   <span>{suggestion.description}</span>
                 </div>
               );
             })}
           </div>
      </div>
    )}

   </PlacesAutocomplete>
<Grid container>
  <Grid item xs={8}>
    <TextField name='detailedAddress1' value={data.detailedAddress1} onChange={handleChange} label='Flat-No./Block-No.' style={{width:'100%'}}/>
  </Grid>
  <Grid item xs ={4} style={{textAlign:'center',padding:"5px 0"}}>
  <Button variant='contained' onClick={()=>{handleAddressEdit(1);}}>Done</Button>
  </Grid>
</Grid>

</Paper>):(<Typography style={{margin:'10px 0'}} variant='body1'>Address 1:  {address1.Address}  <EditIcon onClick={()=>{setEditable1(true);}}/></Typography>)}

  {
editable2?
    (<Paper elevation={1} style={{padding:'10px 10px',width:'400px',textAlign:'left',margin:'8px 80px'}}>
   <PlacesAutocomplete
value={add2}
onChange={setAdd2}
onSelect={handleSelect2}
>

{({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
<div>
<TextField id="standard-basic" multiline rows={3}   style={{width:'60%',marginBottom:'10px',display:userType==='Customer'?'':'none'}} label="Address 2"
      {...getInputProps({
        placeholder: 'Search Places ...',
        className: 'location-search-input',
      })}
    />
    <div className="autocomplete-dropdown-container">
      {loading && <div>loading...</div>}
      {suggestions.map(suggestion => {
        const className = suggestion.active
          ? 'suggestion-item--active'
          : 'suggestion-item';
        // inline style for demonstration purpose
        const style = suggestion.active
          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
          : { backgroundColor: '#ffffff', cursor: 'pointer' };

          console.log(suggestion);
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style,
            })}
          >
            <span>{suggestion.description}</span>
          </div>
        );
      })}
    </div>
</div>
)}

</PlacesAutocomplete>
<Grid container>
  <Grid item xs={8}>
    <TextField name='detailedAddress2' value={data.detailedAddress2} onChange={handleChange} label='Flat-No./Block-No.' style={{width:'100%'}}/>
  </Grid>
  <Grid item xs ={4} style={{textAlign:'center',padding:"5px 0"}}>
  <Button variant='contained' onClick={()=>{handleAddressEdit(2)}}>Done</Button>
  </Grid>
</Grid>
</Paper>):(<Typography style={{margin:'10px 0'}}variant='body1'>Address 2:  {address2.Address}  <EditIcon onClick={()=>{setEditable2(true);}}/></Typography>)}

          <br/>
               </MuiPickersUtilsProvider>

               <Button variant='outlined' onClick={handleClick} className={classes.button}>Update Profile</Button>

        </form>
      </Container>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  userType:selectUserType
})

const mapDispatchToProps = dispatch => ({
  editUser : data =>dispatch(editCurrentUser(data)),
  setDPPath: path => dispatch(setProfilePicture(path))
})

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);



// <a className="btn" style={{borderRadius:"5px", border:"1px solid #C104C9", marginLeft:"800px"}} href={"/UserPage/ServiceProvider/Dashboard"}>Back to Dashboard</a>
//   <div className=" profile-container" style={{marginLeft:"300px"}}>
//     <div style={{textAlign:"center"}}>
//       <img alt="img" src={userIcon} className="ProfilePicture"/>
//       <br/>
//       <br/>
//       <br/>
//       <div style={{textAlign:"center"}}>
//       <form style={{paddingLeft:"60px"}}>
//         <input type="text" className="form-control col-lg-10" name="Name" placeholder="Fullname"/>
//         <br/>
//         <input type="text" className="form-control col-lg-10" name="Name" placeholder="Email ID"/>
//         <br/>
//         <input type="text" className="form-control col-lg-10" name="Name" placeholder="Mobile Number"/>
//         <br/>
//         <select className="form-control col-lg-6" name="Name">
//           <option selected>Gender</option>
//           <option>Male</option>
//           <option>Female</option>
//         </select>
//         <br/>
//         <div className="row">
//         <label className="col-lg-4">Date of Birth</label>
//         <div className="col-lg-5" style={{textAlign:"left"}}>
//         <DatePicker
//       onChange={this.onChange}
//       value={this.state.date}
//     />
//       </div>
//         </div>
//         <br/>
//         <input type="text" className="form-control col-lg-10" name="Name" placeholder="Address"/>
//         <br/>
//         <input type="text" className="form-control col-lg-6" name="Name" placeholder="Pincode"/>
//         <br/>
//         <div style={{paddingRight:"50px"}}>
//         <button className="btn login-btn" type="Submit" >Update</button>
//         </div>
//       </form>
//       </div>
//     </div>
//   </div>





// var date = new Date('your string');
// var d = date.getDate(date);
// var monthNumber = date.getMonth();
// let Month = [January,february,march,....];
// var monthName = Month[monthNumber+1];
