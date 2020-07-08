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
  }
}));

function ServiceRequestCard({data,handleModal}){



  const classes = useStyles();

  return(
    <div>
      <Typography variant='h6'>{data.name}</Typography>
      <Grid container className={classes.grid}>
        <Grid item xs='2' className={classes.gridItem}>
          <Typography variant='h6'>{data.dos}</Typography>
        </Grid>
        <Grid item xs='8' className={classes.gridItem}>
        {data.services.map((item,index)=>(
          <div key={index}>
          <span>{item.service}</span>
          <br/>
          {item.timeSlots.map((timeSlot,index)=>(
            <div key={index}>
              <span>&#10093; {timeSlot.startTime}-{timeSlot.endTime}</span>
              <br/>
            </div>
          ))}

          </div>
        ))}
        </Grid>
      </Grid>
      <Grid container className={classes.grid} style={{display:data.type==='pending'?'':'none'}}>
        <Grid item xs='5' className={classes.gridItem}>
          <Button variant="contained" startIcon={<CheckCircleOutlineIcon/>} style={{backgroundColor:'#2e7d32',color:'white'}}>Accept</Button>
        </Grid>
        <Grid item xs='6' className={classes.gridItem}>
        <Button variant="contained" startIcon={<CancelOutlinedIcon/>} style={{backgroundColor:'#b71c1c',color:'white'}}>Reject</Button>
        </Grid>
      </Grid>
      <div style={{display:data.type==='approved'&&data.dos==='30 May'?'':'none', textAlign:'right'}}>
        <Button variant="contained" startIcon={<DoneAllIcon/>} style={{border:'1px solid #2e7d32',backgroundColor:'transparent',color:'#2e7d32'}}>Done</Button>
      </div>
      <div style={{display:data.type==='completed'?'':'none', textAlign:'right'}}>
        <Button variant="contained" onClick={()=>{handleModal(data.name);}} startIcon={<RateReviewIcon/>} style={{backgroundColor:'#ffd600',color:'white'}}>Rate and Review</Button>
      </div>
    </div>
  );
}

export default ServiceRequestCard;
