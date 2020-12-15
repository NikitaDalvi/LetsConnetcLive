/*jshint esversion:9*/

import React, { useState, useEffect } from "react";
import { Button, Container, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, withStyles } from '@material-ui/core';
import { API } from '../../API';
import axios from "axios";
import { selectCurrentUser } from "../../redux/user/user-selector";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    width: '20%',
    height: '50px',
    background: 'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
    color: 'white'
  },
  btnContainer: {
    width: '100%',
    margin: theme.spacing(1),
    textAlign: 'right',
    paddingRight: '8px'

  }

}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function CommissionTable(props) {

  const classes = useStyles();
  const [commision, setCommission] = useState([]);
  const { currentUser } = props
  console.log(props);
  console.log(commision);

  useEffect(() => {
    if (currentUser != null) {
      console.log(currentUser.Ticket);
      const data = {
        ServiceProviderId: currentUser.Id,
        ticket: currentUser.Ticket,

      };
      getCommissinData(data).then(res => setCommission(res.data.output));
    }
  }, [currentUser]);

  async function getCommissinData(data) {
    return await axios.post(`${API.URL}GetCommissionDueByServiceProviderId`, data);
    
  }

  const getTotal = () => {
    let sum = 0
    console.log(sum)
    
    for(let item of commision){
      console.log(sum + item.ServiceCharges)
      sum = Math.round(sum + item.ServiceCharges)
    }
    return sum
    
  }
  
  
  return (
    <Container maxWidth='md'>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow style={{backgroundColor : 'black' , color : 'white'}}>
                <TableCell style={{ color : 'white'}} align="center">Sr.No</TableCell>
                <TableCell style={{ color : 'white'}} align="center">Customer</TableCell>
                <TableCell style={{ color : 'white'}} align="center">Service</TableCell>
                <TableCell style={{ color : 'white'}} align="center">Fees </TableCell>
                <TableCell style={{ color : 'white'}} align="center">Commission</TableCell>
                <TableCell style={{ color : 'white'}} align="center">Date of Service</TableCell>
                <TableCell style={{ color : 'white'}} align="center">Actual Amount (&#8377;)</TableCell>
                <TableCell style={{ color : 'white'}} align="center">Service Charge </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {commision.map((item, index) => (
              <TableRow>
                <StyledTableCell component="th" scope="row">{index+1}
                </StyledTableCell>
                <StyledTableCell align="center" >{item.SE}</StyledTableCell>
                <StyledTableCell align="center">{item.Services}</StyledTableCell>
                <StyledTableCell align="center">{item.Fees}</StyledTableCell>
                <StyledTableCell align="center">{item.CommissionAmount}{item.Type && item.Type===1 ?'%':item.type===2?'₹':null}</StyledTableCell>
                <StyledTableCell align="center">{item.RequestedOn}</StyledTableCell>
                <StyledTableCell align="center">{item.ActualAmount}</StyledTableCell>
                <StyledTableCell align="center">{item.ServiceCharges}</StyledTableCell>
              </TableRow>))}

            <TableRow>
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right" style={{ fontWeight: '800' }}>  Total</TableCell>
              <TableCell align="right" style={{ fontWeight: '800' }}>{getTotal()}</TableCell>
            </TableRow></TableBody>
        </Table>
      </TableContainer>
      <div className={classes.btnContainer}>
        <Button className={classes.button}>Pay &#8377;{ }</Button>
      </div>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(CommissionTable);
