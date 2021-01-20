/*jshint esversion:9*/
/*jshint -W087*/
import React, { useState } from "react";
import Heading from "./subComponents/page-headings";
import { Link } from "react-router-dom";
import DayTime from './subComponents/DayTime';
import { Button, Container, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectServiceType, selectWorkingHours } from '../redux/service/service-selector';
import { selectCurrentUser } from '../redux/user/user-selector';
import { setWorkingHours, clearWorkingHours, setServicesProgress } from '../redux/service/service-actions';
import { setUserServiceStatus } from '../redux/user/user-actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { API } from '../API';
import Tooltip from "@material-ui/core/Tooltip";

function Availability({ workingHours, currentUser, setWorkingHours, clearWorkingHours, setServiceStatus, setProgress, serviceTypeId }) {



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
          debugger;
          console.log(res)
          if (res) {
            console.log(res);
            if (res.length !== 0) {
              clearWorkingHours();
              res.map(day => {

                setSavedDays(prevValue => {
                  return [...prevValue, day.WorkingDays]
                })

              });
              setWorkingHours(res);
              console.log(res._BufferTiming)
              if(res.length != 0){
              setBuffer(res[0]._BufferTiming);
            }
          }else{
                          setWorkingHours([]);
          }

          } else {

          }

        });
    }

  }, [currentUser, setWorkingHours]);


  const saveToDatabase = async () => {

    if (workingHours !== []) {
      const request = {
        ticket: currentUser.Ticket,
        BufferTiming: buffer,
        WorkingHours: {
          ServiceProviderId: currentUser.Id,
          ServiceTypeId: serviceTypeId,
          WorkingHourDetails:workingHours.map(data => {
            let newData = data
            delete newData.ServiceProviderId
            delete newData.ServiceTypeId
            return newData
          })
        }


      };

      console.log(request);
      //return
      const res = await axios.post(`${API.URL}AddWorkingHours`, request);
      if (res) {
        debugger;
        console.log(res);
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
            .then(result =>
              setSelectedWorkingDays(result)
              );
        }
      }
    }
  };

  const statusBuffer = (buffer) => {
    switch (buffer) {
      case 1:
        return "Buffer Time 30";

      case 2:
        return "Buffer Time 60";

        default:
        return "Buffer Time is not Set";
    }
  };

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

  const handleInvalidFormat = ()=>{
    alert('Invalid Time Format!');
  };

  const classes = useStyles();

  const days = [7, 1, 2, 3, 4, 5, 6];
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
           {/*<Tooltip title={statusBuffer(buffer)}>
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
      </Tooltip>*/ }
              <br />
              <br />
              {
                days.map((day, index) => (
                  <DayTime key={index} alert={handleAlert} invalidFormat={handleInvalidFormat} id={index} savedDays={savedDays} day={day} typeId={serviceTypeId}/>
                ))
              }

              <br />
            </Container>
          </div>
        </div>
      );
    }

  }

}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  workingHours: selectWorkingHours,
  serviceTypeId: selectServiceType
})

const mapDispatchToProps = dispatch => ({
  setWorkingHours: list => dispatch(setWorkingHours(list)),
  clearWorkingHours: () => dispatch(clearWorkingHours()),
  setProgress: value => dispatch(setServicesProgress(value)),
  setServiceStatus: value => dispatch(setUserServiceStatus(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Availability);
