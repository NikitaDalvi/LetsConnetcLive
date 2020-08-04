/*jshint esversion: 6*/
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SPDashboard from './dashboard-component';
import CDashboard from './dashboard-c-component';
// import DashboardCard from "./subComponents/Dashboard-card";
import ServiceRequest from './ServiceRequest-component';
import RatingAndReview from "./RatingAndReview-component";
import SPAdminPage from './SPAdminPage';
import UserProfile from "./UserProfile-component";
import Commission from "./Commission-component";
import MyServices from "./MyServices";
import Settings from './Settings-components';
import NearbyExperts from './NearbyExperts-component';
import UserDetails from './UserDetails-component';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from '../redux/user/user-actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Logo from "../Images/Logo.png";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, Grid } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Avatar } from '@material-ui/core';
import Sai from '../Images/sai.jpg';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import WorkIcon from '@material-ui/icons/Work';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import axios from 'axios';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { API } from "../API";


const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'white',
    height: '70px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    color: 'black',
    marginRight: theme.spacing(2),
  },
  drawerContainer: {
    overflow: 'auto',
    paddingTop: '30px',
    textAlign: 'center'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  profilePic: {
    color: 'linear-gradient(239.6deg, #BB60FC 2.39%, #FF5343 82.96%)'
  },

  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginLeft: '105px',
    marginBottom: '10px',
    marginTop: '30px'
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  typography: {
    padding: theme.spacing(2),
    fontFamily: 'roboto',
    fontSize: '15px'
  },
  nested: {
    paddingLeft: '50px'
  }
}));

function LoggedIn(props) {

  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Open, setOpen] = React.useState(false);
  const [path, setPath] = useState('');
  const { currentUser, userType } = props;
  const [serviceList, setList] = React.useState([]);
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState(2);
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };



  useEffect(() => {
    if (currentUser) {
      setName(currentUser.FullName);
      const Path = `${API.URL}${currentUser.DPPath}`
      console.log(Path);
      setPath(Path);
      setType(currentUser.UserRole);
      setNotifications(["Hey, please complete your service profile !"]);
    }
  }, [currentUser])

  React.useEffect(() => {
    GetServiceType().then(result => {
      if (result) {
        setList(result.data.output)
      }
    });

  }, []);

  function GetServiceType() {
    return axios.get(`${API.URL}getServiceTypes`);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpansion = () => {
    setOpen(!Open);
  };




  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}>
        <Toolbar style={{ height: '80px' }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            disabled={currentUser && currentUser.Status!==6}
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <img src={Logo} st />

          <ExitToAppIcon type='button' onClick={() => { props.setCurrentUser(null); props.history.push('/'); }} style={{ color: 'black', position: 'absolute', right: '100px' }} />
          <Badge badgeContent={notifications.length} color="secondary" style={{ color: 'black', position: 'absolute', right: '150px' }}>
            <NotificationsIcon type='button' onClick={handleClick} />
          </Badge>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {notifications.map((item, index) => (<div><Typography key={index} className={classes.typography}><ErrorOutlineIcon style={{ color: 'red' }} /> Test- {item}</Typography><Divider /></div>))}

          </Popover>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerHeader}>
        </div>
        <div className={classes.drawerContainer} >

          <Avatar alt="Remy Sharp" src={path} className={classes.large} />
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='caption'>{userType}</Typography>
          <hr style={{ width: '80%', marginLeft: '10%' }} />
          <Grid container style={{ width: '70%', marginLeft: '40px' }}>
            <Grid item xs={6}>
              <Link color='inherit' className={classes.link} href={userType === 'Service-Provider' ? '/UserPage/ServiceProvider/UserProfile' : '/UserPage/Customer/UserProfile'}>Profile</Link>
            </Grid>
            <Grid item xs={6}>
              <Link color='inherit' className={classes.link} href='/UserPage/Settings/ChangePassword'>Settings</Link>
            </Grid>
          </Grid>
          <br />
          <br />
          {type === 6 ? (
            <List>

              <ListItem button onClick={() => { props.history.push('/UserPage/SPAdmin/MyEmployees'); }}>
                <ListItemIcon style={{ paddingLeft: '20px' }}><GroupIcon /></ListItemIcon>
                <ListItemText primary='My Employees' />
              </ListItem>

            </List>
          ) : (
              <List>

                <ListItem button onClick={() => { userType === 'Service-Provider' ? props.history.push('/UserPage/ServiceProvider/Dashboard') : props.history.push('/UserPage/Customer/Dashboard') }}>
                  <ListItemIcon style={{ paddingLeft: '20px' }}><DashboardIcon /></ListItemIcon>
                  <ListItemText primary='Dashboard' />
                </ListItem>
                <ListItem button style={{ display: userType === 'Service-Provider' ? '' : 'none' }} onClick={() => { props.history.push('/UserPage/ServiceProvider/MyServices/ServicesToProvide') }}>
                  <ListItemIcon style={{ paddingLeft: '20px' }}><NextWeekIcon /></ListItemIcon>
                  <ListItemText primary='My Services' />
                </ListItem>
                <ListItem button style={{ display: userType === 'Customer' ? '' : 'none' }} 
                  //onClick={() => { handleExpansion(); }}
                  onClick={() => props.history.push('/UserPage/Customer/NearbyExperts')}
                  >
                  <ListItemIcon style={{ paddingLeft: '20px' }}><WorkIcon /></ListItemIcon>
                  <ListItemText primary='Nearby Experts' />
                  {/*Open ? <ExpandLess /> : <ExpandMore />*/}
                </ListItem>
                {/*<Collapse in={Open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() => { props.history.push('/UserPage/Customer/NearbyExperts') }}>
                      <ListItemIcon>
                        <ArrowForwardIosIcon />
                      </ListItemIcon>
                      <ListItemText primary='All' />
                    </ListItem>
                    {serviceList ? serviceList.map((item, index) => (<ListItem button className={classes.nested} key={index} >
                      <ListItemIcon>
                        <ArrowForwardIosIcon />
                      </ListItemIcon>
                      <ListItemText primary={item.Service} />
                    </ListItem>)) : '  '}
                  </List>
                </Collapse>*/}
                <ListItem button onClick={() => { props.userType === 'Service-Provider' ? props.history.push('/UserPage/ServiceProvider/ServiceRequest') : props.history.push('/UserPage/Customer/ServiceRequest') }}>
                  <ListItemIcon style={{ paddingLeft: '20px' }}><PermContactCalendarIcon /></ListItemIcon>
                  <ListItemText primary='Service Requests' />
                </ListItem>
                <ListItem button onClick={() => { props.userType === 'Service-Provider' ? props.history.push('/UserPage/ServiceProvider/RatingAndReview') : props.history.push('/UserPage/Customer/RatingAndReview') }}>
                  <ListItemIcon style={{ paddingLeft: '20px' }}><StarHalfIcon /></ListItemIcon>
                  <ListItemText primary='Ratings & Reviews' />
                </ListItem>
                <ListItem button style={{ display: props.userType === 'Service-Provider' ? '' : 'none' }} onClick={() => { props.history.push('/UserPage/ServiceProvider/CommissionDue') }}>
                  <ListItemIcon style={{ paddingLeft: '20px' }}><AccountBalanceIcon /></ListItemIcon>
                  <ListItemText primary='Commission Due' />
                </ListItem>

              </List>
            )}


        </div>
      </Drawer>
      <main className={clsx(classes.content, {
        [classes.contentShift]: drawerOpen,
      })}>
        <Toolbar />
        <Switch>
          <Route path="/UserPage/ServiceProvider/MyServices" component={MyServices} />
          <Route path="/UserPage/Customer/NearbyExperts" component={NearbyExperts} />
          <Route path="/UserPage/Settings" component={Settings} />
          <Route exact path={userType === 'Service-Provider' ? '/UserPage/ServiceProvider/Dashboard' : '/UserPage/Customer/Dashboard'} component={SPDashboard} />
          <Route exact path={userType === 'Service-Provider' ? '/UserPage/ServiceProvider/ServiceRequest' : '/UserPage/Customer/ServiceRequest'} component={ServiceRequest} />
          <Route exact path={userType === 'Service-Provider' ? '/UserPage/ServiceProvider/RatingAndReview' : '/UserPage/Customer/RatingAndReview'} component={RatingAndReview} />
          <Route exact path={userType === 'Service-Provider' ? '/UserPage/ServiceProvider/UserProfile' : '/UserPage/Customer/UserProfile'} component={UserProfile} />
          <Route exact path='/UserPage/ServiceProvider/CommissionDue' component={Commission} />
          <Route exact path='/UserPage/UserDetail' component={UserDetails} />
          <Route exact path='/UserPage/SPAdmin/MyEmployees' component={SPAdminPage} />
        </Switch>
      </main>
    </div>
  );
}


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
  userType: user.userType
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedIn));

// <div className="container" style={{textAlign:"left", marginBottom:"200px"}}>
// <div style={{display: this.state.stage==="dashboard"?"":"none"}}>
//   <h1 className="display-4">My Service Requests</h1>
//   <hr/>
//   <div className="card-mainContainer">
//   <DashboardCard id="Today" name="Today's" cardClick={this.CardClick}/>
//   <DashboardCard id="Upcoming" name="Upcoming" cardClick={this.CardClick}/>
//   <DashboardCard id="New" name="New" cardClick={this.CardClick}/>
//   </div>
//   <br/>
//   <h1 className="display-4">Others</h1>
//   <hr/>
//   <div className="card-mainContainer">
//   <DashboardCard id="RatingAndReview" name="Rating & Review" cardClick={this.CardClick}/>
//   <DashboardCard id="Wallet" name="My Wallet" cardClick={this.CardClick}/>
//   </div>
//   </div>
//   <TodayService stage={this.state.stage} backClick={this.backToDashboard}/>
//   <Upcoming stage={this.state.stage} backClick ={this.backToDashboard}/>
//   <New stage={this.state.stage} backClick ={this.backToDashboard}/>
//   <RatingAndReview stage={this.state.stage} backClick={this.backToDashboard}/>
//   <UserProfile stage={this.state.stage} backClick={this.backToDashboard}/>
//   <Wallet stage={this.state.stage} backClick={this.backToDashboard} balance="4000"/>
// </div>


// <Route exact path='/UserPage/Customer/Dashboard/:id' component={CDashboard}/>
// <Route exact path='/UserPage/Customer/NearbyCA' component={NearbyCA}/>
// <Route exact path='/UserPage/Customer/Rating/:id' component={Rating}/>
