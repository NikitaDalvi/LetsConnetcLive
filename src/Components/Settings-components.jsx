/*jshint esversion:9*/
import React from 'react';
import {Container,makeStyles,Typography,Link} from '@material-ui/core';
import { Switch, Route} from "react-router-dom";
import ChangePassword from './changePassword-component';
import Deactivation from './Deactivation-component';
import MySubscription from './MySubscription-component';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginTop:'3%'
  }

}));

function Settings(){
  const classes = useStyles();
  return(
    <Container>
    <Typography className={classes.root}>
  <Link  color="inherit" className={classes.link} href='/UserPage/Settings/ChangePassword' >
    Change Password
  </Link>
  <Link  color="inherit" className={classes.link} href='/UserPage/Settings/MySubscription' >
    My Subscription
  </Link>
  <Link  color="inherit" className={classes.link} href='/UserPage/Settings/Deactivation' >
    Deactivation
  </Link>
</Typography>
<br/>
<br/>
      <Switch>
        <Route path="/UserPage/Settings/ChangePassword" exact  component={ChangePassword}/>
        <Route path="/UserPage/Settings/Deactivation" exact  component={Deactivation}/>
        <Route path="/UserPage/Settings/MySubscription" exact  component={MySubscription}/>
      </Switch>

    </Container>
  );
}

export default Settings;
