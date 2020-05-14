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


class LoggedIn extends React.Component{
  constructor(){
    super();
    this.state={

    };
  }



  componentDidMount(){
          this.props.history.push('/UserPage/ServiceProvider/ServicesToProvide');

  }

  componentWillUnmount(){
    this.props.setCurrentUser(null);
  }

  render(){
    return(
      <div>
      <br/>
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

      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LoggedIn));

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
