/*jshint esversion:9*/

import React,{useState} from 'react';
import {Container,Grid,Paper,makeStyles,Typography,TextField,Button,CircularProgress,Snackbar,Slide,Grow} from '@material-ui/core';
import forgotPasswordImg from '../Images/forgotPassword.png';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import {withRouter} from 'react-router-dom';
import { API } from '../API';

const useStyles = makeStyles(theme =>({
  paper:{
    width: '90%',
    height: '100%',
    padding:'20px',

  },
  img:{
    width:'100%'
  },
  text:{
    width:'70%'
  },
  button:{
    background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
    color:'white',
    width:'auto',

  },
  progress:{
    position:'absolute',
    left:'20%',
    top:'50%'
  }

}));


function ForgotPassword({history}){
  const[loading,setLoading] = useState(false);
  const [success,setSuccess] = useState(false);
  const [email,setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [checked, setChecked] = useState(true);

  const handleClick = async(event) => {
    if(event.target.innerHTML==='Submit'){
      setLoading(true);
      const data = {
        EmailId:email
      };
      const result = await axios.post(`${API.URL}forgotPassword`,data);
      if(result){
        if(result.data){
          console.log(result.data);
          if(result.data.responseCode !== 200){
            setOpen(true);
            setLoading(false);
            return;
          }
          setLoading(false);
          console.log(result.data);
          setSuccess(true);
        }

      }
    }else{
      history.push('/Login')
    }
  };

  const handleChange = (event) => {
    const {value} = event.target;
    setEmail(value);
  };

  function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return(
    <Container>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Error! This email is unregistered / The account is inactive.
        </Alert>
      </Snackbar>
      <Grid container>
        <Grid item xs='6' style={{padding:'200px 20px'}}>
      <Slide direction="right" in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <div>
          <CircularProgress style={{color:'#FF5343',display:loading?'':'none'}} className={classes.progress}/>
          <Paper elevation={0} className={classes.paper} style={{display:loading?'none':''}}>
          <div style={{display:success?'none':''}}>
          <Typography variant='h4' style={{color:'#FF5343'}}>Forgot Password?</Typography>
            <Typography variant='h6'>No worries ! <span style={{color:'#FF5343'}}>Just enter your registered email Id.</span></Typography>
            <br/>
            <TextField onChange={handleChange} value={email} id="standard-basic" label="Email Address" className={classes.text}/>
            <br/>
            <br/>
            </div>
            <div style={{display:success?'':'none'}}>
              <Typography variant='h4' style={{color:'#FF5343'}}>Check your e-mail !</Typography>
              <Typography variant='h6'>Your password has been sent to your email. Check and come back to login.</Typography>
              <br/>
            </div>
                        <Button variant='contained' onClick={handleClick} className={classes.button}>{success?'Back to login':'Submit'}</Button>
          </Paper>
          </div>
          </Slide>
        </Grid>
        <Grid item xs='6' style={{padding:'50px'}}>
        <Grow in={checked} {...(checked ? { timeout: 1000 } : {})}>
          <img src={forgotPasswordImg} alt='img' className={classes.img}/>
        </Grow>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(ForgotPassword);
