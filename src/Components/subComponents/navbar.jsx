/*jshint esversion: 6*/
import React from "react";
import Navitem from "./nav-items";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import Logo from "../../Images/Logo.png";
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser,selectIsHome} from '../../redux/user/user-selector';
import {withRouter} from 'react-router-dom';
 import {setCurrentUser,setIsHome } from '../../redux/user/user-actions';
 import {clearDropdown} from '../../redux/service/service-actions';
import {Menu,MenuItem,Box,makeStyles,AppBar,Toolbar,Typography,Button} from '@material-ui/core';




const Navbar=({currentUser,history,setCurrentUser,ClearDropdown,isHome,setIsHome})=>{

  const [anchorRegister, setAnchorRegister] = React.useState(null);
  const [anchorLogin, setAnchorLogin] = React.useState(null);


  const handleClick = (event) => {
  
    if(event.target.parentElement.name === 'btn-register'){
          setAnchorRegister(event.currentTarget);
    }else{
      setAnchorLogin(event.currentTarget)
    }

  };

  const handleRegister = (type,event) => {
    setIsHome(false);
    if(currentUser!= null){
      history.push('/');
    }else{
      if(type==='sp'){
          history.push('/ProfessionalForm');
      }else{
        history.push('/ProfessionalForm');
      }
    setAnchorRegister(null);
    setAnchorLogin(null);
}
  };


const handleClose = ()=>{
  setAnchorRegister(null);
  setAnchorLogin(null);
}

  const useStyles = makeStyles((theme) => ({
    root: {
   flexGrow: 1,


 },
    appbar:{

         display:'flex',
            background:'transparent',
            boxShadow:'none',

    },
    toolbar:{
              alignContent:'flex-end',
              marginRight: theme.spacing(15),
              height:'100px'
    },
    commonButton:{
      color:isHome?'white':'black',
      marginRight:'5px',
      fontSize:'13px'
    },
    userButton:{
      color:isHome?'white':'black',
      marginRight:'15px',
      borderRadius:'5px',
      borderStyle:'solid',
      borderWidth:'1px',
      borderColor:isHome?'white':'#FF5343',
      fontSize:'13px',
      width:'100px',
      height:'45px'
    },
    imgLogo:{
      marginRight:'500px'
    }
}));
const classes = useStyles();

  function handleLogin(type,event){
    setIsHome(false);
    if(currentUser!= null){
      setCurrentUser(null);
      ClearDropdown();
      history.push('/');
    }else{
      if(type==='sp'){
          history.push('/Login=ServiceProvider');
      }else{
        history.push('/Login=Customer');
      }
      setAnchorRegister(null);
      setAnchorLogin(null);
    }

  }

  return(
    <div className={classes.root}>

    <AppBar position="static"  className={classes.appbar}>
      <Box display="flex"justifyContent="flex-end" >
  <Toolbar className={classes.toolbar}>
      <img src={Logo} className={classes.imgLogo}/>
    <Button className={classes.commonButton} color="inherit" onClick={()=>{history.push('/');setIsHome(true);}}>Home</Button>
    <Button className={classes.commonButton} color="inherit">About</Button>
    <Button className={classes.commonButton} color="inherit">Services</Button>
    <Button aria-controls="simple-menu" name='btn-register' aria-haspopup="true" className={classes.userButton} color="inherit" onClick={(event) =>{handleClick(event);}}>Register</Button>
    <Button aria-controls="simple-menu" name='btn-login' aria-haspopup="true" className={classes.userButton} color="inherit" onClick={(event) =>{handleClick(event);}}>Login</Button>
    <Menu
        id="register-menu"
        anchorEl={anchorRegister}
        keepMounted
        open={Boolean(anchorRegister)}
        onClose={handleClose}
      >
        <MenuItem onClick={(event)=>{handleRegister('sp',event);}}>Service-Provider</MenuItem>
        <MenuItem onClick={(event)=>{handleRegister('c',event);}}>Customer</MenuItem>
      </Menu>
      <Menu
          id="login-menu"
          anchorEl={anchorLogin}
          keepMounted
          open={Boolean(anchorLogin)}
          onClose={handleClose}
        >
          <MenuItem onClick={(event)=>{handleLogin('sp',event);}}>Service-Provider</MenuItem>
          <MenuItem onClick={(event)=>{handleLogin('c',event);}}>Customer</MenuItem>
        </Menu>
  </Toolbar>
</Box>
</AppBar>

</div>

);
}




const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isHome: selectIsHome
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  ClearDropdown:() => dispatch(clearDropdown()),
  setIsHome: value => dispatch(setIsHome(value))
});


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));




// <nav className="navbar navbar-expand-lg navbar-light bg-light">
// <a className="navbar-brand" href="#">Let Network</a>
// <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//   <span className="navbar-toggler-icon"></span>
// </button>
// <div className="collapse navbar-collapse " id="navbarNav">
// { currentUser !== null?
// (  <ul className="navbar-nav justify-content-end">
//
//  <p className="h4 " style={{textAlign:"right", marginTop:"30px"}}><span className='lead'> Welcome</span>,{currentUser.FullName}</p>
//      <li class="nav-item dropdown">
//          <button class="btn dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//            <img alt="user" src={userIcon} style={{width:"50px", borderRadius:"100%"}}/>
//          </button>
//          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//            <a class="dropdown-item" onClick={()=>history.push("/UserPage/ServiceProvider/UserProfile")}>Profile</a>
//            <div class="dropdown-divider"></div>
//            <a class="dropdown-item" onClick={goToHome}>Logout</a>
//          </div>
//        </li>
//      </ul>)
// :
//
//
//   (<ul className="navbar-nav justify-content-end">
//   <Link to="/" style={{textDecoration: "none"}}>
//   <Navitem  Id="homeBtn" name="Home" href="#"/>
//   </Link>
//   <Link style={{textDecoration: "none"}}>
//   <Navitem  Id="aboutBtn" name="About" href="#"/>
//   </Link>
//   <Link style={{textDecoration: "none"}}>
//   <Navitem  Id="servicesBtn" name="Services" href="#"/>
//   </Link>
//
//   <li class="nav-item dropdown">
//       <a class=" dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//         Login
//       </a>
//       <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//         <a class="dropdown-item" href="/Login=ServiceProvider">Service-Provider</a>
//         <div class="dropdown-divider"></div>
//         <a class="dropdown-item" href="/Login=Customer">Customer</a>
//       </div>
//     </li>
//     <li class="nav-item dropdown">
//         <a class=" dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//           Register
//         </a>
//         <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//           <a class="dropdown-item" href="/ProfessionalForm" >Service-Provider</a>
//           <div class="dropdown-divider"></div>
//           <a class="dropdown-item" href="/CustomerForm">Customer</a>
//         </div>
//
//       </li>
//   </ul>)
// }
// </div>
//
// </nav>
