/*jshint esversion: 6*/
import React from "react";
import Navbar from "./subComponents/navbar";

function Header({isHome}){
  return <Navbar home={isHome} />;
}

export default Header;
