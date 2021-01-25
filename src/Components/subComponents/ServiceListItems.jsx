import React from "react";
import {Button} from 'react-bootstrap'

function ListItem(props){
  return(



    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.Name}</td>
      <td>{props.Fee} &#8377;</td>
      <td>  <Button variant='danger' onClick={() => {props.isClicked(props.service)}}> Remove </Button></td>
    </tr>
  );
}

export default ListItem;
