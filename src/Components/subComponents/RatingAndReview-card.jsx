/*jshint esversion:6*/

import React from "react";
import {Grid, Paper, makeStyles,Avatar,Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import profile from '../../Images/profile.jpg';

const useStyles = makeStyles((theme) => ({

  large: {
   width: theme.spacing(6),
   height: theme.spacing(6),
   marginLeft:'5px'
 },
 paper:{
   width:'300px',
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
  console.log(props.path)

  const classes = useStyles();
  return(
  <Paper className={classes.paper}>
    
    <Grid container spacing={1} direction="row" >
      <Grid container  direction="row" justify="space-between" alignItems="flex-end" style={{marginRight: '1.5rem'}} >

      <Grid item xs={3} className={classes.profile}>
      <Avatar alt="Remy Sharp" src={!process.env.NODE_ENV||process.env.NODE_ENV==='development'?`https://localhost:44327${props.path}`:`${process.env.REACT_APP_PROD_BASE_URL}${props.path}`} className={classes.large} />
        
      </Grid>
      <Grid item xs={8}>
        <Typography variant='h6'>{props.name}</Typography>
        <Grid container spacing={3}>
        <Grid item xs={3}>
            <Rating name="read-only" value={props.rating} readOnly precision={0.1} />
        </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.description} item xs={12}>
      <em style={{fontWeight:'500'}}>  {props.review}</em>
      </Grid>
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
