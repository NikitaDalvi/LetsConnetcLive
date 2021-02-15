/*jshint esversion:9*/
import React,{useState} from 'react';
import {connect} from 'react-redux';
import {setExpertId} from '../../redux/user/user-actions';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,makeStyles,Typography,Button,Grid,IconButton} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import InfoIcon from '@material-ui/icons/Info';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import profile from '../../Images/profile.jpg';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {withRouter} from 'react-router-dom';
import { Player } from 'video-react';

const useStyles = makeStyles(theme =>({
  root:{
    maxWidth:'90%',
    margin:theme.spacing(1),
    marginTop:'80px'
  },
  media: {
   height: 160,
 },
 modal: {
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
 },
 paper: {
   backgroundColor: theme.palette.background.paper,
   boxShadow: theme.shadows[5],
   padding: theme.spacing(2, 4, 3),
 },
}));


function ExpertCard(props){
  const classes = useStyles();
  const [open,setOpen] = useState(false);
  return(
    <Card className={classes.root}>

        <CardMedia
          className={classes.media}
          image={props.DPPath}
          title="Contemplative Reptile"
        />
        <CardContent>
        <div style={{display:'flex'}}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          {props.videopath&&<IconButton onClick={()=>setOpen(true)}>
            <InfoIcon/>
          </IconButton>}
        </div>
          <Typography variant="h6"  component="p">
            {props.serviceType}
          </Typography>
          <Grid container style={{marginBottom:'5px'}}>
          <Grid item xs={2} style={{paddingTop:'12px',textAlign:'center'}}>
                    <Typography variant="body2"  component="p">
                    {props.rating.toFixed(1)}
                    </Typography>
          </Grid>
          <Grid item xs={6}>
                <Rating style={{marginTop:'10px'}} name="read-only" value={props.rating} readOnly precision={0.1} />
          </Grid>

          <Typography variant="body2"  component="p" style={{paddingLeft:'10px'}}>
            {props.address}
          </Typography>
          </Grid>
        </CardContent>
      <CardActionArea >
      <Button variant='outlined' style={{margin:'0 0 10px 10px'}} color='secondary' onClick={()=>{ console.log(props.id);props.setExpertId(props.id.toString());props.history.push('/UserPage/UserDetail');}}>Go to booking</Button>
      </CardActionArea>
      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
        <video fluid={false} width='700' height='600' autoPlay controls>
          <source src={`https://letnetworkdevstaging.obtainbpm.com/${props.videopath}`}/>
        </video>
        <br/>
        <Button variant='outlined' onClick={()=>setOpen(false)}>Close</Button>
        </div>
      </Fade>
    </Modal>
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
  setExpertId: value => dispatch(setExpertId(value))
});

export default withRouter(connect(null,mapDispatchToProps)(ExpertCard));


// <CardActions>
//   <Button startIcon={<ThumbUpIcon/>} size="small" color="secondary">
//     Interested
//   </Button>
// </CardActions>
