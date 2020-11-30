/*jshint esversion: 9*/
import React, { useState } from "react";

//import LoggedInCustomer from "./LoggedInUser-C-component";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setCurrentUser, setUserType, setRegisteredUser,setSubscriptionType } from '../redux/user/user-actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectUserType } from '../redux/user/user-selector';
import { Snackbar, Typography, makeStyles, TextField, Grid, Button, Container, Backdrop, CircularProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useMediaQuery } from 'react-responsive';
import { API } from "../API";

function Login(props) {

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const [input, setInput] = useState({
    EmailId: "",
    password: ""
  })

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('info');


  async function handleClick() {
  checkValidation()
    
  }

  const checkForValidation = () => {
    const {EmailId, password} = input
    return EmailId 
            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(EmailId) 
            && password 
            
  }


  function handleChange(event) {
    const { name, value } = event.target;

    setInput(
      prevValue => {
        return {
          ...prevValue,
          [name]: value
        };
      });
  }

  // const getResponse = async() => {
  //   const res =  await axios.post('https://localhost:44327/api/login/loginUser',input);
  //   return res.data.output;
  // };
  async  function checkValidation(){
    // props.history.push(`/UserPage/ServiceProvider/RatingAndReview`);
    setLoading(true);
   const{setCurrentUser,setUserType,setRegisteredUser} = props;
   const result = await axios.post(`${API.URL}login/loginUser`, input);
   const res = result.data.output;
  console.log(res);
  if(res !== null){
    console.log(res.Status);
  
    if(props.userType === 'Service-Provider'){
      debugger
      if(res.UserRole === 4 || res.UserRole === 5){
        setSeverity('info');
        setAlert('These credentials belong to a Customer account. Please Login again !');
        handleAlert();
        setUserType('Customer');
        setLoading(false);
        return;
      }
      switch (res.Status) {
        case 1:
        setRegisteredUser(res);
        props.history.push('/Registration/Subscription');
        return;
        case 2:
        case 5:
        setRegisteredUser(res);
        props.history.push('/Registration/KYC');
        return;
        case 3:
        case 4:
        case 6:
        case 7:
        case 9:
        setCurrentUser(res);
        setLoading(false);
        if(res.UserRole!== 6){
                props.history.push('/UserPage/ServiceProvider/Dashboard');
        }else{
          props.history.push('/UserPage/SPAdmin/MyEmployees');
        }
  
        break;
        default:
            return;
      }
    }else{
      debugger
      if(res.UserRole === 2 ||res.UserRole === 3 ||res.UserRole === 6){
        setSeverity('info');
        setAlert('These credentials belong to a Service-Provider account. Please Login again !');
        handleAlert();
        setUserType('Service-Provider');
        setLoading(false);
        return;
      }
      switch (res.Status) {
        case 1:
        setRegisteredUser(res);
        props.history.push('/Registration/Subscription');
        return;
        case 2:
        setRegisteredUser(res);
        props.history.push('/Registration/KYC');
        return;
        case 6:
        case 7:
        case 9:
        setCurrentUser(res);
        setLoading(false);
        props.history.push('/UserPage/Customer/Dashboard');
        break;
        default:
            return;
      }
      // if(res.Status === 1){
      //   setRegisteredUser(res);
      //   props.history.push('/Registration/Subscription');
      //   return;
      // }
      //   setCurrentUser(res);
      //   setLoading(false);
      // props.history.push('/UserPage/Customer/Dashboard');
    }
  }else{
    setOpen(false);
    setSeverity('error');
    setAlert('Invalid Credentails!. Please try again.');
    handleAlert();
    setLoading(false);
    console.log('invalid');
  }
  // .then(res => res.data.output !== null ? setCurrentUser(res.data.output): console.log("invalid"))
  // .then(res => console.log(res.data.output.Id));
  
  
  
  // console.log(props.currentUser);
  //
  // if(props.currentUser !== null){
  //   debugger
  //
  // }
  
  
    // if(input.username === "user" && input.password === "password"){
    //   setLogIn(true);
    //   if(userType==="new"){
    //     if(props.type==="Service-Provider"){
    //       setStage("services");
    //     }else if(props.type === "Customer"){
    //         props.history.push(`/UserPage/${props.type}`)
    //     }
    //   }else if (userType==="old") {
    //     if(props.type==="Service-Provider"){
    //       props.history.push(`/UserPage/${props.type}`)
    //     }else if(props.type === "Customer"){
    //         props.history.push(`/UserPage/${props.type}`)
    //     }
    //   }
    // }else{
    //   setLogIn(false);
    // }
  
  
  
  }
  


  const useStyles = makeStyles(theme => ({
    title: {
      textAlign: 'center',
    },
    sub: {
      textAlign: 'center',

    },
    mainForm: {
      alignContent: 'center',
      marginTop: '30px',
      marginBottom: '200px'
    },
    mainGrid: {
      textAlign: 'center'
    },
    txtField: {
      width: '50%',
      '&:focus': {
        outlineColor: '#FF5343!important'
      }
    },
    griditem: {
      marginBottom: '15px'
    },
    btnSignIn: {
      width: '200px',
      fontSize: '12px',
      background: 'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
      height: '40px',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      color: 'white',


      '&:hover': {
        background: 'transparent',
        border: '1px solid  #FF5343',
        color: 'black',

      }
    },
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

  const [alert, setAlert] = useState('');

  const classes = useStyles();

  //if(stage===""){
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {alert}
        </Alert>
      </Snackbar>
      <Container style={{ width: "100%", marginTop: '100px' }}>
        <Typography className={classes.title} variant='h4'>Sign In</Typography>
        <Typography className={classes.title} variant='subtitle1'>{props.userType}</Typography>
        <form className={classes.mainForm}>
          <Container maxWidth="sm">
            <Grid container className={classes.mainGrid}>
              <Grid item xs={12} className={classes.griditem}>
                <TextField onChange={(e) => handleChange(e)} name="EmailId" className={classes.txtField} id="outlined-basic" label="Username/Email Address" variant="outlined" />
              </Grid>
              <Grid item xs={12} className={classes.griditem}>
                <TextField onChange={(e) => handleChange(e)} name="password" className={classes.txtField} id="outlined-basic" type='password' label="Password" variant="outlined" />
              </Grid>
              <Grid item xs={12} className={classes.griditem}>
                <Button type='button'disabled={!checkForValidation()} onClick={handleClick}  className={classes.btnSignIn}>Sign In</Button>
              </Grid>
            </Grid>
            <a style={{ marginLeft: '300px' }} href='/forgotPassword'>Forgot Password?</a>
          </Container>
        </form>
        <Backdrop className={classes.backdrop} open={loading} >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    </div>
  );
  // }else if (stage==="services") {
  //   return(
  //     <div>
  //      <ServicesToProvide/>
  //      </div>
  //   );
  //
  // }else if(stage==="SPLoggedIn"){
  //   return(
  //     <div>
  //      <UserPage/>
  //      </div>
  //   );
  // }else if(stage==="CLoggedIn"){
  //   return(
  //     <div>
  //      <LoggedInCustomer/>
  //      </div>
  //   );
  // }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userType: selectUserType
})

const mapDispatchToProps = dispatch => ({
  setRegisteredUser: value => dispatch(setRegisteredUser(value)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  setUserType: value => dispatch(setUserType(value)),
  setSubscriptionType: value => dispatch(setSubscriptionType(value))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
  