/*jshint esversion:9*/
import React, { useEffect, useState } from 'react';
import DashboardCard from "./subComponents/Dashboard-card";
import { Container, Grid, makeStyles, Box } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserType, selectCurrentUser, selectDashboardDetails } from '../redux/user/user-selector';
import { setDashboardDetails } from '../redux/user/user-actions';
import axios from 'axios';
import { API } from '../API';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '100%',
    marginTop: "2%"
  }
}));





const Dashboard = (props) => {
  const [dashboardDetails, setDashboardDetails] = useState({});
  const { currentUser, dashBoardCounts, setDashBoardCounts, userType } = props;

  useEffect(() => {
    if (currentUser) {
      var data = {
        Id: currentUser.Id,
        ticket: currentUser.Ticket
      };
      if (userType === 'Service-Provider') {
        axios.post(`${API.URL}getSPDashboardDetails`, data)
          .then(res => { console.log(res.data.output); setDashboardDetails(res.data.output) })
          .catch(error => alert('Error from Dashboard details api'));
      }
    }



    // var result =  getDashboardDetails(data);
    // console.log(result);
  }, [currentUser, setDashBoardCounts, userType]);

  // async function getDashboardDetails(data){
  //   var result = await axios.post('https://localhost:44327/api/getSPDashboardDetails',data);
  //   return result;
  // }

  const classes = useStyles();
  if (props.userType === 'Service-Provider') {
    return (
      <div>
        <Container>
          <center>{currentUser && currentUser.Status === 6 && <Box width="50%" p={2} bgcolor={green} style={{ color: '#ffffff' }}>USER ACTIVE</Box>}</center>
          <center>{currentUser && currentUser.Status !== 6 && <Box width="50%" p={2} bgcolor={red} style={{ color: '#ffffff' }}>User is not Active</Box>}</center>

          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={3}>
              <DashboardCard color='#EA4335' caption="Service Request" name="NEW" quantity={dashboardDetails !== null ? dashboardDetails.NewRequests : '50'} />
            </Grid>
            <Grid item xs={3}>
              <DashboardCard color='#4285F4' caption="Service Request" name="TODAY" quantity={dashboardDetails !== null ? dashboardDetails.TodaysRequest : '50'} />
            </Grid>
            <Grid item xs={3}>
              <DashboardCard color='#34A853' caption="Service Request" name="UPCOMING" quantity={dashboardDetails !== null ? dashboardDetails.Upcomming : '50'} />
            </Grid>

            <Grid item xs={3}>
              <DashboardCard color='#B887F8' caption="Service Request" name="COMPLETED" quantity={dashboardDetails !== null ? dashboardDetails.Completed : '50'} />
            </Grid>
            <Grid item xs={3}>
              <DashboardCard color='#F4347B' caption="Commission Due" name="COMMISION DUE" quantity="&#8377;1,11,000" />
            </Grid>
            <Grid item xs={3}>
              <DashboardCard color='#FFBE57' caption='Rating and Review' name="RATING AND REVIEW" rating={dashboardDetails !== null ? `${dashboardDetails.AvgRating}` : '5 &#10032;'} quantity={dashboardDetails !== null ? dashboardDetails.ReviewCount : '50'} />
            </Grid>
          </Grid>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

    );
  } else {
    return (
      <div>
        <Container>
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={3}>
              <DashboardCard color='#EA4335' caption="Nearby Experts" name="NEARBY EXPERTS" quantity='10' />
            </Grid>
            <Grid item xs={3}>
              <DashboardCard color='#4285F4' caption="Service Requests" name="CONFIRMED" quantity='50' />

            </Grid>
            <Grid item xs={3}>
              <DashboardCard color='#34A853' caption="Service Request" name="PENDING" quantity='999' />
            </Grid>

            <Grid item xs={3}>
              <DashboardCard color='#B887F8' caption="Service Request" name="PAST" quantity='999' />
            </Grid>
            <Grid item xs={4}>
              <DashboardCard color='#FFBE57' caption='Rating and Review' name="RATING AND REVIEW" rating='4.5 &#10032;' quantity='5,000' />
            </Grid>
          </Grid>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>

    );
  }

}

const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
  currentUser: selectCurrentUser,
  dashBoardCounts: selectDashboardDetails
})

const mapDispatchToProps = dispatch => ({
  setDashBoardCounts: object => dispatch(setDashboardDetails(object))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
