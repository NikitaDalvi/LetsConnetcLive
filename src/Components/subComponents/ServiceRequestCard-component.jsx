/*jshint esversion:9*/
import React,{useState,useEffect} from 'react';
import {Grid,Button,Typography,makeStyles} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import RateReviewIcon from '@material-ui/icons/RateReview';
import InfoIcon from '@material-ui/icons/Info';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import Rating from '@material-ui/lab/Rating';



const useStyles = makeStyles((theme) => ({
  grid:{
    textAlign:'center',
    margin:theme.spacing(1)
  },
  gridItem:{
    overflowWrap: 'break-word'
  }
  
}));


function ServiceRequestCard({amount,Id,userId,spId,name,service,handleModal,timeslots,date,status,userType,handleStatus,ticket,commissionId,Address,rating})
{

const [Date,setDate] = useState('');
const [request,setRequest] = useState({});
const [rate, setRate] = useState('');


useEffect(()=>{

  if(date){
    console.log(userType);
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
        ticket:ticket,
        Address:Address
      };
      setRequest(object);
    }
  },[Id,ticket,commissionId,amount,status,Address]);

  const classes = useStyles();

 
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    
  };
  
  function getModalStyle() {


    return {
      position: 'absolute',
      width: '400px',
      color: 'black',
      top: `20%`,
      left: `40%`,
      transform: `translate(10%, 30%)`,
      backgroundColor: 'white',
      padding: '20px 40px 30px',
      textAlign: 'center'
    };
  }
  const handleClose = () => {
    setOpen(false);
  };
  console.log(name)
  console.log(Address)


  const [modalStyle] = React.useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
        
        
        <InputLabel htmlFor="component-simple">Name</InputLabel>
        
          <Typography gutterBottom variant='h6'>{name}</Typography>
      
          <InputLabel htmlFor="component-simple">Adress</InputLabel>
          <Typography gutterBottom variant='h6'>{Address}</Typography>
          <InputLabel htmlFor="component-simple">Ratings</InputLabel>
          
          <Rating style={{marginTop:'10px'}} name="read-only" value={rating} readOnly precision={0.5} size="large"/>
        
        </div>
  );

  

  return(
    <div>
      
      <Grid container  className={classes.grid}>
        <Grid item xs='5'>
        <Typography variant='h6'>{name}</Typography>
        </Grid>
        <Grid item xs='5'>
        <InfoIcon
      className={classes.icon}
      onClick={handleOpen}
      style={{ marginRight: "5px" }}
      />
        </Grid>

      
      </Grid>
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
      <Grid container className={classes.grid} style={{display:status===3 && (userType===2||userType===3)?'':'none'}}>
      <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{marginTop: '1.5rem'}} item xs='6' className={classes.gridItem}>

          <Button variant="contained" startIcon={<CheckCircleOutlineIcon/>} onClick={()=>{handleStatus({...request,Status:1});}} style={{backgroundColor:'#ff4da6',color:'white'}}>Accept</Button>
        </Grid>
        <br />
        <Grid container direction="row" justify="space-between" alignItems="flex-end" style={{marginTop: '0.5rem'}} item xs='6' className={classes.gridItem}>

        <Button variant="contained" startIcon={<CancelOutlinedIcon/>} onClick={()=>{handleStatus({...request,Status:2});}} style={{backgroundColor:'#FF1493',color:'white'}}>Reject</Button>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Grid>
      <div style={{display:status===1?'':'none', textAlign:'right'}}>
        <Button variant="contained" startIcon={<DoneAllIcon/>} onClick={()=>{handleStatus({...request,Status:4});}} style={{border:'1px solid #2e7d32',backgroundColor:'transparent',color:'#2e7d32'}}>Done</Button>
      </div>
      <div style={{display:status===4?'':'none', textAlign:'right'}}>
        <Button variant="contained" onClick={()=>{handleModal(service,userId,spId);}} startIcon={<RateReviewIcon/>} style={{backgroundColor:'#FF1493',color:'white'}}>Rate and Review</Button>
      </div>
      
      <div style={{display:status===3&&(userType===4||userType===5)?'':'none', textAlign:'center'}}>
      {<Button  variant='contained' startIcon={<CancelOutlinedIcon/>}color='primary' onClick={()=>{handleStatus({...request,Status:5});}} size="small" className={classes.button}style={{backgroundColor:'#FF1493',color:'white'}}>Cancel Request</Button>}
      </div>
      

    </div>
  );
}

export default ServiceRequestCard;
