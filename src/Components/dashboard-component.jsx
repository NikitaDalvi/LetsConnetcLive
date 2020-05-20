import React from 'react';
import DashboardCard from "./subComponents/Dashboard-card";
 import {Container,Grid,makeStyles} from '@material-ui/core';

 const useStyles = makeStyles((theme) => ({
   grid:{
     width:'80%'

   }
 }));



const Dashboard = (props) => {
  const classes = useStyles();
  return(
  <div>
  <Container>
  <Grid container spacing={2} className={classes.grid}>
    <Grid item xs={4}>
    <DashboardCard color='#EA4335' caption="Service Request" name="NEW" quantity='10'  />
    </Grid>
    <Grid item xs={4}>
    <DashboardCard color='#4285F4' caption="Service Request" name="ONBOARD" quantity='5'  />
    </Grid>
    <Grid item xs={4}>
    <DashboardCard color='#34A853' caption="Service Request" name="UPCOMING" quantity='50' />
    </Grid>
    <br/>

<Grid item xs={4}>
    <DashboardCard color='#B887F8' caption="Service Request" name="COMPLETED"  quantity='999'  />
    </Grid>
    <Grid item xs={4}>
    <DashboardCard color='#F4347B' caption="Commission Due"  name="COMMISION DUE" quantity="&#8377;1,11,000" />
    </Grid>
    <Grid item xs={4}>
    <DashboardCard color='#FFBE57' caption='Rating and Review' name="RATING AND REVIEW" rating='4.5 &#10032;' quantity='5,000'  />
    </Grid>
    </Grid>
    </Container>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    </div>

);
}
export default Dashboard;
