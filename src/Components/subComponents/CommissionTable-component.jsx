/*jshint esversion:9*/

import React from 'react';
import {Button,Container,makeStyles,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Paper} from '@material-ui/core';

function CommissionTable(){
  const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button:{
    width:'20%',
    height:'50px',
    background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
    color:'white'
  },
  btnContainer:{
    width:'100%',
    margin:theme.spacing(1),
    textAlign:'right',
    paddingRight:'8px'

  }

}));

const data = [
  {
    Name:'Saurabh Mane',
    date:'25/05/2019',
    Commission:200
  },
  {
    Name:'Devang Khandhar',
    date:'01/05/2019',
    Commission:400
  },
  {
    Name:'Dishank Mehta',
    date:'05/12/2019',
    Commission:250
  },
  {
    Name:'Nikhil Hinduja',
    date:'06/07/2019',
    Commission:450
  }
]

const classes = useStyles();

const total = data.reduce((accumulatedDue,item) => accumulatedDue+item.Commission,0);
  return(
    <Container maxWidth='md'>
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Sr.No</TableCell>
          <TableCell align="center">Customer</TableCell>
          <TableCell align="center">Date of Service</TableCell>
          <TableCell align="center">Commission (&#8377;)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row,index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {index+1}
            </TableCell>
            <TableCell align="center">{row.Name}</TableCell>
            <TableCell align="center">{row.date}</TableCell>
            <TableCell align="center">{row.Commission}</TableCell>
          </TableRow>
        ))}
        <TableRow>
        <TableCell component="th" scope="row" >
        </TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="right" style={{fontWeight:'800'}}>  Total</TableCell>
        <TableCell align="center" style={{fontWeight:'800'}}>{total}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  <div className={classes.btnContainer}>
    <Button className={classes.button}>Pay &#8377;{total}</Button>
  </div>
    </Container>
  );
}

export default CommissionTable;
