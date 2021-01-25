/*jshint esversion:6*/
import React from "react";
  import {withRouter} from 'react-router-dom';

function UserHeader(props){
  return(
    <div className="row" style={{borderBottom:"solid 1px black"}}>
      <p className="h4 col-lg-10" style={{textAlign:"right", marginTop:"20px"}}> Welcome User!</p>
      <div class="dropdown col-lg-2">
  <a class="btn  dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <img alt="user" src={props.dp} style={{width:"50px", borderRadius:"100%"}}/>
  </a>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a class="dropdown-item" onClick={()=>props.history.push("/UserPage/ServiceProvider/UserProfile")}>Profile</a>
    <a class="dropdown-item" href="/">Logout</a>
  </div>
</div>
    </div>
  );
}

export default withRouter(UserHeader);
