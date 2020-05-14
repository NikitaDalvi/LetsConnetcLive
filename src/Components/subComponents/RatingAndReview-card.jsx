/*jshint esversion:6*/

import React from "react";

function RatingCard(props){
  return(
    <div className="card" style={{width:"18rem"}}>
  <div className="card-body">
    <h5 className="card-title" style={{color:"#82A0F6"}}>{props.name}</h5>
    <h6 className="card-subtitle mb-2 ">Rating</h6>
    <p className="lead" style={{textAlign:"center", fontSize:"40px"}}>{props.rating}<span style={{fontSize:"20px"}}>/5</span></p>
    <hr/>
    <h6 className="card-subtitle mb-2">Review</h6>
    <p><em>"{props.review}"</em></p>
</div>
</div>
  );
}

export default RatingCard;
