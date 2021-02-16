/*jshint esversion:9*/

import React, { useState, useEffect } from "react";
import { Button, Container, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, withStyles,Backdrop } from '@material-ui/core';
import { API } from '../../API';
import axios from "axios";
import { selectCurrentUser } from "../../redux/user/user-selector";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import loader from '../../Images/loader.gif'
import { useMediaQuery } from 'react-responsive';




const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function loadRazorPay(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onLoad = () => {
      resolve(true);
    };
    script.onError = () => {
      resolve(false);
    };
    document.body.append(script);
  });
}

function CommissionTable(props) {

  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: isMobile?100:650,
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

  const classes = useStyles();
  const [commision, setCommission] = useState([]);
  const [loading,setLoading] = useState(false);
  const { currentUser } = props
  console.log(props);
  console.log(commision);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    if (currentUser != null) {
      console.log(currentUser.Ticket);
      const data = {
        ServiceProviderId: currentUser.Id,
        ticket: currentUser.Ticket,

      };
      getCommissinData(data).then(res => {console.log(res); setCommission(res.data.output)});
    }
  }, [currentUser]);

  async function getCommissinData(data) {
    return await axios.post(`${API.URL}GetCommissionDueByServiceProviderId`, data);

  }

  function getSum(total, num) {
  return total + Math.round(num);
}

  const getTotal = () => {
    let commissions = [];
    commision.map(i => commissions.push(i.ServiceCharges));
    let total = commissions.reduce(getSum, 0);
    
    let GstPrice= Math.round(total*18/100)
    return total;
  }

  async function displayRazorPay() {

    var data = null;
    var price = getTotal();
    data = await axios.post(`${API.URL}razorPay/${price}`);

    const result = data.data.output.Attributes;
    console.log(result);
    const __DEV__ = document.domain === 'localhost';
    console.log(data);
    const options = {

      "key": 'rzp_test_nDfaBdpKMGXFdF',
      "currency": result.currency,
      "name": "Commission Due",
      "description": "Test Transaction",
      "order_id": result.id,
      "handler": function (response) {
        console.log(response);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        if (response) {
            setLoading(true);
          let appointmentIDs = [];
          commision.map(i => appointmentIDs.push(i.Id));
          const paymentDetails = {
            RazorPaymentId: response.razorpay_payment_id,
            OrderId: response.razorpay_order_id,
            PaymentSignature: response.razorpay_signature,
            Amount: result.amount / 100,
          };
          console.log(paymentDetails);
          let request = {
            AppointmentIds:appointmentIDs,
            Amount:price,
            Ticket:currentUser.Ticket,
            PaymentDetails:paymentDetails
          };
            SaveCommissionPayment(request)
            .then(res => {
              setLoading(false);
              console.log(res);
              window.location.reload();
            })
            .catch(err => {
              setLoading(false);
              console.log(err);
            });

        }
      },
      "prefill": {
        "name": props.currentUser.FullName,
        "email": props.currentUser.EmailId,
        "contact": props.currentUser.ContactNo
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  }

  async function SaveCommissionPayment(data) {
    return await axios.post(`${API.URL}SaveCommissionPayment`, data);

  }


  return (
    <Container maxWidth={isMobile?'sm':'lg'}>
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
        <Button className={classes.button} onClick={displayRazorPay}>Pay &#8377;{ }</Button>
      </div>
      <Backdrop className={classes.backdrop} open={loading} style={{zIndex:'9999'}}>
        <img src={loader} alt='loading' style={{opacity:'1'}} width='200' height='200'/>
      </Backdrop>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(CommissionTable);
