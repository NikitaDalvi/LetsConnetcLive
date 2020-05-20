/*jshint esversion:6*/

import React from "react";
import {Grid, Paper, makeStyles,Avatar,Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import profile from '../../Images/profile.jpg';

const useStyles = makeStyles((theme) => ({

  large: {
   width: theme.spacing(7),
   height: theme.spacing(7),
   marginLeft:'5px'
 },
 paper:{
   width:'350px',
   padding:'5px'
 },
 description:{
   margin:'20px 5px'
 },
 profile:{
   paddingLeft:'20px'
 }

}));


function RatingCard(props){

  const classes = useStyles();
  return(
  <Paper className={classes.paper}>
    <Grid container spacing={2}>
      <Grid item xs={3} className={classes.profile}>
        <Avatar alt="Remy Sharp" src={profile} className={classes.large} />
      </Grid>
      <Grid item xs={8}>
        <Typography variant='h6'>{props.name}</Typography>
        <Grid container spacing={3}>
        <Grid item xs={1}>
          {props.rating}
        </Grid>
        <Grid item xs={3}>
            <Rating name="read-only" value={props.rating} readOnly precision={0.5} />
        </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.description} item xs={12}>
      <em style={{fontWeight:'500'}}>  {props.review}</em>
      </Grid>
    </Grid>
  </Paper>
  );
}

export default RatingCard;


// <div className="card" style={{width:"18rem"}}>
// <div className="card-body">
// <h5 className="card-title" style={{color:"#82A0F6"}}>{props.name}</h5>
// <h6 className="card-subtitle mb-2 ">Rating</h6>
// <p className="lead" style={{textAlign:"center", fontSize:"40px"}}>{props.rating}<span style={{fontSize:"20px"}}>/5</span></p>
// <hr/>
// <h6 className="card-subtitle mb-2">Review</h6>
// <p><em>"{props.review}"</em></p>
// </div>
// </div>
