/*jshint esversion:9*/
import React,{useState} from 'react';
import { Switch, Route} from "react-router-dom";
import ServicesToProvide from './ServicesToProvide';
import {makeStyles,Container,Typography,Link} from '@material-ui/core';
import {withRouter} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginTop:'3%'
  },

  link:{
    '&:hover':{
      textDecoration: 'none!important'
    }
  }
}));






function MyServices({history}){
const [focus,setFocus] = useState('Services');

  const classes = useStyles();


  function handleServices(){
    setFocus('Services');
  }

  function handleWorkingHours(){
      setFocus('WorkingHours');
  }

  function handleLocation(){
    setFocus('Location');
  }

  return (
    <Container>
    <Typography className={classes.root}>
  <Link href="#" onClick={handleLocation} color="inherit" className={classes.link} style={{color:focus==='Location'?'':'Gray'}}>
    Location
  </Link>
  <Link href="#" onClick={handleWorkingHours} color="inherit" className={classes.link} style={{color:focus==='WorkingHours'?'':'Gray'}}>
    Working Hours
  </Link>
  <Link href='/UserPage/ServiceProvider/MyServices/ServicesToProvide' onClick={handleServices} color="inherit" className={classes.link} style={{color:focus==='Services'?'':'Gray'}}>
    Services
  </Link>
</Typography>
<br/>
<br/>
      <Switch>
        <Route path="/UserPage/ServiceProvider/MyServices/ServicesToProvide" exact  component={ServicesToProvide}/>
      </Switch>
    </Container>
  );
}

export default withRouter(MyServices);
