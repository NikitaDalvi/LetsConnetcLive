/*jshint esversion: 6*/
import React from "react";
import { Switch, Route} from "react-router-dom";
import SPDashboard from './dashboard-component';
import CDashboard from './dashboard-c-component';
// import DashboardCard from "./subComponents/Dashboard-card";
 import TodayService from "./TodayService-component";
 import Upcoming from "./UpcomingService-component";
 import New from "./NewService-component";
 import RatingAndReview from "./RatingAndReview-component";
 import UserProfile from "./UserProfile-component";
 import Wallet from "./Wallet-component";
import Availability from "./Availability";
import ServicesToProvide from "./ServicesToProvide";
 import {withRouter} from 'react-router-dom';
 import {connect} from 'react-redux';
 import {setCurrentUser} from '../redux/user/user-actions';
 import { makeStyles } from '@material-ui/core/styles';
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
import {Link,Grid} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const drawerWidth = 280;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: 'white',
    height:'70px'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    paddingTop:'30px',
    textAlign:'center'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  profilePic:{
    color:'linear-gradient(239.6deg, #BB60FC 2.39%, #FF5343 82.96%)'
  }
}));

function LoggedIn(props){

const classes = useStyles();

    return(
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
       <Toolbar style={{height:'80px'}}>
         <img src={Logo} st/>
         <ExitToAppIcon type='button' onClick={()=>{props.setCurrentUser(null);props.history.push('/');}} style={{color:'black',position:'absolute',right:'50px'}}/>

       </Toolbar>
     </AppBar>

      <Drawer
      className={classes.drawer}
       variant="permanent"
       classes={{
         paper: classes.drawerPaper,
       }}
     >
     <Toolbar />
       <div className={classes.drawerContainer} >

       <AccountCircleIcon color='secondary' fontSize='large' style={{fontSize:'100px'}}/>
       <Typography variant='h6'>Saikiran Bait</Typography>
       <Typography variant='caption'>Service Provider</Typography>
        <hr style={{width:'80%',marginLeft:'10%'}} />
        <Grid container style={{width:'70%',marginLeft:'40px'}}>
          <Grid item xs={4}>
            <Link color='inherit'>Profile</Link>
          </Grid>
          <Grid item xs={4}>
            <Link color='inherit'>Plan</Link>
          </Grid>
          <Grid item xs={4}>
            <Link color='inherit'>KYC</Link>
          </Grid>
        </Grid>
        <br/>
        <br/>
       <List>

           <ListItem button >
             <ListItemIcon style={{paddingLeft:'20px'}}><DashboardIcon/></ListItemIcon>
             <ListItemText primary='Dashboard' />
           </ListItem>
           <ListItem button>
             <ListItemIcon style={{paddingLeft:'20px'}}><NextWeekIcon/></ListItemIcon>
             <ListItemText primary='My Services' />
           </ListItem>
           <ListItem button>
             <ListItemIcon style={{paddingLeft:'20px'}}><PermContactCalendarIcon/></ListItemIcon>
             <ListItemText primary='Service Requests' />
           </ListItem>
           <ListItem button>
             <ListItemIcon style={{paddingLeft:'20px'}}><StarHalfIcon/></ListItemIcon>
             <ListItemText primary='Ratings & Reviews' />
           </ListItem>
           <ListItem button>
             <ListItemIcon style={{paddingLeft:'20px'}}><AccountBalanceIcon/></ListItemIcon>
             <ListItemText primary='Commission Due' />
           </ListItem>

       </List>

       </div>
     </Drawer>
     <main className={classes.content}>
       <Toolbar />
      <Switch>
        <Route path="/UserPage/ServiceProvider/ServicesToProvide"  component={ServicesToProvide}/>
        <Route path="/UserPage/ServiceProvider/Availability" exact component={Availability}/>
        <Route exact path='/UserPage/ServiceProvider/Dashboard' component={SPDashboard}/>
        <Route exact path='/UserPage/ServiceProvider/TodayService' component={TodayService}/>
        <Route exact path='/UserPage/ServiceProvider/Upcoming' component={Upcoming}/>
        <Route exact path='/UserPage/ServiceProvider/NewRequest' component={New}/>
        <Route exact path='/UserPage/ServiceProvider/RatingAndReview' component={RatingAndReview}/>
        <Route exact path='/UserPage/ServiceProvider/UserProfile' component={UserProfile}/>
        <Route exact path='/UserPage/ServiceProvider/Wallet' component={Wallet}/>
      </Switch>
</main>
      </div>
    );
  }


const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser,
  userType: user.userType
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LoggedIn));

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
