/*jshint esversion:9*/
import React from "react";
import homeVector from "../Images/home-pg-vector.png";
import img from "../Images/img.png";
import {connect} from 'react-redux';
 import {setIsHome } from '../redux/user/user-actions';
// import Content from "./subComponents/home-content";
import {Typography,makeStyles,Button} from '@material-ui/core';

function Home({setIsHome}){
  const useStyles = makeStyles(theme =>({
    TypographyBrand:{
      textAlign:'right',
      color:'gray',
      marginRight:'165px',
      marginTop:'100px'
    },
    TypographyStart:{
      textAlign:'right',
    },
    buttonRight:{
      marginLeft:'400px',
      width:'60px',
      height:'60px',
      background:'linear-gradient(239.6deg, #BB60FC 2.39%, #FF5343 82.96%)',
      color:'white',
      borderRadius:'100%',
      fontSize:'30px'
    },
    buttonLeft:{
      marginLeft:'210px',
      width:'60px',
      height:'60px',
      background:'linear-gradient(239.6deg, #BB60FC 2.39%, #FF5343 82.96%)',
      color:'white',
      borderRadius:'100%',
      fontSize:'30px'
    }
  }))

const classes = useStyles();


  return(
     <div className="container" style={{marginTop:'100px'}}>
  <img src={homeVector} style={{position:'absolute',top:'0',right:'10px',zIndex:'-9999'}} />
  <div className='row mb-5' >
    <div className='col-lg-4'>
      <Typography className={classes.TypographyBrand} variant="h6" gutterBottom>
      Let's Connect
      </Typography>
      <Typography className={classes.TypographyStart} variant="h5" gutterBottom>
      Your Business / Profession
      </Typography>
    </div>
    <div className='col-lg-8' style={{textAlign:'right'}}>
      <img src={img}/>
    </div>
  </div>
  <div className='row mb-5'>
  <div className='col-lg-4' >
    <img src={img}/>
  </div>
    <div className='col-lg-6'>
    <br/>
    <br/>
    <br/>
    <br/>
      <Typography className={classes.TypographyStart} variant="h4" gutterBottom>
      I want to work
      </Typography>
      <br/>
      <a href='/ProfessionalForm'><Button className={classes.buttonRight} onClick={()=>{setIsHome(false);}}>&#10095;</Button></a>
    </div>

  </div>
  <div className='row mb-5'>
  <div className='col-lg-4'>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
    <Typography className={classes.TypographyStart} variant="h4" gutterBottom>
    I want to hire
    </Typography>
    <br/>
    <a href='/CustomerForm'><Button className={classes.buttonLeft} onClick={()=>{setIsHome(false);}}>&#10095;</Button></a>
  </div>
  <div className='col-lg-8' style={{textAlign:'right'}}>
    <img src={img}/>
  </div>
  </div>
  </div>);

}

const mapDispatchToProps = dispatch => ({
  setIsHome: value => dispatch(setIsHome(value))
});

export default connect(null,mapDispatchToProps)(Home);
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
