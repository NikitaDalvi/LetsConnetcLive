/*jshint esversion: 6*/
import React from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ServiceProviderLogin from "./Components/ServiceProviderLogin";
import CustomerLogin from "./Components/CustomerLogin";
import Register from "./Components/RegistrationType";
import ProfessionalForm from "./Components/ProfessionalRegistrationForm";
import CustomerForm from "./Components/CustomerRegistrationForm";
import KYCmessage from "./Components/KYCMessage";
import NextPage from "./Components/nextPage";
import SPAdmin from "./Components/SPAdminPage";
import Map from "./Components/Map";
import SelectedCA from "./Components/SelectedCA-component";
import Timeslot from "./Components/subComponents/Timeslots-component";
import SPUserPage from "./Components/LoggedInUser-component";
//import LoggedInCustomer from "./Components/LoggedInUser-C-component";
import Footer from "./Components/footer";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user-actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user-selector';
import {withRouter} from 'react-router-dom';


class App extends React.Component{
  constructor(){
    super();
    this.state={

    };
  }

componentDidMount(){


}

render() {

  return(

       <div>
     <Header/>
     <Switch>
     <Route path="/" exact component={Home}/>
     <Route path="/Login=ServiceProvider" exact  render={()=>this.props.currentUser?(<Redirect to='/UserPage/Service-Provider'/>):(<ServiceProviderLogin/>)}/>
     <Route path="/UserPage/:type"  component={SPUserPage}/>
     <Route path="/Login=Customer" exact component={CustomerLogin}/>
     <Route path="/RegistrationType"  component={Register}/>
     <Route path="/ProfessionalForm" exact component={ProfessionalForm}/>
     <Route path="/CustomerForm" exact component={CustomerForm}/>
     <Route path="/Message" exact component={KYCmessage}/>
     <Route path="/NextPage" exact component={NextPage}/>
     <Route path="/SPAdminPage" exact component={SPAdmin}/>
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
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//
//<Login/>
