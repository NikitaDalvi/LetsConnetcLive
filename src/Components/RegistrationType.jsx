import React from "react";
import {Link} from "react-router-dom";
import Heading from "./subComponents/page-headings";


function Register(){

  return(
    <div className="container register-container " id="regContainer">
    <Heading text="You want to register as..."/>
    <br/>
    <Link to="/DocumentUpload=Individual" style={{textDecoration: "none"}}>
    <a>  <button className="btn registerTypebtn" type="submit" >Individual</button></a>
    </Link>
      <br/>
      <br/>
    <Link to="/DocumentUpload=Company" style={{textDecoration: "none"}}>
      <a><button className="btn registerTypebtn" type="submit" >Company</button></a>
    </Link>
    </div>
  );
}

export default Register;
