/*jshint esversion:9*/
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectExpertId,selectCurrentUser} from '../redux/user/user-selector';
import axios from 'axios';
import {Input, Container, Grid, makeStyles,Avatar,Typography,Paper,FormControl,InputLabel,MenuItem,Select,FormControlLabel,Checkbox,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import profile from '../Images/profile.jpg';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {API} from '../API';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  profileSection:{
padding: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    width:'120px',
    height:'120px',
  },
  paper:{
    padding: theme.spacing(2),
  },
  container:{
    marginBottom:theme.spacing(1),
  },
  formControl: {
  minWidth: 200,
},
button:{
  width:'100%',
  height:'50px',
  background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
  color:'white'
}
}));

function UserDetailPage({expertId,currentUser}){
const [expertDetails,setExpertDetails] = useState(null);
const [timeSlots,setTimeSlots] = useState([]);
const [bookAppointmentRequest,setBookAppointmentRequest] = useState({
  ServiceId:'',
  ServiceListDetails:[],
  Assignments:null,
  StartDate:null,
  EndDate:null
});

const [Slots,setSlots] = useState([]);

  const serviceData=[{
    service:'Static Website',
    price:'50',
  },
  {
    service:'Dynamic Website',
    price:'100'
  },
]

  const data =[
    {
      startTime:'10:00',
      endTime:'11:00'
    },
    {
      startTime:'11:30',
      endTime:'12:30'
    },
    {
      startTime:'13:00',
      endTime:'14:00'
    },
    {
      startTime:'14:30',
      endTime:'15:30'
    },
    {
      startTime:'16:00',
      endTime:'17:00'
    },
  ]


  useEffect(()=>{
    if(expertId){
      getExpertDetails()
      .then(res => {setExpertDetails(res); console.log(res);});
    }
  },[expertId]);

  async function getExpertDetails(){
    const data = {
      UserId:expertId,
      ticket:currentUser.Ticket
    };
    const result = await axios.post('https://localhost:44327/api/GetServiceProviderBasicDetails',data);
    return result.data.output;
  }



  const [selectedDate, setSelectedDate] = React.useState(null);

   const handleDateChange = (date) => {
            setSelectedDate(date);
            const Date = moment(date).format('YYYY-MM-DD').toString();
            setBookAppointmentRequest(prevValue=>{
              return{
                ...prevValue,
                StartDate:Date
              };
            });
     if(expertDetails.BasicDetails.ServiceCharge === 1){
       getAvailableSlots(date)
       .then(res => setTimeSlots(res.SlotList));
     }
     console.log(bookAppointmentRequest);
   };

   const handleEndDateChange = (date) => {
     const Date = moment(date).format('YYYY-MM-DD').toString();
     setBookAppointmentRequest(prevValue=>{
       return{
         ...prevValue,
         EndDate:Date
       };
     });
   }

   const getAvailableSlots = async (date) => {

     const Date = moment(date).format('YYYY-MM-DD').toString();
     const request = {
       ServiceProviderId:expertId,
       RequestingDate: Date
     };
     const result = await axios.post(`https://localhost:44327/api/GetAvailableSlot`,request);
     return result.data.output;
   };

   const [request,setRequest] = React.useState({
     service:'Static Website',
     price:'50',
     date:'06/06/20',
     quantity:3,
     total:'150'

   });

   const [allRequest,setAllRequest] = React.useState([]);

   const onTimeSlotSelect = (startTime,endTime) => {

     const slot = {
       StartTime:startTime,
       EndTime:endTime
     };

     const slots = [...Slots];
     const existing = slots.find(item => item.StartTime === startTime && item.EndTime === endTime);

     if(existing){
       const currentIndex = slots.indexOf(existing);
       slots.splice(currentIndex,1);

     }else{
       slots.push(slot);
     }
     setSlots(slots);
     setBookAppointmentRequest(prevValue => {
       return{
         ...prevValue,
         ServiceListDetails:slots
       };
     });

console.log(bookAppointmentRequest);

   };

   const handleChange = (event) => {
     const {value} = event.target;
     setBookAppointmentRequest(prevValue => {
       return{
         ...prevValue,
         ServiceId: value.ServiceId
       };
     });
   };

   const handleAssignmentChange = event => {
     const {value} = event.target;
     console.log(value);
     setBookAppointmentRequest(prevValue => {
     return{
       ...prevValue,
       Assignments:value
     };
   });
 };

   const handleBooking = ()=>{
     if(bookAppointmentRequest.ServiceId!==null){
       var request;
       var URL;
       switch (expertDetails.BasicDetails.ServiceCharge) {
         case 1:
         URL = `${API.URL}RequestServiceProviderPerHr`;
         request = {
           ServiceProviderId:expertId,
           ServiceSeekerId:currentUser.Id,
           ServiceId:bookAppointmentRequest.ServiceId,
           StartDate:bookAppointmentRequest.StartDate,
           EndDate:bookAppointmentRequest.EndDate,
           RequestedTimeSlot:bookAppointmentRequest.ServiceListDetails,
           Ticket:currentUser.Ticket
         };
         bookAppointment(request,URL)
         .then(res => console.log(res));

           break;

          case 2:
          const isNumber = Number.isInteger(Number(bookAppointmentRequest.Assignments));
          if(Number(bookAppointmentRequest.Assignments) < 1 || !isNumber){
            alert('Invalid number of assignments !');
            return;
          }
          URL = `${API.URL}RequestServiceProviderPerAssignment`;
          request = {
            ServiceProviderId:expertId,
            ServiceSeekerId:currentUser.Id,
            ServiceId:bookAppointmentRequest.ServiceId,
            Ticket:currentUser.Ticket,
            Date: bookAppointmentRequest.StartDate,
            NoOfAssignment:Number(bookAppointmentRequest.Assignments)
          };
          bookAppointment(request, URL)
          .then(res => {    if(res){
                alert('Booking Successfull!');
              }else{
                alert('Booking unsuccessfull! Please Try again later!');
              }});
          break;

          case 3:
          if(bookAppointmentRequest.EndDate === null){
            alert('Please fill the end date');
            return;
          }
          URL = `${API.URL}RequestServiceProviderFullTime`;
          request={
            ServiceProviderId:expertId,
            ServiceSeekerId:currentUser.Id,
            ServiceId:bookAppointmentRequest.ServiceId,
            Ticket:currentUser.Ticket,
            StartDate: bookAppointmentRequest.StartDate,
            EndDate:setBookAppointmentRequest.EndDate
          };
          bookAppointment(request,URL)
          .then(res => {
            if(res){
              alert('Booking Successfull!');
            }else{
              alert('Booking unsuccessfull! Please Try again later!');
            }
          });

          break;
         default:

       }
     }else{
       alert('please fill all the fields !');
     }


   };


  const bookAppointment = async(request,URL) => {
    console.log(URL);
    const result = await axios.post(`${URL}`,request);
    return result.data.output;
  };

   const handleClick = () => {
     setAllRequest(prevValue => {
       return [...prevValue, request]
       ;
     });
   };

  const classes = useStyles();
  if(expertDetails !== null){
    return(
      <Container>
        <Grid container className={classes.container}>
          <Grid item xs='6' className={classes.profileSection}>
          <Paper elevation={2} className={classes.paper}>
            <Grid container style={{marginBottom:'20px'}}>
              <Grid item xs='3'>
                  <Avatar alt="Remy Sharp" src={`https://localhost:44327${expertDetails.BasicDetails.DPPath}`}  className={classes.large} />
              </Grid>
              <Grid item xs='5' style={{padding:'30px 0'}}>
                <Typography variant='h5'>{expertDetails.BasicDetails.ServiceProvider}</Typography>
                <Typography variant='h6'>{expertDetails.BasicDetails.ServiceType}</Typography>
              </Grid>
            </Grid>
            <Grid container style={{marginBottom:'20px'}}>
              <Grid item xs='2'>
                <p style={{width:"100%",height:'100%',fontSize:'20px',textAlign:'right',padding:'5px'}}><span style={{fontSize:'40px'}}>{expertDetails.BasicDetails.Rating}</span>/5</p>
              </Grid>
              <Grid item xs='4'>
                  <Rating name="read-only" value={expertDetails.BasicDetails.Rating} readOnly precision={0.1} style={{marginTop:'20px'}} size="large"/>
              </Grid>
            </Grid>
            <Typography variant='h6'>About me:</Typography>
            <Typography variant='body1'>{expertDetails.BasicDetails.Description?expertDetails.BasicDetails.Description:'No Description found'}.</Typography>
            <Typography variant='h6'>How do I charge?</Typography>
            <Typography variant='body1'>{expertDetails.BasicDetails.ServiceCharge?`I charge per ${expertDetails.BasicDetails.ServiceCharge === 1? 'day':expertDetails.BasicDetails.ServiceCharge === 2?'assignment':'hour'}`:''}.</Typography>
            </Paper>
          </Grid>
          <Grid item xs='6' className={classes.profileSection}>
          <Paper elevation={2} className={classes.paper}>
            <Typography variant='h5'>Services</Typography>
            <br/>
            <Grid container>
            <Grid item xs='6'>
            <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Select Service</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
            >
            {expertDetails.ServiceList.map((item,index)=><MenuItem key={index} value={item}>{item.Services} at &#8377; {item.Fees}</MenuItem>)}
            </Select>
          </FormControl>
            </Grid>
            </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container>
            <Grid item xs='5'>
            <KeyboardDatePicker
            style={{width:'90%'}}
         disableToolbar
         variant="inline"
         format="dd/MM/yyyy"
         formatDate={(date) => moment(new Date()).format('DD-MM-YYYY')}
         margin="normal"
         id="date-picker-inline"
         label="Select Date"
         value={selectedDate}
         onChange={handleDateChange}
         KeyboardButtonProps={{
           'aria-label': 'change date',
         }}
       />
            </Grid>
            <Grid item xs='6' style={{padding:'30px 20px 0 0',textAlign:'right', display:selectedDate!==null?'':'none'}}>
            {expertDetails.BasicDetails.ServiceCharge?(expertDetails.BasicDetails.ServiceCharge === 1?timeSlots.map((item,index) => <FormControlLabel
              onChange={()=>{onTimeSlotSelect(item.StartTime,item.EndTime);}}
              key={index}
              control={<Checkbox  name="gilad" />}
              label={`${item.StartTime} - ${item.EndTime}`}
            />):expertDetails.BasicDetails.ServiceCharge === 2?<Input
               id="outlined-number"
               placeholder="No. of Assignments"
               type="number"
               onChange={handleAssignmentChange}
               value={bookAppointmentRequest.Assignments}
               InputLabelProps={{
                 shrink: true,
               }}
               variant="standard"
             />:
             <KeyboardDatePicker
              style={{width:'90%'}}
           disableToolbar
           variant="inline"
           format="dd/MM/yyyy"
           onChange={handleEndDateChange}
           formatDate={(date) => moment(new Date()).format('DD-MM-YYYY')}
           margin="normal"
           id="date-picker-inline"
           label="Select End Date"
           KeyboardButtonProps={{
             'aria-label': 'change date',
           }}
         />):''}

            </Grid>
          </Grid>
          </MuiPickersUtilsProvider>
          <Button className={classes.button} onClick={handleBooking}  variant="contained" >
            BOOK NOW
          </Button>
            </Paper>
          </Grid>

        </Grid>
        <Grid container className={classes.container}>

        </Grid>
      </Container>
    );
  }else{
    return(
      <div>
      </div>
    )
  }

}
const mapStateToProps = createStructuredSelector({
  expertId : selectExpertId,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(UserDetailPage);


// <Grid item xs='6' className={classes.profileSection}>
// <Paper className={classes.paper} style={{position:'fixed',width:'600px'}}>
// <Typography variant='h5'>Request Summary</Typography>
// <TableContainer>
// <Table className={classes.table} aria-label="simple table">
// <TableHead>
// <TableRow>
// <TableCell>#</TableCell>
// <TableCell align="center">Service</TableCell>
// <TableCell align="center">Date</TableCell>
// <TableCell align="center">Price(&#8377;)</TableCell>
// <TableCell align="center">Quantity</TableCell>
// <TableCell align="center">Total(&#8377;)</TableCell>
// </TableRow>
// </TableHead>
// <TableBody>
// {allRequest.map((row,index) => (
// <TableRow key={index}>
// <TableCell component="th" scope="row">
//   {index+1}
// </TableCell>
// <TableCell align="center">{row.service}</TableCell>
// <TableCell align="center">{row.date}</TableCell>
// <TableCell align="center">{row.price}</TableCell>
// <TableCell align="center">{row.quantity}</TableCell>
// <TableCell align="center">{row.total}</TableCell>
// </TableRow>
// ))}
// </TableBody>
// </Table>
// </TableContainer>
// </Paper>
// </Grid>


// {rows.map((row) => (
//   <TableRow key={row.name}>
//     <TableCell component="th" scope="row">
//       {row.name}
//     </TableCell>
//     <TableCell align="right">{row.calories}</TableCell>
//     <TableCell align="right">{row.fat}</TableCell>
//     <TableCell align="right">{row.carbs}</TableCell>
//     <TableCell align="right">{row.protein}</TableCell>
//   </TableRow>
// ))}
