/*jshint esversion:9*/
import React from 'react';
import {connect} from 'react-redux';
import {setExpertId} from '../../redux/user/user-actions';
import {Card,CardActionArea,CardActions,CardContent,CardMedia,makeStyles,Typography,Button,Grid,IconButton,Link} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import profile from '../../Images/profile.jpg';
import {withRouter} from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
const useStyles = makeStyles(theme =>({
  root:{
    maxWidth:'90%',
    margin:theme.spacing(1),
    marginTop:'80px'
  },
  media: {
   height: 160,
 }
}));


function ExpertCard(props){
  const classes = useStyles();
  return(
    <Card className={classes.root} onClick={()=>{ console.log(props.id);props.setExpertId(props.id.toString());props.history.push('/UserPage/UserDetail');}}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image={props.DPPath}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
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
          
          <Grid item xs={6}>
         
          
              <Link href={`${process.env.NODE_ENV === 'production' ? 'https://letnetworkdevstaging.obtainbpm.com' : `https://localhost:44327`}${props.videopath}`} rel="noopener" target="_blank">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Link>
          </Grid>

          <Grid item xs={6}>
              
          <Typography variant="h6"  component="p">
            {props.ServiceGiven}
          </Typography>

          </Grid>


        </CardContent>
      </CardActionArea>
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
