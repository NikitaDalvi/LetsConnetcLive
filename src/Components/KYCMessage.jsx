import React from "react";
import {Link} from "react-router-dom";

function KYCMessage(){
  return(
    <div className="container messageContainer">
      <p class="h3">Your documents are sent for Verification. <br/> We will inform you through e-mail once done.<br/><br/><span class="h1"> Thank You ! </span></p>
      <br/>
      <Link to="/" style={{textDecoration: "none"}}>
        <a><button className="btn registerTypebtn" type="submit" style={{width:"12%"}}>Back to Home</button></a>
      </Link>
    </div>
  );
}

export default KYCMessage;
