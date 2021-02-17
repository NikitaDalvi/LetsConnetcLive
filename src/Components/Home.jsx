/*jshint esversion:9*/
import React, { useEffect } from "react";
import homeVector from "../Images/Vector 2 (1).png";
import img from "../Images/img.png";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectIsHome,selectRegisteredUser } from '../redux/user/user-selector';
import { setIsHome, setCurrentUser,setRegisteredUser, setUserType } from '../redux/user/user-actions';
// import Content from "./subComponents/home-content";
import { Typography, makeStyles, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withRouter } from 'react-router-dom';
import { Box } from "@material-ui/core";
import { useMediaQuery } from 'react-responsive';
import { red, green } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";

function Home({ setIsHome, setCurrentUser, setUserType, currentUser, history,setRegisteredUser,registeredUser }) {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  //'linear-gradient(239.6deg, rgba(187,96,252,0.6) 2.39%, rgba(255,83,67,0.6) 82.96%)'

  const useStyles = makeStyles(theme => ({
    card:{
      marginRight:'10px',
      minWidth:'250px',
      minHeight:'200px',
      marginBottom:'10px',
      color:'white'
    },
    TypographyBrand: {
      textAlign: isMobile ? 'left' : 'right',
      color: 'gray',
      marginRight: '165px',
      marginTop: '100px'
    },
    TypographyStart: {
      textAlign: isMobile ? 'left' : 'right',
    },
    buttonRight: {
      marginLeft: isMobile ? '42%' : '80%',
      width: '60px',
      height: '60px',
      background: 'linear-gradient(239.6deg, #BB60FC 2.39%, #FF5343 82.96%)',
      color: 'white',
      borderRadius: '100%',
      fontSize: '30px',
      marginBottom: isMobile ? '20px' : ''
    },
    buttonLeft: {
      marginLeft: isMobile?'210px':'350px',
      width: '60px',
      height: '60px',
      background: 'linear-gradient(239.6deg, #BB60FC 2.39%, #FF5343 82.96%)',
      color: 'white',
      borderRadius: '100%',
      fontSize: '30px'
    }
  }))


  useEffect(() => {
    if (currentUser) {
      history.push('/UserPage/ServiceProvider/Dashboard');
    } else {
      setIsHome(true);
    }
  }, [currentUser, setIsHome, history])

  useEffect(()=>{
    if(registeredUser){
      setRegisteredUser(null)
    }
  },[registeredUser,setRegisteredUser]);

  const handleClick = (type) => {

    history.push('/Registration/Form')
  }

  const videoClick = () => {

    history.push('/MusicCard')
  }

  const classes = useStyles();


  return (
    <div>
      <img src={homeVector} style={{position:'absolute',top: '0', left: '500px', zIndex: '-9999', display: isMobile ? 'none' : '' }} />
      <div className='row mb-5' >
        <div className={isMobile ? 'col-lg-12' : 'col-lg-6'} style={{paddingTop:"120px",paddingLeft:'150px'}}>
          <div style={{display:'flex',width:'100%',flexWrap:'wrap',paddingLeft:'50px'}}>
            <Card className={classes.card} style={{background:'rgba(187,96,252,0.6)'}}>
              <CardContent>
                <Typography component="h2">
                  1.Time to unlock Your potential
                </Typography>
                <Typography component="h2">
                  2.Time to Embrace the Change
                </Typography>
                <Typography component="h2">
                  3.Time to Work for Yourself
                  <br />
                  4.Lets people Search u<br/>
                  5. Time Schedular<br/>
                  6. Its Time for LetsConnect 

                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card} style={{background:'rgba(248,29,92,0.6)'}}>
              <CardContent>
                <Typography  component="h2">
                 1. Work from anywhere
                </Typography>
                <Typography component="h2">
                 2. Earn during idle times
                </Typography>
                <Typography component="h2">
                  3. Personalized Work Dashboard
                  <br />
                  4. Get you Dashboard Today !<br/>
                  5. Register Online & <br/>
                      Dawonload u r App !
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card} style={{background:'rgba(248,29,92,0.6)'}}>
              <CardContent>
                
              <Typography component="h2">
                  1.Work from online/onsite
                </Typography>
                <Typography component="h2">
                  2.Accept or Reject Request
                </Typography>
                <Typography component="h2">
                  3.Time to change working <br/>model
                  <br />
                  4.Profile Display with<br />
                  5.Marketing poster & Video<br/>
                  6.Effortless Search nearby
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card} style={{background:'rgba(187,96,252,0.6)'}}>
              <CardContent>
              <Typography component="h2">
                  1.Setup U R Profile
                </Typography>
                <Typography component="h2">
                  2.Let People Search 
                </Typography>
                <Typography component="h2">
                  3.Hourly / daily or<br/>
                 Assignment based
                <br />
                  4.Rating And Reviews<br/>
                  5.Capture up 2 locations
                </Typography>
              </CardContent>
            </Card>
       </div>


      <Button className={classes.buttonLeft} style={{marginBottom:isMobile?'50px':"",marginTop:isMobile?'50px':""}} onClick={() => { videoClick() }}>&#10095;</Button>
        </div>
        <div className={isMobile ? 'col-lg-12' : 'col-lg-4'} style={{ textAlign: 'right' }}>
          <img src={img} />
        </div>
      </div>
      <div className='row mb-5'>
        <div className='col-lg-6' style={{ display: isMobile ? '' : 'none' }}>
          <br />
          <br />
          <br />
          <br />
          <Typography style={{ textAlign: 'center' }} variant="h4" gutterBottom>
            I want to work
    </Typography>
          <br />
          <a href='/ProfessionalForm'><Button className={classes.buttonRight} onClick={() => { setIsHome(false); }}>&#10095;</Button></a>
        </div>
        <div className='col-lg-4' >
          <img src={img} />
        </div>
        <div className='col-lg-6' style={{ display: isMobile ? 'none' : '' }}>
          <br />
          <br />
          <br />
          <br />
          <Typography className={classes.TypographyStart} variant="h4" gutterBottom>
            I want to work
      </Typography>
          <br />
          <Button className={classes.buttonRight} onClick={() => { handleClick('Service-Provider') }}>&#10095;</Button>
        </div>

      </div>
      <div className='row mb-5'>
        <div className='col-lg-4'>
          <br />
          <br />
          <br />
          <br />
          <br />
          <Typography style={{ textAlign: isMobile ? 'center' : 'right' }} variant="h4" gutterBottom>
            I want to hire
    </Typography>
          <br />
          <Button className={classes.buttonLeft} onClick={() => { handleClick('Customer') }}>&#10095;</Button>
        </div>
        <div className='col-lg-8' style={{ textAlign: 'right', display: isMobile ? 'none' : '' }}>
          <img src={img} />
        </div>
      </div>
    </div>);

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isHome: selectIsHome,
  registeredUser:selectRegisteredUser
})

const mapDispatchToProps = dispatch => ({
  setUserType: value => dispatch(setUserType(value)),
  setIsHome: value => dispatch(setIsHome(value)),
  setCurrentUser: value => dispatch(setCurrentUser(value)),
  setRegisteredUser: value => dispatch(setRegisteredUser(value))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
//<img src="D:\MyWorkSpace\let-network\Images\banner.jpg"/>;
//<div className="container row home-content">

//       <p className="content-paragraph col-lg-4">Lorem ipsum dolor sit amet, sea ut summo tincidunt mediocritatem. Adhuc malorum sea ad, no his suas detracto prodesset. Eos essent eripuit ea, an mei sale errem. Nam id choro.</p>
//       <p className="content-paragraph col-lg-4">Lorem ipsum dolor sit amet, sea ut summo tincidunt mediocritatem. Adhuc malorum sea ad, no his suas detracto prodesset. Eos essent eripuit ea, an mei sale errem. Nam id choro.</p>
//       <p className="content-paragraph col-lg-4">Lorem ipsum dolor sit amet, sea ut summo tincidunt mediocritatem. Adhuc malorum sea ad, no his suas detracto prodesset. Eos essent eripuit ea, an mei sale errem. Nam id choro.</p>
// </div>


// <div style={{backgroundImage: `url("${banner}")`}} className="jumbotron">
// <div>
// <h1 className="display-4 banner-title">Let Network</h1>
// </div>
// </div>
// <br/>
// <br/>
// <Content />
