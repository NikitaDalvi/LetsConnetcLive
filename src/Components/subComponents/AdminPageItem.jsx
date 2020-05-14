import React from "react";
import {Button} from 'react-bootstrap';

function EmployeeTableItem(props){
    return(
      <tr>
        <th scope="row">{props.id}</th>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.contact}</td>
        <td>{props.kyc}</td>
        <td>  <Button variant='danger' onClick={() => {props.isRemove(props.id)}} style={{marginRight:"10px"}}> Remove </Button>
         <Button variant='info'  onClick={() => {props.isEdit(props.id)}}> Edit </Button></td>
      </tr>
    );
}


export default EmployeeTableItem;
