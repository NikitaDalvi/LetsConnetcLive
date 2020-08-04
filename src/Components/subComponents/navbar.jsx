/*jshint esversion: 6*/
import React from "react";
import Navitem from "./nav-items";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Logo from "../../Images/Logo.png";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectIsHome } from '../../redux/user/user-selector';
import { withRouter } from 'react-router-dom';
import { setCurrentUser, setIsHome, setUserType } from '../../redux/user/user-actions';
import { clearDropdown, addServiceTypes } from '../../redux/service/service-actions';
import { Menu, MenuItem, Box, makeStyles, AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, Divider, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';




const Navbar = ({ currentUser, history, setCurrentUser, ClearDropdown, isHome, setIsHome, setUserType, addServiceTypes }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const [anchorRegister, setAnchorRegister] = React.useState(null);
  const [anchorLogin, setAnchorLogin] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [expand2, setExpand2] = React.useState(false);
  const handleClick = (event) => {

    if (event.target.parentElement.name === 'btn-register') {
      setAnchorRegister(event.currentTarget);
    } else {
      setAnchorLogin(event.currentTarget)
    }

  };

  const handleRegister = async (type, event) => {
    setIsHome(false);
    if (currentUser != null) {
      history.push('/');
    } else {
      if (type === 'sp') {
        // const serviceTypes = await axios.get('https://localhost:44327/api/getServiceTypes');
        // console.log(serviceTypes.data.output);
        // serviceTypes.data.output.map(type => addServiceTypes(type));
        setUserType('Service-Provider')
      } else {
        setUserType('Customer')
      }
      history.push('/Registration/Form');
      setAnchorRegister(null);
      setAnchorLogin(null);
    }
  };


  const handleClose = () => {
    setAnchorRegister(null);
    setAnchorLogin(null);
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,


    },
    appbar: {
      display: currentUser === null ? 'flex' : 'none',
      background: isMobile ? 'white' : 'transparent',
      boxShadow: 'none',

    },
    toolbar: {
      alignContent: 'flex-end',
      marginRight: theme.spacing(15),
      height: '100px'
    },
    commonButton: {
      color: isHome ? 'white' : 'black',
      marginRight: '5px',
      fontSize: '13px'
    },
    userButton: {
      color: isHome ? 'white' : 'black',
      marginRight: '15px',
      borderRadius: '5px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: isHome ? 'white' : '#FF5343',
      fontSize: '13px',
      width: '100px',
      height: '45px'
    },
    imgLogo: {
      marginRight: isMobile ? '50px' : '500px'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  function handleLogin(type, event) {
    setIsHome(false);
    if (currentUser != null) {
      setCurrentUser(null);
      ClearDropdown();
      history.push('/');
    } else {
      if (type === 'sp') {
        setUserType('Service-Provider')
      } else {
        setUserType('Customer')
      }
      history.push('/Login');
      setAnchorRegister(null);
      setAnchorLogin(null);
    }

  }

  return (
    <div className={classes.root}>

      <AppBar position="static" className={classes.appbar}>
        <Box display="flex" justifyContent="flex-end" >
          <Toolbar className={classes.toolbar}>
            <img src={Logo} className={classes.imgLogo} />
            {isMobile ?
              <React.Fragment>
                <IconButton disabled={currentUser && currentUser.Status !== 6} onClick={() => { setOpen(true); }}><MenuIcon /></IconButton>
                <Drawer anchor='top' open={open} onClose={() => { setOpen(false); }}>
                  <List>
                    <ListItem button onClick={() => { history.push('/'); setIsHome(true); }}>
                      <ListItemText primary='Home' />
                    </ListItem>
                    <ListItem button onClick={() => { history.push('/About'); setIsHome(false); }}>
                      <ListItemText primary='About us' />
                    </ListItem>
                    <ListItem button onClick={() => { setExpand(!expand); }}>
                      <ListItemText primary='Register' />
                      {expand ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={expand} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={(event) => { handleRegister('sp', event); }}>
                          <ListItemText primary="To work" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={(event) => { handleRegister('c', event); }}>
                          <ListItemText primary="To hire" />
                        </ListItem>
                      </List>
                    </Collapse>
                    <ListItem button onClick={() => { setExpand2(!expand2) }}>
                      <ListItemText primary='Login' />
                      {expand2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={expand2} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={(event) => { handleLogin('sp', event); }}>
                          <ListItemText primary="To work" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={(event) => { handleLogin('c', event); }}>
                          <ListItemText primary="To hire" />
                        </ListItem>
                      </List>
                    </Collapse>
                  </List>
                </Drawer>
              </React.Fragment>
              :
              <div>
                <Button className={classes.commonButton} color="inherit" onClick={() => { history.push('/'); setIsHome(true); }}>Home</Button>
                <Button className={classes.commonButton} color="inherit" onClick={() => { history.push('/About'); setIsHome(false); }}>About</Button>
                <Button className={classes.commonButton} color="inherit">Services</Button>
                <Button aria-controls="simple-menu" name='btn-register' aria-haspopup="true" className={classes.userButton} color="inherit" onClick={(event) => { handleClick(event); }}>Register</Button>
                <Button aria-controls="simple-menu" name='btn-login' aria-haspopup="true" className={classes.userButton} color="inherit" onClick={(event) => { handleClick(event); }}>Login</Button>
                <Menu
                  id="register-menu"
                  anchorEl={anchorRegister}
                  keepMounted
                  open={Boolean(anchorRegister)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={(event) => { handleRegister('sp', event); }}>To work</MenuItem>
                  <MenuItem onClick={(event) => { handleRegister('c', event); }}>To hire</MenuItem>
                </Menu>
                <Menu
                  id="login-menu"
                  anchorEl={anchorLogin}
                  keepMounted
                  open={Boolean(anchorLogin)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={(event) => { handleLogin('sp', event); }}>To work</MenuItem>
                  <MenuItem onClick={(event) => { handleLogin('c', event); }}>To hire</MenuItem>
                </Menu>
              </div>
            }
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
  ClearDropdown: () => dispatch(clearDropdown()),
  setIsHome: value => dispatch(setIsHome(value)),
  setUserType: value => dispatch(setUserType(value)),
  addServiceTypes: value => dispatch(addServiceTypes(value))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));




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
