/*jshint esversion:9*/
import React, { useEffect } from "react";
import homeVector from "../Images/home-pg-vector.png";
import img from "../Images/img.png";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectIsHome } from '../redux/user/user-selector';
import { setIsHome, setCurrentUser, setUserType } from '../redux/user/user-actions';
// import Content from "./subComponents/home-content";
import { Typography, makeStyles, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function Home({ setIsHome, setCurrentUser, setUserType, currentUser, history }) {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const useStyles = makeStyles(theme => ({
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
      marginLeft: isMobile ? '42%' : '400px',
      width: '60px',
      height: '60px',
      background: 'linear-gradient(239.6deg, #BB60FC 2.39%, #FF5343 82.96%)',
      color: 'white',
      borderRadius: '100%',
      fontSize: '30px',
      marginBottom: isMobile ? '20px' : ''
    },
    buttonLeft: {
      marginLeft: '210px',
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

  const handleClick = (type) => {
    setUserType(type)
    setIsHome(false)
    history.push('/Registration/Form')
  }

  const classes = useStyles();


  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <img src={homeVector} style={{ position: 'absolute', top: '0', right: '10px', zIndex: '-9999', display: isMobile ? 'none' : '' }} />
      <div className='row mb-5' >
        <div className={isMobile ? 'col-lg-12' : 'col-lg-4'}>
          <Typography className={classes.TypographyBrand} variant="h6" gutterBottom>
            Let's Connect
      </Typography>
          <Typography className={classes.TypographyStart} variant="h5" gutterBottom>
            Your Business / Profession
      </Typography>
        </div>
        <div className={isMobile ? 'col-lg-12' : 'col-lg-8'} style={{ textAlign: 'right' }}>
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
  isHome: selectIsHome
})

const mapDispatchToProps = dispatch => ({
  setUserType: value => dispatch(setUserType(value)),
  setIsHome: value => dispatch(setIsHome(value)),
  setCurrentUser: value => dispatch(setCurrentUser(value))
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
