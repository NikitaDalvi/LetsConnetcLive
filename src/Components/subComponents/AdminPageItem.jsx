import React from "react";
import {Button,Avatar,Typography,Grid} from '@material-ui/core';

function EmployeeTableItem(props){
    return(
      <tr>
        <th scope="row">{props.index}</th>
        <td>
        <Grid container>
          <Grid item xs='3' style={{paddingLeft:'5px'}}>
            <Avatar alt="Remy Sharp" src={props.DP} />
          </Grid>
          
        </Grid>
        </td>
        <td>
        <Grid container>
        <Grid item xs='9' style={{paddingRight:'5px'}}>
            <Typography>{props.name}</Typography>
          </Grid>
          </Grid>
        </td>
        <td>{props.email}</td>
        <td>{props.contact}</td>
        <td>{props.kyc === 2? 'Subscribed':props.kyc === 3?'KYC uploaded':props.kyc === 4?'KYC accepted':props.kyc === 5?'KYC rejected':props.kyc === 6?'Active':'Inactive'}</td>
        <td>{props.kyc !== 8? <Button variant='outlined'  onClick={() => {props.isRemove(props.id)}} style={{marginRight:"10px",color:'#E70328',border:'1px solid #E70328'}}> DEACTIVATE </Button>:'' }  </td>
      </tr>
    );
}


export default EmployeeTableItem;
