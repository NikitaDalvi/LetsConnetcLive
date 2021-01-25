/*jshint esversion:9*/
import React from 'react';
import {Container,Button,Snackbar,makeStyles,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Slide,CircularProgress,Backdrop} from '@material-ui/core'
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user-selector';
import {setCurrentUser} from '../redux/user/user-actions';
import MuiAlert from '@material-ui/lab/Alert';
import {withRouter} from 'react-router-dom';
import { API } from '../API';


const useStyles = makeStyles((theme)=>({
  button:{
    width:'100%',
    height:'50px',
    backgroundColor:'#F1052B',
    color:'white'
  },
  backdrop: {
   zIndex: theme.zIndex.drawer + 1,
   color: '#fff',
 }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Deactivation({currentUser,setCurrentUser,history}){
  const [open, setOpen] = React.useState(false);
  const [alertOpen,setAlertOpen] = React.useState(false);
  const [severity,setSeverity] = React.useState('');
  const [alert,setAlert] = React.useState('');
  const[loading,setLoading] = React.useState(false);
  const [request,setRequest] = React.useState({
    Id:'',
    ticket:null
  });

  React.useEffect(()=>{
    if(currentUser){
      setRequest({
        Id:currentUser.Id,
        ticket:currentUser.Ticket
      });
    }
  },[currentUser]);

const handleAlertClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setAlertOpen(false);
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deactivateUser = async()=>{
    setLoading(true);
    const result = await axios.post(`${API.URL}DeActivateAccount`,request);
    if(result){
      if(result.data.output === true){
        setCurrentUser(null);
        setLoading(false);
        setSeverity('info');
        setAlert('Account Deactivated successfully!');
        setAlertOpen(true);
        history.push('/');
      }else{
        setLoading(false);
        setSeverity('warning');
        setAlert('Unexpected Error ! Could not deactivate account. Please try again later!');
        setAlertOpen(true);
        setOpen(false);
      }
    }
  }

  const classes = useStyles();
  return(
    <div style={{height:'500px'}}>
    <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    <Container style={{width:'100%'}}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleAlertClose}>
       <Alert onClose={handleAlertClose} severity={severity}>
         {alert}
       </Alert>
     </Snackbar>
    <div style={{width:'25%'}}>
      <Button variant='contained' onClick={handleClickOpen} className={classes.button}>Deactivate Account</Button>
    </div>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure about deactivating your account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deactivating your account, will redirect you to the Home page and you will not be able to login again to this account. Your subscription will be cancelled with immediate effect.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' style={{backgroundColor:'#F1052B',color:'white'}}>
            Yes, I'm sure
          </Button>
          <Button onClick={handleClose} variant='contained' style={{backgroundColor:'#04CD21',color:'white'}}>
            No, go back
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: value => dispatch(setCurrentUser(value))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Deactivation));
