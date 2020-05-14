import React from "react";

function SubscriptionCard(props){
  return(
    <div>
    <img src={props.img}/>
    <br/>
    <br/>
    <p style={{fontWeight:"bold",fontSize:"20px"}}>{props.type}</p>
    <p className="h5">Rs {props.price}<span  style={{fontSize:"15px"}}>/year</span></p>
    <br/>
    <p className="lead">{props.des1}</p>
    <br/>
    <p className="lead">{props.des2}</p>
    <br/>

    </div>
  );
}

export default SubscriptionCard;
