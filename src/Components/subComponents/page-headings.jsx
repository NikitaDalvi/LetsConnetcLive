import React,{useEffect,useState} from "react"

function Heading(props){

  return(
    <p className="lead common-heading"
    >{props.text}</p>
  );
}

export default Heading;
