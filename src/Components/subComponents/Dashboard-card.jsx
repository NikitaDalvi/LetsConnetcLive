/*jshint esversion:6*/
import React from "react"
  import {withRouter} from 'react-router-dom';
  import {Paper, makeStyles,Typography,Grid} from '@material-ui/core';



function DashboardCard({history,...props}){

  const useStyles = makeStyles((theme) => ({
    paper:{
      //width:'250px',
      height:'150px',
      color:'white',
      backgroundColor:props.color,
      padding: '0.5rem'
    }
  }));

  function changepage(){
    alert(props.name)
    console.log(props)
    //debugger;

    if(props.name=== 'NEW' || props.name==='TODAY' || props.name==='UPCOMING' || props.name==='COMPLETED' || props.name==='NEARBY EXPERTS' || props.name==='CONFIRMED' || props.name==='PENDING' || props.name==='PAST'){
      history.push('ServiceRequest');
    }
    else if(props.name==='COMMISION DUE'){

    }
    else{
      
    }

  }
  const classes = useStyles();
  console.log(props.name,props.quantity)
  return(
    <Paper className={classes.paper} elevation={0} 
    onClick={() => changepage() }>
      <Typography variant='subtitle1'>{props.caption}</Typography>
      <Typography variant='h5'>{props.name}</Typography>
      
      {/*<Grid container style={{marginTop:'20%'}}>
        <Grid item xs={3}>
        <Typography variant='h5'>{props.rating}</Typography>
        </Grid>
        <Grid item xs={6} style={{marginLeft:'20%',textAlign:'right'}}>
          <Typography variant='h5'>{props.quantity}</Typography>
        </Grid>
      </Grid>*/}
      <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{marginTop: '1.5rem'}}>
        <Typography variant="h5">{props.rating}</Typography>
        <Typography variant="h5">{props.quantity}</Typography>
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
