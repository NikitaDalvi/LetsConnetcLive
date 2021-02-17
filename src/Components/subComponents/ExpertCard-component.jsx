/*jshint esversion:9*/
import React,{useState} from 'react';
import {connect} from 'react-redux';
import {setExpertId} from '../../redux/user/user-actions';
import PropTypes from 'prop-types';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,makeStyles,Typography,Button,Grid,IconButton,Tab,Tabs,Paper,Box,AppBar} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import InfoIcon from '@material-ui/icons/Info';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import profile from '../../Images/profile.jpg';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Document, Page } from 'react-pdf';
import {withRouter} from 'react-router-dom';

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
   minHeight:'500px'
 },
 paper: {
   backgroundColor: theme.palette.background.paper,
   boxShadow: theme.shadows[5],
   padding: theme.spacing(2, 4, 3),
   minHeight:'679px',
   minWidth:'712px'
 },
 tabRoot:{
   flexGrow: 1,
   width: '100%',
   backgroundColor: theme.palette.background.paper,
 }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}


function ExpertCard(props){
  const classes = useStyles();
  const [open,setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [numPages, setNumPages] = useState(null);
 const [pageNumber, setPageNumber] = useState(0);

 function onDocumentLoadSuccess({ numPages }) {
   setNumPages(numPages);
 }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
          <div className={classes.tabRoot}>
             <AppBar position="static" color="default">
               <Tabs
                 value={value}
                 onChange={handleChange}
                 indicatorColor="secondary"
                 textColor="secondary"
                 centered
               >
                 <Tab label="Video" {...a11yProps(0)} />
                 <Tab label="Resume" {...a11yProps(1)} />
               </Tabs>
             </AppBar>
             <TabPanel value={value} index={0}>
               <video fluid={false} width='600' height='500' autoPlay controls>
                 <source src={`https://letnetworkdevstaging.obtainbpm.com${props.videopath}`}/>
               </video>
             </TabPanel>
             <TabPanel value={value} index={1} disabled={props.resumename?false:true}>
               <div>
                <p>The url is https://letnetworkdevstaging.obtainbpm.com/Attachment/1b119e52-7b26-4ece-b2bb-5de3b2f12dfe/Resume/KRAAuthorization.pdf</p>
                 <Document
                   file="https://letnetworkdevstaging.obtainbpm.com/Attachment/1b119e52-7b26-4ece-b2bb-5de3b2f12dfe/Resume/KRAAuthorization.pdf"
                   onLoadSuccess={onDocumentLoadSuccess}
                 >
                   <Page pageNumber={pageNumber} />
                 </Document>
                 <p>Page {pageNumber} of {numPages}</p>
               </div>
             </TabPanel>
          </div>
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
