/*jshint esversion:6*/
import React from "react"
  import {withRouter} from 'react-router-dom';
  import {Paper, makeStyles,Typography,Grid} from '@material-ui/core';



function DashboardCard(props){

  const useStyles = makeStyles((theme) => ({
    paper:{
      width:'250px',
      height:'150px',
      color:'white',
      backgroundColor:props.color
    }
  }));

  const classes = useStyles();
  return(
    <Paper className={classes.paper} style={{padding:'5px'}} elevation={0}>
      <Typography variant='subtitle1'>{props.caption}</Typography>
      <Typography variant='h5'>{props.name}</Typography>
      <Grid container style={{marginTop:'20%'}}>
        <Grid item xs={3}>
        <Typography variant='h5'>{props.rating}</Typography>
        </Grid>
        <Grid item xs={6} style={{marginLeft:'20%',textAlign:'right'}}>
          <Typography variant='h5'>{props.quantity}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withRouter(DashboardCard);

// <div className="container dashboard-card-container" onClick={()=>props.type==="SP"?props.history.push(`/UserPage/ServiceProvider/${props.routeName}`):props.history.push(`/UserPage/Customer/${props.routeName}`)}>
//   <p className="h2">{props.name}</p>
//   <div style={{textAlign:"right",display:props.id !=="Wallet"?"":"none"}}>
//   <span className="badge badge-light" style={{width:"30px",height:"30px", textAlign:"center", paddingTop:"10px", background:"linear-gradient(to right, #4F6DE6 10%,#4B66EA 30%,#82A0F6  100%)", color:"white"}}>4</span>
//   </div>
// </div>
