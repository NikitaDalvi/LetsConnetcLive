/*jshint esversion: 6*/
import React,{useState} from "react";
import Login from "./Login";
import SPService from "./ServicesToProvide";
import LoggedInSP from "./LoggedInUser-component";

function ServiceProviderLogin(){

  return(
    <Login type="Service-Provider" />
  );


}

export default ServiceProviderLogin;
