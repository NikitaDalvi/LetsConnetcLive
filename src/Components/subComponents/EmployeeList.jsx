import React from "react";

function EmployeeList(props){
  return(
  <tr>
      <th scope="row">{props.id}</th>
      <td>{props.name}</td>
      <td>  <button type="button" className="btn btn-default registerTypebtn" onClick={() => {props.isClicked(props.id)}}> Upload </button></td>
      <td>  <button type="button" className="btn btn-default registerTypebtn" onClick={() => {props.remove(props.id)}}> Remove </button></td>
    </tr>
  );
}

export default EmployeeList;
