/*jshint esversion: 9*/
import React,{useEffect,useState} from 'react';
import {Container,Paper,makeStyles,Typography,Grid} from '@material-ui/core';
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser,selectUserType} from '../redux/user/user-selector';


const useStyles = makeStyles((theme)=>({
  paper:{
    padding:theme.spacing(2),
    maxWidth:350
  },
  typography:{
    marginBottom:'8px'
  }
}));

function MySubscription({currentUser,userType}){
  const [subscriptionDetails,setSubscriptionDetails] = useState({});

  useEffect(()=>{
    if(currentUser){
      const request = {
        Ticket: currentUser.Ticket,
        UserId: currentUser.Id
      };
      getSubscriptionDetails(request)
      .then(res => {if(res){setSubscriptionDetails(res);}else{alert('Fetching subscription failed!');}});
    }
  },[currentUser]);

  const getSubscriptionDetails = async(data)=>{
                        const result = await axios.post('https://localhost:44327/api/GetSubscriptionByUserId',data);
    return result.data.output;
  };
  const classes = useStyles();
  return(
    <Container>
      <Paper className={classes.paper}>
        <Typography variant='h5' style={{marginBottom:'20px'}}>{subscriptionDetails.SubscriptionName}</Typography>
        <Grid container>
          <Grid item xs='5' style={{paddingTop:'8px'}}>
            <Typography className={classes.typography} variant='body1'>Amount Paid:</Typography>
            <Typography className={classes.typography} variant='body1'>Start Date:</Typography>
            <Typography className={classes.typography} variant='body1'>End Date:</Typography>
          </Grid>
          <Grid item xs='5' style={{paddingTop:'12px'}}>
          <Typography className={classes.typography} variant='body2'>&#8377;{subscriptionDetails.Amount}</Typography>
          <Typography className={classes.typography} variant='body2'>{subscriptionDetails.StartDate}</Typography>
          <Typography className={classes.typography} variant='body2'>{subscriptionDetails.EndDate}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector(
  {
    currentUser: selectCurrentUser,
    userType: selectUserType
  }
)

export default connect(mapStateToProps)(MySubscription);
