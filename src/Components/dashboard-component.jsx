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
    <DashboardCard caption="Service Request" name="NEW" quantity='10'  />
    </Grid>
    <Grid item xs={4}>
    <DashboardCard caption="Service Request" name="ONBOARD" quantity='5'  />
    </Grid>
    <Grid item xs={4}>
    <DashboardCard caption="Service Request" name="UPCOMING" quantity='50' />
    </Grid>
    <br/>

<Grid item xs={4}>
    <DashboardCard caption="Service Request" name="COMPLETED"  quantity='999'  />
    </Grid>
    <Grid item xs={4}>
    <DashboardCard caption="Commission"  name="COMMISION DUE" quantity="&#8377;1,11,000" />
    </Grid>
    <Grid item xs={4}>
    <DashboardCard id="Wallet" type="SP" name="My Wallet" routeName="Wallet" />
    </Grid>
    </Grid>
    </Container>
    </div>
);
}
export default Dashboard;
