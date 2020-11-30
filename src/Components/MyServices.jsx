/*jshint esversion:9*/
import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import ServicesToProvide from './ServicesToProvide';
import BasicToDetails from './BasicToDetails';
import Location from './Location';
import Availability from "./Availability";
import PropTypes from 'prop-types';
import { makeStyles, Container, Typography, Link, CircularProgress, Box, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user-selector';
import { selectMyServicesProgress } from '../redux/service/service-selector';
import { setServicesProgress } from '../redux/service/service-actions';
import { withRouter } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginTop: '1%'
  },

  link: {
    '&:hover': {
      textDecoration: 'none!important',
      cursor: 'pointer'
    }
  }
}));



CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


function CircularProgressWithLabel({ value }) {
  return (
    <div>
      <Grid container style={{ width: '50%' }}>
        <Grid item xs='1'>
          <Box position="relative" display="inline-flex" style={{ marginTop: '2%' }}>
            <CircularProgress variant="static" value={value} style={{ color: value === 0 ? '#E7031E' : value < 34 ? '#FEFD07' : value < 100 && value > 34 ? '#FE8A07' : '#1AD502' }} />
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                value,
              )}%`}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs='4' style={{ paddingTop: '5px' }}>
          <Typography variant='h6'>Complete</Typography>
        </Grid>
      </Grid>
    </div>
  );
}


function MyServices({ history, progress, setProgress, currentUser, ...props }) {
  
  const [focus, setFocus] = useState('');

  const classes = useStyles();


  function handleBasic() {
    setFocus('BasicDetails');
    history.push('/UserPage/ServiceProvider/MyServices/BasicToDetails');
  }

  function handleServices() {
    setFocus('Services');
    history.push('/UserPage/ServiceProvider/MyServices/ServicesToProvide');
  }

  function handleWorkingHours() {
    setFocus('WorkingHours');
    history.push("/UserPage/ServiceProvider/MyServices/Availability");
  }

  function handleLocation() {
    setFocus('Location');
    history.push("/UserPage/ServiceProvider/MyServices/Location");
  }

  React.useEffect(() => {
    if (currentUser != null) {
      if (currentUser.isLocationsAdded && currentUser.isServicesAdded && currentUser.isWorkingHoursAdded) {
        setProgress(100);
        return;
      }
      if ((currentUser.isServicesAdded && currentUser.isLocationsAdded) || (currentUser.isWorkingHoursAdded && currentUser.isLocationsAdded) || (currentUser.isWorkingHoursAdded && currentUser.isServicesAdded)) {
        setProgress(66);
        return;
      }
      if (currentUser.isServicesAdded || currentUser.isLocationsAdded || currentUser.isWorkingHoursAdded) {
        setProgress(34)
        return;
      }
      if (!currentUser.isServicesAdded && !currentUser.isLocationsAdded && !currentUser.isWorkingHoursAdded) {
        setProgress(0);
        return;
      }
    }


    // setProgress(10);
    // console.log(progress);
  }, [currentUser, setProgress])

  console.log('Location.......:', currentUser && currentUser.isServicesAdded)
  return (
    <Container>
      <CircularProgressWithLabel value={progress} />
      <Typography className={classes.root}>
        <Link onClick={handleBasic} color="inherit" className={classes.link} style={{ color: focus === 'BasicDetails' ? '' : 'Gray' }}>
        Basic Details
        </Link>
        {currentUser && currentUser.ServiceCharge &&<Link onClick={()=>{handleServices()}} color="inherit" className={classes.link} style={{ color: focus === 'Services' ? '' : 'Gray' }}>
          Services
        </Link>}
        {currentUser && currentUser.isServicesAdded && <Link onClick={() => { handleLocation() }} color="inherit" className={classes.link} style={{ color: focus === 'Location' ? 'Black' : 'Gray' }}>
          Location
        </Link>}
        {currentUser &&currentUser.ServiceCharge&& currentUser.isServicesAdded && currentUser.isLocationsAdded && <Link onClick={handleWorkingHours} color="inherit" className={classes.link} style={{ color: focus === 'WorkingHours' ? '' : 'Gray' }}>
          Working Hours
        </Link>}
      </Typography>
      <br />
      <br />
      <Switch>
        <Route path="/UserPage/ServiceProvider/MyServices/BasicToDetails" exact component={BasicToDetails} />
        <Route path="/UserPage/ServiceProvider/MyServices/ServicesToProvide" exact component={ServicesToProvide} />
        <Route path="/UserPage/ServiceProvider/MyServices/Location" exact component={Location} />
        <Route path="/UserPage/ServiceProvider/MyServices/Availability" exact component={Availability} />
      </Switch>
    </Container>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  progress: selectMyServicesProgress
})

const mapDispatchToProps = dispatch => ({
  setProgress: value => dispatch(setServicesProgress(value)),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyServices));
