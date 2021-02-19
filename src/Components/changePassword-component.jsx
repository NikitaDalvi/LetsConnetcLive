/*jshint esversion:9*/
import React,{useState} from 'react';
import {Container,makeStyles,TextField,Button,CircularProgress,Snackbar} from '@material-ui/core';
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import MuiAlert from '@material-ui/lab/Alert';
import {selectCurrentUser} from '../redux/user/user-selector';
import { API } from '../API';


const useStyles = makeStyles((theme) => ({

  button:{
    height:'55px',
    width:'100px',
    margin:'0 10px 0px 10px'
  },
  submit:{
    background:'linear-gradient(239.6deg, #BB60FC 2.39%, #FF5343 82.96%)',
    color:'white'
  }

}));


function ChangePassword({currentUser}){
  const classes = useStyles();
  const [data,setData] = useState({
    currentPassword:'',
    newPassword:'',
    confirmPassword:''
  });


  const [loadingText,setLoadingText] = useState('');
  const [changing,setChanging] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity,setSeverity] = useState('error');
    const [error,setError]= useState('');

    function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

  const checkPassword = async () => {
    //setChecking(true);
      const requestData = {
        Id:currentUser.Id,
        newPassword:data.currentPassword
      }

      const result = await axios.post(`${API.URL}checkPassword`,requestData);
      if(result){
        if(result.data){
          //setChecking(false);
          console.log(result.data);
          if(result.data.responseCode === 200){
            // setChecked(true);
          }else{
            setSeverity('error');
            setError('Invalid Password ! Try Again.');
            // setChecked(false);
            setOpen(true);
          }
        }
      }
  };

  const changePassword = async () => {
      setChanging(true);
      setLoadingText('checking...')
      const requestData = {
        Id:currentUser.Id,
        newPassword:data.currentPassword
      }

      if(data.newPassword === data.confirmPassword){
        const request={
          Id:currentUser.Id,
          newPassword:data.newPassword
        }

        const checkResult = await axios.post(`${API.URL}checkPassword`,requestData);
        if(checkResult){
          if(checkResult.data){
            if(checkResult.data.responseCode === 200){
              setLoadingText('changing...');
              const result = await axios.post(`${API.URL}changePassword`,request);
              if(result){
                if(result.data){
                  setChanging(false);
                  if(result.data.responseCode === 200){
                    setChanging(false)
                    setSeverity('success');
                    setError('Password changed successfully !');
                    setOpen(true);
                    setData({
                      currentPassword:'',
                      newPassword:'',
                      confirmPassword:''
                    });
                    // setChecked(false);
                  }else{
                    setChanging(false)
                    setSeverity('warning');
                    setError('Unexpected Error! Password change unsuccessfull.');
                    setOpen(true);
                  }
                }
              }
            }
            else{
              setChanging(false);
              setSeverity('error');
              setError('Invalid Current Password ! Try Again.');
              // setChecked(false);
              setOpen(true);
            }
          }
        }

      }else{
        setSeverity('error');
        setError("New password and Confirm new password don't match!");
        setOpen(true);
        setChanging(false);
      }

  }

  const handleChange = (event) => {
    const {value,name} = event.target;
    setData(prevValue => {
      return{
        ...prevValue,
        [name]:value
      };
    });
  };



  return(
    <Container style={{paddingTop:'10px'}}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {error}
        </Alert>
      </Snackbar>
    <div style={{padding:'20px 0'}}>
      <TextField name='currentPassword' type='password' value={data.currentPassword} onChange={handleChange} variant='outlined' label='Current Password'/>
      </div>
      <div >
        <TextField name='newPassword' type='password' value={data.newPassword} onChange={handleChange} variant='outlined' label='New Password'/>
        <br/>
        <br/>
        <TextField name='confirmPassword' type='password' value={data.confirmPassword} onChange={handleChange} variant='outlined' label='Confirm New Password'/>
        <br/>
        <br/>
        <Button  onClick={changePassword} style={{display:changing?'none':''}}  variant='contained' className={classes.submit}> Submit</Button>
        <div style={{display:changing?'':'none'}}><CircularProgress style={{color:'#FF5343'}}/><p style={{width:'10%', position:'relative',bottom:'35px',left:'50px'}}>{loadingText}...</p></div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
});

export default connect(mapStateToProps)(ChangePassword);
