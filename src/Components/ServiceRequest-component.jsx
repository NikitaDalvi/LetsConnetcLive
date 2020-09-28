/*jshint esversion:9*/
import React, { useEffect, useState } from 'react';
import { AppBar, CardHeader, Card, CardContent, Typography, makeStyles, Toolbar, Button, Grid, TextField, InputAdornment, Input } from '@material-ui/core';
import ServiceCard from './subComponents/ServiceRequestCard-component';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import Modal from '@material-ui/core/Modal';
import Rating from '@material-ui/lab/Rating';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserType, selectCurrentUser } from '../redux/user/user-selector';
import axios from 'axios';
import { API } from '../API';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '95%',
    maxHeight: '800px',

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  CardHeader: {
    color: 'white',
    borderRadius: '4px'
  },
  CardContent: {
    overflowY: 'auto',
    maxHeight: '600px',

    '&::-webkit-scrollbar': {
      display: 'none'
    },
    grid: {
      marginRight: theme.spacing(4)
    },
  },
  rateArea: {
    width: '23%',
    fontSize: '20px'
  },
  button: {
    width: '130px',
    height: '50px',
    background: '#ffd600',
    color: 'white',
    margin: theme.spacing(1),
  }
}));



const data = [
  {
    name: 'Saurabh Mane',
    dos: '12 May',
    type: 'pending',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Devang Khandhar',
    dos: '11 June',
    type: 'pending',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Dishank Mehta',
    dos: '01 Dec',
    type: 'approved',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Karan Chaudhari',
    dos: '15 Oct',
    type: 'approved',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Rohan Naik',
    dos: '12 Nov',
    type: 'completed',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Vidhi Roy',
    dos: '12 Sept',
    type: 'completed',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Mayank Joshi',
    dos: '30 May',
    type: 'approved',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Surabhi Patil',
    dos: '30 May',
    type: 'approved',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Rahul Roy',
    dos: '01 June',
    type: 'pending',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Vicky Kapoor',
    dos: '19 May',
    type: 'pending',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Surabhi Joshi',
    dos: '01 Sept',
    type: 'approved',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  },
  {
    name: 'Aditya Mhatre',
    dos: '05 Oct',
    type: 'completed',
    services: [{
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    },
    {
      service: 'Financial consulting',
      timeSlots: [{
        startTime: '10:00',
        endTime: '12:00'
      },
      {
        startTime: '10:00',
        endTime: '12:00'
      }]
    }]
  }
]







function ServiceRequest(props) {

  //   function rand() {
  //   return Math.round(Math.random() * 20) - 10;
  // }

  function getModalStyle() {


    return {
      position: 'absolute',
      width: '400px',
      color: 'black',
      top: `20%`,
      left: `40%`,
      transform: `translate(10%, 30%)`,
      backgroundColor: 'white',
      padding: '20px 40px 30px',
      textAlign: 'center'
    };
  }

  const { currentUser } = props;

  const classes = useStyles();

  const newItem = data.filter(item => item.type === 'pending');
  const todayItem = data.filter(item => item.dos === '30 May');
  const onBoardItem = data.filter(item => item.type === 'approved' && item.dos !== '30 May');
  const completedItem = data.filter(item => item.type === 'completed');


  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [rate, setRate] = useState('');
  const [name, setName] = useState('');
  const [newRequests, setNewRequests] = useState([]);
  const [Today, setToday] = useState('');
  const [confirmedRequests, setConfirmedRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);

  

  useEffect(() => {
    if (currentUser) {
      
      const today = formatDate(new Date());
      setToday(today);

      const request = {
        ServiceProviderId: currentUser.Id,
        ticket: currentUser.Ticket,
        ServiceSeekerId:currentUser.Id,
      }

      props.userType === "Service-Provider" ? delete request.ServiceSeekerId : delete request.ServiceProviderId
      
      GetRequests(request)
        .then(res => {
          setNewRequests(res && props.userType === "Service-Provider" ? res.NewReqest : res);
          setConfirmedRequests(res && res.OnBoardedRequest);
        })
    }
  }, [currentUser]);

  

  async function GetRequests(data) {
    console.log(props.userType)
    

    let apiUrl = (props.userType === 'Service-Provider'? 'RequestListByServiceProviderId' : 'GetServiceListBySEIdAndStatus')
    const result = await axios.post(`${API.URL}${apiUrl}`, data);
    console.log(result);
    return result.data.output;
  }

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleRate = (event) => {
    const { value } = event.target;
    setRate(value);
  }

  const handleOpen = (Name) => {
    setName(Name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleAppointmentStatus = (object) => {
    changeAppointmentStatus(object)
      .then(res => {
        if (res.responseCode === 200 && object.Status === 1) {
          const appointment = newRequests.find(item => item.ServiceRequestId === object.RequestId);
          setConfirmedRequests(prevValue => {
            return [...prevValue, appointment];
          });
          const appointments = newRequests.filter(item => item.ServiceRequestId === object.RequestId);
          setNewRequests(appointments);
          alert('Appointment confirmed successfully!');
          return;
        }
        if (res.responseCode === 200 && object.Status === 2) {
          const appointments = newRequests.filter(item => item.ServiceRequestId === object.RequestId);
          setNewRequests(appointments);
          alert('Appointment rejected successfully!');
          return;
        }
        alert('Unexpected error occured!');
      });
  };

  const changeAppointmentStatus = async (data) => {
    const result = await axios.post(`${API.URL}ApproveRejectRequest`, data);
    console.log(result);
    return result.data;
  };

  const body = (
    <div style={modalStyle} >
      <Typography variant='h4'>{name}</Typography>
      <Input
        id="outlined-number"
        label="Rate"
        endAdornment={<InputAdornment position="end">/5</InputAdornment>}
        type="number"
        value={rate}
        className={classes.rateArea}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleRate}
        variant="standard"
      />
      <br />
      <br />
      <Rating precision={0.5} name="read-only" value={rate} readOnly size="large" />
      <br />
      <br />
      <TextField multiline rows={4} label='review' variant='outlined' style={{ width: '100%' }} />
      <br />
      <Button startIcon={<DoneIcon />} color='secondary' variant='contained' className={classes.button}>Submit</Button>
      <Button startIcon={<CloseIcon />} variant='contained' color='primary' onClick={handleClose} className={classes.button}>Close</Button>
    </div>
  );

  console.log(confirmedRequests);
  return (
    <div>
      <AppBar position="static" style={{ borderRadius: '5px', height: '60px', backgroundColor: 'white' }}>
        <Toolbar variant="dense" style={{ marginTop: '5px' }}>
          <PermContactCalendarIcon style={{ color: 'black' }} />
          <Typography variant="h6" style={{ color: 'black', marginLeft: '10px' }}>
            Service Requests
    </Typography>
        </Toolbar>
      </AppBar>
      <hr />
      <Grid container className={classes.grid}>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardHeader
              className={classes.CardHeader}
              title={props.userType==='Service-Provider'?"New":'Pending'}
              style={{backgroundColor:'#EA4335'}}
            />
            <CardContent className={classes.CardContent}>
              <div>
                {newRequests && newRequests.map((item, index) => (<ServiceCard key={index} commissionId={item.CommissionId} ticket={currentUser.Ticket} Id={item.ServiceRequestId} handleStatus={handleAppointmentStatus} name={item.RequestedBy} userType={props.userType} amount={item.Amount} status={item.Status} service={item.Service} timeslots={item.TimeList} date={item.TimeList[0].StartDate} />))}
              </div>
            </CardContent>
            
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardHeader
              className={classes.CardHeader}
              title="Today"
              style={{ backgroundColor: '#1976d2' }}
            />
            <CardContent className={classes.CardContent}>

              <div>
                {confirmedRequests && confirmedRequests.map((item, index) => (item.TimeList[0].StartDate === Today ? <ServiceCard key={index} commissionId={item.CommissionId} ticket={currentUser.Ticket} Id={item.ServiceRequestId} name={item.RequestedBy} amount={item.Amount} status={1} service={item.Service} timeslots={item.TimeList} date={item.TimeList[0].StartDate} /> : ''))}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardHeader
              className={classes.CardHeader}
              title={props.userType === 'Service-Provider' ? "OnBoard" : 'Confirmed'}
              style={{ backgroundColor: '#2e7d32' }}
            />
            <CardContent className={classes.CardContent}>

              <div>
                {confirmedRequests && confirmedRequests.map((item, index) => (item.TimeList[0].StartDate !== Today ? <ServiceCard key={index} Id={item.ServiceRequestId} commissionId={item.CommissionId} ticket={currentUser.Ticket} name={item.RequestedBy} amount={item.Amount} status={1} service={item.Service} timeslots={item.TimeList} date={item.TimeList[0].StartDate} /> : ''))}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.root}>
            <CardHeader
              className={classes.CardHeader}
              title={props.userType === 'Service-Provider' ? "Completed" : 'Past'}
              style={{ backgroundColor: '#fdd835' }}
            />
            <CardContent className={classes.CardContent}>

              <div>
                {newRequests && newRequests.map((item, index) => (<ServiceCard key={index} Id={item.ServiceRequestId} commissionId={item.CommissionId} ticket={currentUser.Ticket} name={item.RequestedBy} amount={item.Amount} status={4} service={item.Service} timeslots={item.TimeList} date={item.TimeList[0].StartDate} handleModal={handleOpen} />))}
              </div>
            </CardContent>
          </Card>
  </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Grid>


    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userType: selectUserType
})

export default connect(mapStateToProps)(ServiceRequest);
