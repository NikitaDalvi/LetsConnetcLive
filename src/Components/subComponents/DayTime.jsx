/*jshint esversion:9*/
import React,{useState,useEffect} from 'react';
import 'date-fns';
import {Grid,Checkbox,Typography,TextField,makeStyles,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user-selector';
import {selectServiceType,selectWorkingHours} from '../../redux/service/service-selector';
import {addAvailability,removeTimeslot} from '../../redux/service/service-actions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { v4 as uuidv4 } from 'uuid';


function DayTime({workingHours,currentUser,serviceTypeId,addWorkingHours,day,removeTimeSlot,alert,savedDays}){

const [slot,setSlot] = useState({
 // ServiceProviderId:'',
 // ServiceTypeId:'',
  WorkingDays:'',
  TimeSlotDetails:{
    StartTime:'',
    StartAMPM:'',
    EndTime:'',
    EndAMPM:''
  }
});
// const [timeSlot,setTimeSlot] = useState({
//   startTime:'',
//   endTime:'',
//   buffer:''
// });
const [startTime, setStartTime] = useState(null);
const [endTime, setEndTime] = useState(null);
const [buffer, setBuffer] = useState('');
const [disable,setDisable] = useState(true);
const [timeslots,setTimeslots] = useState([]);
const [checked,setChecked] = useState(false);
const [WeekDay,setWeekDay] = useState('');
const [error,setError] = useState(false);
const [bufferError,setBufferError] = useState(false);
const [existence,setExistence] = useState(false);



const handleCheck = (event) => {
  var checkBox = event.target;
  var name = event.target.name;

  if(checkBox.checked){
    setSlot(prevValue => {return {...prevValue,WorkingDays: Number(name)};});
    setChecked(true);
    setDisable(false);
  }else{
    setSlot(prevValue => {return {...prevValue,WorkingDays: 0};});
      setChecked(false);
    setDisable(true);
  }
};

// const handleChange = event => {
//   const {name,value} = event.target;
//   setBuffer(value);
//   setSlot(prevValue => {return{
//     ...prevValue,
//     TimeSlotDetails:{
//       ...prevValue.TimeSlotDetails,
//       [name]:value
//     }
//   };});
// };

const onStartChange = event => {
  const{value} = event.target;
  setStartTime(value);
  setSlot(prevValue => {return{
    ...prevValue,
    TimeSlotDetails:{
      ...prevValue.TimeSlotDetails,
      TimeslotId:uuidv4(),
      StartTime:value
    }
  };});
  console.log(slot.TimeSlotDetails);
};

const onStartAMPM = event => {
  const {value}=event.target;
  setSlot(prevValue => {return{
    ...prevValue,
    TimeSlotDetails:{
      ...prevValue.TimeSlotDetails,
      StartAMPM:value
    }
  };});
  console.log(slot.TimeSlotDetails);
};

const onEndChange = event => {
    const{value} = event.target;
  setEndTime(value);
  console.log(slot);
  setSlot(prevValue => {return{
    ...prevValue,
    TimeSlotDetails:{
      ...prevValue.TimeSlotDetails,
      EndTime:value
    }
  };});
};

const onEndAMPM = event => {
  const {value}=event.target;
  setSlot(prevValue => {return{
    ...prevValue,
    TimeSlotDetails:{
      ...prevValue.TimeSlotDetails,
      EndAMPM:value
    }
  };});
  console.log(slot.TimeSlotDetails);
};

const handleClick = () => {
  // const StartTime = startTime.toString();
  // const EndTime = endTime.toString();
  // const timeSlot = {
  //   startTime: StartTime.slice(16,21),
  //   endTime: EndTime.slice(16,21),
  //   buffer: buffer
  // };
  const Slot = {
    ...slot,
    TimeSlotDetails:{
      StartTime:`${slot.TimeSlotDetails.StartTime} ${slot.TimeSlotDetails.StartAMPM}`,
      EndTime:`${slot.TimeSlotDetails.EndTime} ${slot.TimeSlotDetails.EndAMPM}`
    }
  };

  console.log(Slot);
  if(startTime === null || endTime === null){
    setError(true);
    return;
  }else{
    setError(false);
  }

if(timeslots.length < 2){
  console.log(slot);

addWorkingHours(Slot);
}else{
  return alert();
}

  //
  // setSlot({
  //   ServiceProviderId:'',
  //   ServiceTypeId:'',
  //   WorkingDays:'',
  //   TimeSlot:null
  // });
};


const removeTimeslot = (Id) => {
  const object ={
    day:day,
    Id:Id
  };
  removeTimeSlot(object);
};

useEffect(() => {
  if(currentUser!= null){
    setSlot(prevValue => {return{
      ...prevValue,
      ServiceProviderId:currentUser.Id,
      ServiceTypeId:serviceTypeId
    };});
  }

},[serviceTypeId,currentUser]);


useEffect(() => {

if(day!=null){

  if(workingHours.length!==0){
    const Day = workingHours.find(item => item.WorkingDays === day);
    if(Day!=null){
        setTimeslots(Day.TimeSlotDetails);
        setSlot(prevValue => {return{
          ...prevValue,
            WorkingDays:day
        };});
        setChecked(true);
        setDisable(false);

        if(savedDays.length !== 0){
          const exist = savedDays.find(Day => Day == day);
          if(exist){
            setExistence(true);
            setDisable(true);
          }
        }
    }
  }

}

},[day, savedDays,workingHours,setExistence]);



const useStyles = makeStyles((theme) => ({
  picker:{
    margin:'0 10px 10px 10px'
  },
  addBtn:{
    margin:'8px 10px 5px 10px'
  },
  formControl: {
   margin: theme.spacing(1),
   minWidth: 120,
 },
 AMPM:{
   margin: theme.spacing(1),
   paddingTop:'15px'
 }

}));

const classes = useStyles();
  return(
    <Grid container>
      <Grid item xs={2}>
        <Grid container>
          <Grid item xs={3}>
          <Checkbox
         onChange={handleCheck}
         checked={checked}
         color="default"
         inputProps={{ 'aria-label': 'checkbox with default color' }}
         name={day}
         disabled={existence}
       />
          </Grid>
          <Grid item xs={6}>
            <Typography style={{width:'50%',margin:'8px 10px 5px 10px'}} variant='h5'>{day == 1 ?'Mon':day== 2 ? 'Tue': day == 3 ? 'Wed': day == 4 ?'Thu':day == 5 ?'Fri':day == 6 ?'Sat': day == 7 ? 'Sun': 0}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={9}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <Grid item xs={4}>
          <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-label">Start Time</InputLabel>
       <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         onChange={onStartChange}
         value={slot.TimeSlotDetails.StartTime}
       >
         <MenuItem value={'12:00'}>12:00</MenuItem>
         <MenuItem value={'1:00'}>1:00</MenuItem>
         <MenuItem value={'2:00'}>2:00</MenuItem>
         <MenuItem value={'3:00'}>3:00</MenuItem>
         <MenuItem value={'4:00'}>4:00</MenuItem>
         <MenuItem value={'5:00'}>5:00</MenuItem>
         <MenuItem value={'6:00'}>6:00</MenuItem>
         <MenuItem value={'7:00'}>7:00</MenuItem>
         <MenuItem value={'8:00'}>8:00</MenuItem>
         <MenuItem value={'9:00'}>9:00</MenuItem>
         <MenuItem value={'10:00'}>10:00</MenuItem>
         <MenuItem value={'11:00'}>11:00</MenuItem>
       </Select>
     </FormControl>
     <FormControl className={classes.AMPM}>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={onStartAMPM}
    value={slot.TimeSlotDetails.StartAMPM}
  >
    <MenuItem value={'PM'}>PM</MenuItem>
    <MenuItem value={'AM'}>AM</MenuItem>
  </Select>
</FormControl>
          </Grid>
          <Grid item xs={4}>
          <FormControl className={classes.formControl}>
       <InputLabel id="demo-simple-select-label">End Time</InputLabel>
       <Select
       value={slot.TimeSlotDetails.EndTime}
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         onChange={onEndChange}
       >
         <MenuItem value={'12:00'}>12:00</MenuItem>
         <MenuItem value={'1:00'}>1:00</MenuItem>
         <MenuItem value={'2:00'}>2:00</MenuItem>
         <MenuItem value={'3:00'}>3:00</MenuItem>
         <MenuItem value={'4:00'}>4:00</MenuItem>
         <MenuItem value={'5:00'}>5:00</MenuItem>
         <MenuItem value={'6:00'}>6:00</MenuItem>
         <MenuItem value={'7:00'}>7:00</MenuItem>
         <MenuItem value={'8:00'}>8:00</MenuItem>
         <MenuItem value={'9:00'}>9:00</MenuItem>
         <MenuItem value={'10:00'}>10:00</MenuItem>
         <MenuItem value={'11:00'}>11:00</MenuItem>
       </Select>
     </FormControl>

     <FormControl className={classes.AMPM}>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={slot.TimeSlotDetails.EndAMPM}
    onChange={onEndAMPM}
  >
    <MenuItem value={'PM'}>PM</MenuItem>
    <MenuItem value={'AM'}>AM</MenuItem>
  </Select>
</FormControl>
          </Grid>
          <Grid item xs={2}>
          <Fab size="small" disabled={disable} className={classes.addBtn} color="secondary" aria-label="add" onClick={handleClick}>
            <AddIcon />
          </Fab>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      {timeslots.map((item,index) =><div key={index} style={{marginBottom:'5px',padding:'8px'}}> <Typography variant='body1'>From:{item.StartTime} - To:{item.EndTime}  <RemoveCircleIcon style={{display:disable?'none':''}} type='button' color='secondary' onClick={() => {removeTimeslot(item.TimeslotId);}}/></Typography></div>)}
      </Grid>

    </Grid>
  )



}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  serviceTypeId: selectServiceType,
  workingHours: selectWorkingHours
})

const mapDispatchToProps = dispatch => ({
  addWorkingHours : slot => dispatch(addAvailability(slot)),
  removeTimeSlot: slot => dispatch(removeTimeslot(slot))
})  

export default connect(mapStateToProps,mapDispatchToProps)(DayTime);


