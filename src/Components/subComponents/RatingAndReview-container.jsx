/*jshint esversion:6*/

import React from "react";
import RatingCard from "./RatingAndReview-card";

function RatingContainer(props){
  return(
    <div className="card-mainContainer">
      <RatingCard name={props.name1} rating="4" review="The customer was good and co-operative"/>
      <RatingCard name={props.name2} rating="4" review="The customer was good and co-operative"/>
      <RatingCard name={props.name3} rating="4.5" review="The customer was good and co-operative"/>
      <RatingCard name={props.name4} rating="4.5" review="The customer was good and co-operative"/>
    </div>
  );
}

export default RatingContainer;
