import React from "react";
import {Typography,Avatar} from '@material-ui/core';


function EmployeeList(props){
  return(
  <tr>
      <th scope="row">{props.id}</th>
      <td><Typography><Avatar alt="Remy Sharp" src={props.DP} />{props.name}</Typography></td>
      <td>  <button type="button" className="btn btn-default registerTypebtn" onClick={() => {props.isClicked(props.id)}}> Upload </button></td>
      <td>  <button type="button" className="btn btn-default registerTypebtn" onClick={() => {props.remove(props.id)}}> Remove </button></td>
    </tr>
  );
}

export default EmployeeList;
