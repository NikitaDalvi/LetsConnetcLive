import React from "react";
import {Typography,makeStyles,Container} from '@material-ui/core';

function SubscriptionCard(props){


  const useStyles = makeStyles(theme =>({
subContainer:{
  width:'70%'
}
  }));

  React.useEffect(()=>{
    console.log(props.description);
  },[])

  const classes = useStyles();

  return(
    <div>
    <Container maxWidth="sm" className={classes.subContainer} >
    <img src={props.img}/>
    <br/>
    <br/>
    <Typography variant='h5' style={{fontWeight:'bold'}}>{props.type}</Typography>
    <Typography variant="subtitle1" gutterBottom style={{fontWeight:'bold'}}>Rs {props.price}<span  style={{fontSize:"12px",fontWeight:'100!important'}}>/year</span></Typography>
    <br/>
    {props.description.map(des => (<div><Typography variant='subtitle2'>{des.Feature}</Typography>
    <br/></div>))}
</Container>
    </div>
  );
}

export default SubscriptionCard;
