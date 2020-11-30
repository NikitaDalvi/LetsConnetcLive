/*jshint esversion: 6*/
import React from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ServiceProviderLogin from "./Components/ServiceProviderLogin";
import Login from "./Components/Login";
import ForgotPassword from './Components/forgotPassword-component';
import Register from "./Components/RegistrationType";
import Registration from "./Components/Registration-component";
import CustomerForm from "./Components/CustomerRegistrationForm";
import KYCmessage from "./Components/KYCMessage";
import NextPage from "./Components/nextPage";
import Map from "./Components/Map";
import SelectedCA from "./Components/SelectedCA-component";
import Timeslot from "./Components/subComponents/Timeslots-component";
import SPUserPage from "./Components/LoggedInUser-component";
import AboutPage from './Components/About-component';
import Terms from './Components/Terms-component';
//import LoggedInCustomer from "./Components/LoggedInUser-C-component";
import Footer from "./Components/footer";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {setCurrentUser,setIsHome} from './redux/user/user-actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user-selector';
import {withRouter} from 'react-router-dom';
import MusicCard from './Components/player-component';


class App extends React.Component{
  constructor(){
    super();
    this.state={

    };
  }

componentWillUnmount(){
  this.props.setIsHome(true);
}

render() {

  return(

       <div>
     <Header/>
     <Switch>
     <Route path="/" exact component={Home}/>
     <Route path="/Login=ServiceProvider" exact  render={()=>this.props.currentUser?(<Redirect to='/UserPage/ServiceProvider/Dashboard'/>):(<ServiceProviderLogin/>)}/>
     <Route path="/UserPage/:type"  component={SPUserPage}/>
     <Route path="/Login" exact component={Login}/>
     <Route path="/ForgotPassword" exact component={ForgotPassword}/>
     <Route path="/RegistrationType"  component={Register}/>
     <Route path="/Registration"  component={Registration}/>
     <Route path="/CustomerForm" exact component={CustomerForm}/>
     <Route path="/Message" exact component={KYCmessage}/>
     <Route path="/NextPage" exact component={NextPage}/>
     <Route path="/About" exact component={AboutPage}/>
     <Route path="/Terms" exact component={Terms}/>
     <Route path="/MusicCard" exact component={MusicCard}/>

     


     
    
        <Route path="/Map" exact component={Map}/>
        <Route path="/SelectedCA" exact component={SelectedCA}/>
        <Route path="/Timeslot" exact component={Timeslot}/>
        <Route path='/latlong' exact component={() => {
     window.location.href = 'https://latlong.net';
     return null;
}}/>
</Switch>
     <Footer/>
     </div>

   );
}
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setIsHome: value => dispatch(setIsHome(value))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//
//<Login/>
