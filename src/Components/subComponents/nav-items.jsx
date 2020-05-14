import React from "react";


function Navitem(props){
  return(
    <li className="nav-item" >
      <a id={props.Id}  href={props.href}>{props.name}</a>
    </li>
  );
}

export default Navitem;
