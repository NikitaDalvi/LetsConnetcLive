import React from "react";

function Inputs(props){
  return(
    <input className="form-control" type={props.type} placeholder={props.placeholder}/>
  );
}

export default Inputs;
