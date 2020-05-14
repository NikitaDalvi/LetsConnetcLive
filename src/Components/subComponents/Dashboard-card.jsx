/*jshint esversion:6*/
import React from "react"
  import {withRouter} from 'react-router-dom';
function DashboardCard(props){
  return(
    <div className="container dashboard-card-container" onClick={()=>props.type==="SP"?props.history.push(`/UserPage/ServiceProvider/${props.routeName}`):props.history.push(`/UserPage/Customer/${props.routeName}`)}>
      <p className="h2">{props.name}</p>
      <div style={{textAlign:"right",display:props.id !=="Wallet"?"":"none"}}>
      <span className="badge badge-light" style={{width:"30px",height:"30px", textAlign:"center", paddingTop:"10px", background:"linear-gradient(to right, #4F6DE6 10%,#4B66EA 30%,#82A0F6  100%)", color:"white"}}>4</span>
      </div>
    </div>
  );
}

export default withRouter(DashboardCard);
