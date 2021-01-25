/*jshint esversion:6*/

import React from "react";
import UserHeader from "./subComponents/user-header";
import userIcon from "../Images/user.jpg";
import { Switch, Route} from "react-router-dom";
 import {withRouter} from 'react-router-dom';
import DashboardCard from "./subComponents/Dashboard-card";
import NearbyCA from "./NearbyCA-component";
import UserProfile from "./UserProfile-component";
import Rating from "./Rating-Customer-component";
//import SelectedCA from "./SelectedCA-component";

class LoggedInCustomer extends React.Component{
  constructor(){
    super();
    this.state={
      stage:"Nearby"
    }
  }






  CardClick = (id) =>{
    this.setState({
      stage:id
    })
  }

  backToDashboard = () =>{
    this.setState({
      stage:"dashboard"
    })
  }


  render(){
    return(
      <div>
      <UserHeader dp={userIcon} type="Customer" Click={this.CardClick}/>
      <br/>
      <br/>
      <div className="container" style={{textAlign:"left", marginBottom:"200px"}}>
      <div style={{display: this.state.stage==="dashboard"?"":"none"}}>
      <h1 className="display-4">Contents</h1>
      <hr/>
      <div className="card-mainContainer">
      <DashboardCard id="Nearby" name="Nearby CA" cardClick={this.CardClick}/>
      <DashboardCard id="Rating" name="Rate & Review" cardClick={this.CardClick}/>
      </div>
</div>
      <NearbyCA  stage={this.state.stage} backClick={this.backToDashboard} />
        <UserProfile stage={this.state.stage} backClick={this.backToDashboard}/>
        <Rating stage={this.state.stage} backClick={this.backToDashboard}/>
      </div>
      </div>
    );
  }
}

export default LoggedInCustomer;
