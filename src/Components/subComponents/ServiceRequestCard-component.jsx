/*jshint esversion:9*/
import React,{useState,useEffect} from 'react';
import {Grid,Button,Typography,makeStyles} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import RateReviewIcon from '@material-ui/icons/RateReview';



const useStyles = makeStyles((theme) => ({
  grid:{
    textAlign:'center',
    margin:theme.spacing(1)
  },
  gridItem:{
    overflowWrap: 'break-word'
  }
}));

function ServiceRequestCard({amount,Id,userId,name,service,handleModal,timeslots,date,status,userType,handleStatus,ticket,commissionId}){

const [Date,setDate] = useState('');
const [request,setRequest] = useState({});

useEffect(()=>{
  if(date){
    const Date = date.split('-');
    var mon  =  Date[1];
    mon = parseInt(mon);
    const months   = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    setDate(`${Date[2]} ${months[mon]}  ${Date[0]}`);
  }
},[date]);

  useEffect(()=>{
    if(Id){
      const object = {
        RequestId:Id,
        CommissionId:commissionId,
        Amount:amount,
        ServiceCharges:100.5,
        ticket:ticket
      };
      setRequest(object);
    }
  },[Id,ticket,commissionId,amount,status]);


  const classes = useStyles();

  return(
    <div>
      <Typography variant='h6'>{name}</Typography>
      <Grid container className={classes.grid}>
        <Grid item xs='2' className={classes.gridItem}>
          <Typography variant='h6'>{Date}</Typography>
        </Grid>
        <Grid item xs='8' className={classes.gridItem}>
        <span>{service}</span>
        {timeslots.map((item,index)=>(
          <div key={index}>
              <span>&#10093; {item.StartTime}-{item.EndTime}</span>
              <br/>
          </div>
        ))}
        </Grid>
      </Grid>
      <Grid container className={classes.grid} style={{display:status===3 && userType==='Service-Provider'?'':'none'}}>
      <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{marginTop: '1.5rem'}} item xs='6' className={classes.gridItem}>

          <Button variant="contained" startIcon={<CheckCircleOutlineIcon/>} onClick={()=>{handleStatus({...request,Status:1});}} style={{backgroundColor:'#2e7d32',color:'white'}}>Accept</Button>
        </Grid>
        <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{marginTop: '1.5rem'}} item xs='6' className={classes.gridItem}>

        <Button variant="contained" startIcon={<CancelOutlinedIcon/>} onClick={()=>{handleStatus({...request,Status:2});}} style={{backgroundColor:'#b71c1c',color:'white'}}>Reject</Button>
        </Grid>
      </Grid>
      <div style={{display:status===1?'':'none', textAlign:'right'}}>
        <Button variant="contained" startIcon={<DoneAllIcon/>} onClick={()=>{handleStatus({...request,Status:4});}} style={{border:'1px solid #2e7d32',backgroundColor:'transparent',color:'#2e7d32'}}>Done</Button>
      </div>
      <div style={{display:status===4?'':'none', textAlign:'right'}}>
        <Button variant="contained" onClick={()=>{handleModal(service,userId);}} startIcon={<RateReviewIcon/>} style={{backgroundColor:'#ffd600',color:'white'}}>Rate and Review</Button>
      </div>
    </div>
  );
}

export default ServiceRequestCard;
