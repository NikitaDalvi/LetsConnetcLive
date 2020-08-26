/*jshint esversion:9*/
import React, { useState } from "react";
import Heading from "./subComponents/page-headings";
import { Link } from "react-router-dom";
import DayTime from './subComponents/DayTime';
import { Button, Container, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectWorkingHours } from '../redux/service/service-selector';
import { selectCurrentUser } from '../redux/user/user-selector';
import { setWorkingHours, clearWorkingHours, setServicesProgress } from '../redux/service/service-actions';
import { setUserServiceStatus } from '../redux/user/user-actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { API } from '../API';

function Availability({ workingHours, currentUser, setWorkingHours, clearWorkingHours, setServiceStatus, setProgress }) {


  const saveToDatabase = async () => {
    if (workingHours !== []) {
      const request = {
        BufferTiming: buffer,
        WorkingHours: workingHours,
        ticket: currentUser.Ticket
      };
     
      console.log(request)
      return
      const res = await axios.post(`${API.URL}AddWorkingHours`, request);
      if (res) {
        if (res.data.responseCode === 200) {
          const requestData = {
            ServiceProviderId: currentUser.Id,
            ticket: currentUser.Ticket
          };
          const hoursSaved = {
            type: 2,
            ServiceCharge: currentUser.ServiceCharge,
            ServiceGiven: currentUser.ServiceGiven
          };
          setServiceStatus(hoursSaved);
          if (currentUser.isLocationsAdded) {
            setProgress(100);
          } else {
            setProgress(66);
          }
          getWorkingHours(requestData)
            .then(result => setSelectedWorkingDays(result));
        }
      }
    }
  };
  const [serviceAdded, setServiceAdded] = React.useState(false);
  const [chargeType, setChargeType] = React.useState(1);
  const [buffer, setBuffer] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedWorkingDays, setSelectedWorkingDays] = React.useState([]);
  const [savedDays, setSavedDays] = React.useState([]);
  React.useEffect(() => {
    if (currentUser) {
      setChargeType(currentUser.ServiceCharge);
      setServiceAdded(currentUser.isServicesAdded);
      const requestData = {
        ServiceProviderId: currentUser.Id,
        ticket: currentUser.Ticket
      };
      getWorkingHours(requestData)
        .then(res => {
          if (res) {
            console.log(res);
            if (res.length !== 0) {
              clearWorkingHours();
              res.map(day => {
                switch (day.WorkingDays) {
                  case 1:
                    day.WorkingDays = "Monday";
                    setSavedDays(prevValue => {
                      return [...prevValue, 'Monday'];
                    });

                    break;
                  case 2:
                    day.WorkingDays = "Tuesday";
                    setSavedDays(prevValue => {
                      return [...prevValue, 'Tuesday'];
                    });

                    break;
                  case 3:
                    day.WorkingDays = "Wednesday";
                    setSavedDays(prevValue => {
                      return [...prevValue, 'Wednesday'];
                    });

                    break;
                  case 4:
                    day.WorkingDays = "Thursday";
                    setSavedDays(prevValue => {
                      return [...prevValue, 'Thursday'];
                    });

                    break;
                  case 5:
                    day.WorkingDays = "Friday";
                    setSavedDays(prevValue => {
                      return [...prevValue, 'Friday'];
                    });

                    break;
                  case 6:
                    day.WorkingDays = "Saturday";
                    setSavedDays(prevValue => {
                      return [...prevValue, 'Saturday'];
                    });

                    break;
                  case 7:
                    day.WorkingDays = "Sunday";
                    setSavedDays(prevValue => {
                      return [...prevValue, 'Sunday'];
                    });

                    break;
                  default:

                }
              });
              setWorkingHours(res);
            }

          } else {
            alert('getting details failed!');
          }

        });
    }

  }, [currentUser, setWorkingHours]);

  const getWorkingHours = async (data) => {
    const res = await axios.post(`${API.URL}GetWorkingHourListByServiceProviderId`, data);
    return res.data.output;
  };

  const useStyles = makeStyles((theme) => ({

    button: {
      width: '100%',
      height: '50px',
      background: 'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
      color: 'white'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }


  }));

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleAlert = () => {
    setOpen(true);
  };


  const classes = useStyles();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (!serviceAdded) {
    return (
      <div>
        <Alert style={{ width: '70%' }} onClose={handleClose} severity="warning">
          Please first save your services !
    </Alert>
      </div>
    );
  } else {
    if (chargeType === 3 || chargeType === 2) {
      return (
        <div>
          <Alert style={{ width: '70%' }} onClose={handleClose} severity="warning">
            Full-Time Service-Provider has preferred working hours of 9:00am - 6:30pm.
      </Alert>
        </div>
      );
    } else {
      return (
        <div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
              Only 2 timeslots can be added per day !
      </Alert>
          </Snackbar>
          <div style={{ textAlign: 'left  ' }}>
            <br />
            <Container style={{ width: '80%', marginLeft: '0' }}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Buffer</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={buffer}
                  onChange={(event) => { setBuffer(event.target.value); console.log(buffer); }}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value="" disabled>
                    Placeholder
            </MenuItem>
                  <MenuItem value={1}>30</MenuItem>
                  <MenuItem value={2}>60</MenuItem>
                </Select>
              </FormControl>
              <br />
              <br />
              {
                days.map((day, index) => (
                  <DayTime key={index} alert={handleAlert} id={index} savedDays={savedDays} day={day} />
                ))
              }

              <br />
              <Link to="/UserPage/ServiceProvider/Dashboard" style={{ textDecoration: "none" }}>
                <Button className={classes.button} style={{ width: '22%', margin: '5px' }} onClick={() => { saveToDatabase(); }} variant="contained" startIcon={<SaveAltIcon />}>
                  Apply & Save
             </Button>
              </Link>
            </Container>
          </div>
        </div>
      );
    }

  }

}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  workingHours: selectWorkingHours
})

const mapDispatchToProps = dispatch => ({
  setWorkingHours: list => dispatch(setWorkingHours(list)),
  clearWorkingHours: () => dispatch(clearWorkingHours()),
  setProgress: value => dispatch(setServicesProgress(value)),
  setServiceStatus: value => dispatch(setUserServiceStatus(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Availability);