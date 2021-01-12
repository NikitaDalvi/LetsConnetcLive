/*jshint esversion:9*/
/*jshint -W087*/
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectExpertId, selectCurrentUser } from '../redux/user/user-selector';
import axios from 'axios';
import { Input, Container, Grid, makeStyles, Avatar, Typography, Paper,Backdrop, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Checkbox, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import profile from '../Images/profile.jpg';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { API } from '../API';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useMediaQuery } from 'react-responsive';
import loader from '../Images/loader.gif'

const useStyles = makeStyles((theme) => ({
  profileSection: {
    padding: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    width: '120px',
    height: '120px',
  },
  paper: {
    padding: theme.spacing(2),
  },
  container: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    minWidth: 200,
  },
  button: {
    width: '100%',
    height: '50px',
    background: 'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
    color: 'white'
  }
}));

function UserDetailPage({ expertId, currentUser }) {
  const [expertDetails, setExpertDetails] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookAppointmentRequest, setBookAppointmentRequest] = useState({
    ServiceId: '',
    ServiceListDetails: [],
    Assignments: null,
    StartDate: null,
    EndDate: null,
    WorkingDays: null,

  });



  const [alertmessage, setalert] = useState(null);

  const [Slots, setSlots] = useState([]);
  const [sequentialSlots, setSequentialSlots] = useState([])

  useEffect(() => {
    if (expertId) {
      getExpertDetails()
        .then(res => { setExpertDetails(res); console.log(res); });
    }
  }, [expertId]);


  async function getExpertDetails() {
    const data = {
      UserId: expertId,
      ticket: currentUser.Ticket
    };
    const result = await axios.post(`${API.URL}GetServiceProviderBasicDetails`, data);
    return result.data.output;
  }



  const [selectedDate, setSelectedDate] = React.useState(null)
  const [selectedEndDate, setSelectedEndDate] = React.useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCheckavaiable(true)
    setBookingHours(false)
    const Date = moment(date).format('YYYY-MM-DD').toString();
    setBookAppointmentRequest(prevValue => {

      return {
        ...prevValue,
        StartDate: Date
      };

    });

    if (expertDetails.BasicDetails.ServiceCharge === 1) {
      getAvailableSlots(date)
        .then(res => {
          console.log(res);
          setTimeSlots(res && res.SlotList ? res.SlotList : [])
        });
    }

    console.log(bookAppointmentRequest);
  };


  const handleEndDateChange = (date) => {
    setSelectedEndDate(date)

    const Date = moment(date).format('YYYY-MM-DD').toString();
    setBookAppointmentRequest(prevValue => {
      return {
        ...prevValue,
        EndDate: Date
      };
    });
    //console.log(bookAppointmentRequest.EndDate)
  }

  const getAvailableSlots = async (date) => {

    const Date = moment(date).format('YYYY-MM-DD').toString();
    const request = {
      ServiceProviderId: expertId,
      RequestingDate: Date,
      ticket: currentUser.Ticket
    };
    const result = await axios.post(`${API.URL}GetAvailableSlotPerhr`, request);
    return result.data.output;
  };

  const [request, setRequest] = React.useState({
    service: 'Static Website',
    price: '50',
    date: '06/06/20',
    quantity: 3,
    total: '150'

  });

  const [allRequest, setAllRequest] = React.useState([]);

  const checkForSequential = () => {

    let isSequential = true
    sequentialSlots.forEach((item, index) => {

      if(sequentialSlots.length === 1 || (index === sequentialSlots.length - 1)){
        return isSequential
      }

      if(sequentialSlots[index - 1] && sequentialSlots[index + 1] && (item - sequentialSlots[index - 1] !== 1) || (sequentialSlots[index + 1] - item !== 1)){
        isSequential = false
        return isSequential
      }
    })

    return isSequential

  }

  const sorter = (a, b) => {
    if(a < b) return -1
    if(a > b) return 1
    return 0
  }

  const onTimeSlotSelect = (startTime, endTime, timeslotno, index) => {

    if(!sequentialSlots.includes(index)){
      setSequentialSlots([...sequentialSlots, index].sort(sorter))
    }
    else{
      setSequentialSlots(sequentialSlots.filter(item => item!=index).sort(sorter))
    }

    setBookingHours(true);
    debugger;

    const slot = {
      StartTime: startTime.replace(".",":"),
      EndTime: endTime.replace(".",":"),
      TimeSlotNo: timeslotno
    };

    const slots = [...Slots];
    const existing = slots.find(item => item.StartTime === startTime.replace(".",":") && item.EndTime === endTime.replace(".",":"));

    if (existing) {
      const currentIndex = slots.indexOf(existing);
      slots.splice(currentIndex, 1);

    } else {
      slots.push(slot);
    }
    setSlots(slots);
    setBookAppointmentRequest(prevValue => {
      return {
        ...prevValue,
        ServiceListDetails: slots
      };
    });

    console.log(bookAppointmentRequest);

  };

  const handleChange = (event) => {

    setBookingHours(false);

    setCheckavaiable(false);
    const { value } = event.target;
    setBookAppointmentRequest(prevValue => {
      return {
        ...prevValue,
        ServiceId: value.ServiceId
      };
    });
  };

  const handleAssignmentChange = event => {
    setBookingHours(true);
    const { value } = event.target;
    console.log(value);
    setBookAppointmentRequest(prevValue => {
      return {
        ...prevValue,
        Assignments: value
      };
    });

  };
  const [setCheck, setCheckavaiable] = useState(false);

  const [setBooking, setBookingHours] = useState(false);

  const handleCheckAvalibility = () => {


    getAvailableSlotsFullTime()
      .then(res => {
        if (res.IsAvailable === true) {
          setBookingHours(true);
          setCheckavaiable(false);
        }
        else {
          setBookingHours(false);
        }

        setalert(res.Message)
       // alert(res.Message)


        setBookAppointmentRequest(previousValue => {
          return {
            ...previousValue,
            WorkingDays: res.WorkingDays
          }

        })

        //setTimeSlots(res.SlotList)


      })
      .catch(err => {
        alert('Kindly select Correct Start Date And End Date')
      });


  }

  const getAvailableSlotsFullTime = async () => {



    const request = {
      ServiceProviderId: expertId,
      StartDate: bookAppointmentRequest.StartDate,
      EndDate: bookAppointmentRequest.EndDate,
      Ticket: currentUser.Ticket,

    };
    const result = await axios.post(`${API.URL}GetAvailableFullTimeSlot`, request);

    return result.data.output;

  };


  const handleBooking = () => {
    setLoading(true);
    if (bookAppointmentRequest.ServiceId !== null) {
      var request;
      var URL;
      switch (expertDetails.BasicDetails.ServiceCharge) {
        case 1:
          URL = `${API.URL}RequestServiceProviderPerHr`;
          request = {
            ServiceProviderId: expertId,
            ServiceSeekerId: currentUser.Id,
            ServiceId: bookAppointmentRequest.ServiceId,
            StartDate: bookAppointmentRequest.StartDate,
            EndDate: bookAppointmentRequest.StartDate,
            RequestedTimeSlot: bookAppointmentRequest.ServiceListDetails,
            Ticket: currentUser.Ticket
          };
          console.log(request);
            bookAppointment(request, URL)
            .then(res => {
              setLoading(false);
              if (res) {
                alert('Booking Successfull!');
                window.location.reload();
              } else {
                alert('Booking unsuccessfull! Please Try again later!');
              }
            });

          break;

        case 2:
          const isNumber = Number.isInteger(Number(bookAppointmentRequest.Assignments));
          if (Number(bookAppointmentRequest.Assignments) < 1 || !isNumber) {
            alert('Invalid number of assignments !');
            return;
          }
          URL = `${API.URL}RequestServiceProviderPerAssignment`;
          request = {
            ServiceProviderId: expertId,
            ServiceSeekerId: currentUser.Id,
            ServiceId: bookAppointmentRequest.ServiceId,
            Ticket: currentUser.Ticket,
            Date: bookAppointmentRequest.StartDate,
            NoOfAssignment: Number(bookAppointmentRequest.Assignments)
          };
          bookAppointment(request, URL)
            .then(res => {
              setLoading(false);
              if (res) {
                alert('Booking Successfull!');
              } else {
                alert('Booking unsuccessfull! Please Try again later!');
              }
            });
          break;

        case 3:
          if (bookAppointmentRequest.EndDate === null) {
            alert('Please fill the end date');
            return;
          }
          URL = `${API.URL}RequestServiceProviderFullTime`;
          request = {
            ServiceProviderId: expertId,
            ServiceSeekerId: currentUser.Id,
            ServiceId: bookAppointmentRequest.ServiceId,
            Ticket: currentUser.Ticket,
            StartDate: bookAppointmentRequest.StartDate,
            WorkingDays: bookAppointmentRequest.WorkingDays,
            EndDate: bookAppointmentRequest.EndDate
          };
          bookAppointment(request, URL)
            .then(res => {
              setLoading(false);
              if (res) {
                alert('Booking Successfull!');
              } else {
                alert('Booking unsuccessfull! Please Try again later!');
              }
            });

          break;
        default:

      }
    } else {
      alert('please fill all the fields !');
    }


  };


  const bookAppointment = async (request, URL) => {
    console.log(URL);
    const result = await axios.post(`${URL}`, request);
    return result.data.output;
  };

  const handleClick = () => {

    setAllRequest(prevValue => {
      return [...prevValue, request]
        ;
    });
  };

  const classes = useStyles();
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  console.log('Service Charge value:', expertDetails && expertDetails.BasicDetails && expertDetails.BasicDetails.ServiceCharge)
  console.log('IS Sequential:', checkForSequential())
  if (expertDetails !== null) {
    return (
    <Container>
      <Grid container className={classes.container}>
        <Grid item lg='6' md="12" sm="12" className={classes.profileSection}>
          <Paper elevation={2} className={classes.paper}>
            <Grid container style={{ marginBottom: '20px' }}>

              <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{ marginTop: '2rem' }} item xs='4' className={classes.gridItem}>
              <Avatar alt="Remy Sharp" src={!process.env.NODE_ENV||process.env.NODE_ENV==='development'?`https://localhost:44327${expertDetails.BasicDetails.DPPath}`:`${process.env.REACT_APP_PROD_BASE_URL}${expertDetails.BasicDetails.DPPath}`} className={classes.large} />

              </Grid>
              <Grid item xs="auto" style={{ padding: isMobile ? '30px 30px 0px 0px' : '30px 20px 0px' }}>
                <Typography variant={isMobile ? 'h6' : 'h5'}>{expertDetails.BasicDetails.ServiceProvider}</Typography>
                <Typography variant={isMobile ? 'h6' : 'h5'}>{expertDetails.BasicDetails.ServiceType}</Typography>
              </Grid>
            </Grid>
            <Grid container style={{ marginBottom: '20px' }}>
              <Grid item xs='2'>
                <p style={{ width: "100%", height: '100%', fontSize: '20px', textAlign: 'right', padding: '5px' }}><span style={{ fontSize: '40px' }}>{expertDetails.BasicDetails.Rating.toFixed(1)}</span>/5</p>
              </Grid>
              <Grid item xs='4'>
                <Rating name="read-only" value={expertDetails.BasicDetails.Rating} readOnly precision={0.1} style={{ marginTop: '20px' }} size="large" />
              </Grid>
            </Grid>
            <Typography variant='h6'>About me:</Typography>
            <Typography variant='body1'>{expertDetails.BasicDetails.Description ? expertDetails.BasicDetails.Description : 'No Description found'}.</Typography>
            <Typography variant='h6'>How do I charge?</Typography>

            <Typography variant='body1'>{expertDetails.BasicDetails.ServiceCharge ? `I charge per ${expertDetails.BasicDetails.ServiceCharge === 1 ? 'Hour' : expertDetails.BasicDetails.ServiceCharge === 2 ? 'Assignment' : `FullDay(${expertDetails.BasicDetails.WorkingDays===1?'Mon-Fri':'Mon-Sat'})`}` : ''}.</Typography>

          </Paper>
        </Grid>
        <Grid item xs='6' className={classes.prceofileSection}>
          <Paper elevation={2} className={classes.paper}>
            <Typography variant='h5'>Services</Typography>
            <br />
            <Grid container>
              <Grid item xs='6'>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Select Service</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                  >
                    {expertDetails.ServiceList.map((item, index) => <MenuItem key={index} value={item}>{item.Services} at &#8377; {item.Fees}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container>
                <Grid item xs='6'>
                  <KeyboardDatePicker
                    style={{ width: '90%' }}
                    disableToolbar
                    autoOk={true}
                    variant="inline"
                    format="dd/MM/yyyy"
                    minDate={new Date()}
                    formatDate={(date) => moment(new Date()).format('DD-MM-YYYY')}
                    margin="normal"
                    id="date-picker-inline"
                    label="Select Start Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs='6' style={{ display: selectedDate !== null ? '' : 'none' }}>
                  {
                    (expertDetails.BasicDetails.ServiceCharge && expertDetails.BasicDetails.ServiceCharge === 1 ? timeSlots && timeSlots.length > 0 ? timeSlots.map((item, index) => <FormControlLabel
                      onChange={() => { onTimeSlotSelect(item.StartTime, item.EndTime, item.TimeSlotNo, index); }}
                      key={index}
                      control={<Checkbox name="gilad" style={{ padding: '10px', textAlign: 'Center', color: 'red' }} />}
                      label={`${item.StartTime} - ${item.EndTime}`}
                    />)
                      :
                      <Typography style={{ padding: '30px 20px 0 0', color: 'red' }} >Not Available</Typography>
                      : expertDetails.BasicDetails.ServiceCharge && expertDetails.BasicDetails.ServiceCharge === 2 ?

                        <Input
                          style={{ padding: '20px 20px 0 0', textAlign: 'right' }}
                          id="outlined-number"
                          placeholder="No. of Assignments"
                          type="number"
                          onChange={handleAssignmentChange}
                          value={bookAppointmentRequest.Assignments}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                        /> :
                        <KeyboardDatePicker
                          style={{ width: '90%' }}
                          disableToolbar
                          autoOk={true}
                          variant="inline"
                          format="dd/MM/yyyy"
                          onChange={handleEndDateChange}
                          formatDate={(date) => moment(new Date()).format('DD-MM-YYYY')}
                          minDate={selectedDate}
                          value={selectedEndDate}
                          margin="normal"
                          id="date-picker-inline"
                          label="Select End Date"
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                            )}
                            {alertmessage&&<Typography variant='subtitle1' style={{ padding: '30px 20px 0 0', color: 'red' }}>{alertmessage}</Typography>}

                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            <Grid >
              {setCheck && <Grid item xs={6}>
                {expertDetails.BasicDetails.ServiceCharge === 3 && <Button className={classes.button} onClick={handleCheckAvalibility} variant="contained" >
                  Check Avalibilty
                </Button>}
              </Grid>}
              <Backdrop className={classes.backdrop} open={loading} style={{zIndex:'9999'}}>
                <img src={loader} alt='loading' style={{opacity:'1'}} width='200' height='200'/>
              </Backdrop>
              {setBooking && <Grid item xs={6}>
                <Button className={classes.button} onClick={handleBooking} variant="contained" disabled={!checkForSequential()}>
                  BOOK NOW
                  </Button>
              </Grid>}

            </Grid>

          </Paper>
        </Grid>

      </Grid>
      <Grid container className={classes.container}>

      </Grid>
    </Container >
  );
  } else {
    return (
      <div>
      </div>
    )
  }

}
const mapStateToProps = createStructuredSelector({
  expertId: selectExpertId,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(UserDetailPage);
