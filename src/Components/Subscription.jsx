/*jshint esversion:6*/
import React, { useState, useEffect } from "react";
import singleUser from "../Images/Single-User.png";
import corporateUser from '../Images/Corporate-User.png';
import Heading from "./subComponents/page-headings";
import SubscriptionCard from "./subComponents/Subscription-Card";
import { Modal, Form } from 'react-bootstrap';
import { Typography, makeStyles, Grid, Button, Container, Backdrop } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectUserType, selectIndividualSub, selectRegisteredUser } from '../redux/user/user-selector';
import { setProgress, setIsHome, setSubscriptionType, setIndividualSub, setRegisteredUser, setUserStatus, setUserRole, setCompanyDetails, setCurrentUser } from '../redux/user/user-actions';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { API } from '../API'
import loader from '../Images/loader.gif'

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

function Subscription(props) {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const [modalShow, setModalShow] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const { setIndividualSub } = props;
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  //
  const [loading, setLoading] = useState(false);
  const [initialData, setinitialData] = useState({});
  const [company, setCompany] = useState({});
  const [selectedSub, setSelectedSub] = useState('');

  //
  const handleChange = event => {
    setCompanyName(event.target.value);


  };

  const { userType, setProgress, registeredUser, setCurrentUser,setSubscriptionType } = props;

  useEffect(() => {
    setLoading(true);
   
    if (userType === 'Service-Provider') {
      setProgress(50);
    } else {
      setProgress(100);
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    const fetchData = () => {
      if (registeredUser) {
        const ticket = registeredUser.Ticket;
        axios.post(`${API.URL}GetActiveSubscription`, ticket)
          .then(res => {
            console.log(res);
            if (userType === 'Service-Provider') {
              const individual = res.data.output.find(sub => sub.SubscriptionType === 1);
              const corporate = res.data.output.find(sub => sub.SubscriptionType === 2);
              setinitialData(individual);
              setCompany(corporate);
              setLoading(false);
            } else {
              const individual = res.data.output.find(sub => sub.SubscriptionType === 3);
              const corporate = res.data.output.find(sub => sub.SubscriptionType === 4);
              setinitialData(individual);
              setCompany(corporate);
              setLoading(false);
            }
           
          });
      }

    };
    fetchData();
  }, [userType, setProgress, registeredUser])



  const useStyles = makeStyles(theme => ({
    btnSelect: {
      margin: theme.spacing(1),
      width: '100px',
      fontSize: '12px',
      background: 'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
      height: '40px',
      color: 'white',
      borderRadius: '8px'
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  const classes = useStyles();

  const SubsSelectionClick = (type, companyName) => {
    var updatedData;

    setSubscriptionType(type);

    if (props.userType === 'Service-Provider') {
      updatedData = {
        Id: props.registeredUser.Id,
        UserRole: type === 'Individual' ? 2 : 6,
        Status: 2,
        CompanyName: companyName,
        Ticket: registeredUser.Ticket
      }

    } else {
      updatedData = {
        Id: props.registeredUser.Id,
        UserRole: type === 'Individual' ? 4 : 5,
        Status: 6,
        CompanyName: companyName,
        Ticket: registeredUser.Ticket
      }
    }
    if (type === 'Individual') {
      updateUserRole(updatedData)
        .then(res => {
          if (res.data.responseCode === 200) {
            userType === 'Service-Provider' ? props.setUserStatus(2) : props.setUserStatus(6);
            userType === 'Service-Provider' ? props.setUserRole(2) : props.setUserRole(4);
          }
        });
    } else {
      updateCompanyDetails(updatedData)
        .then(res => {
          if (res.data.responseCode === 200) {
            userType === 'Service-Provider' ? props.setUserStatus(2) : props.setUserStatus(6);
            userType === 'Service-Provider' ? props.setUserRole(6) : props.setUserRole(5);
            const details = {
              companyName: updatedData.CompanyName,
              companyId: res.data.output
            };
            props.setCompanyDetails(details);

          }
        });
    }
    setLoading(false);
    if (userType === 'Service-Provider') {
      props.history.push('/Registration/KYC');
    } else {
      setCurrentUser(registeredUser);
      setRegisteredUser(null);
      props.history.push('/UserPage/Customer/Dashboard');
    }

  }

  async function updateUserRole(data) {
    const result = await axios.post(`${API.URL}Update_UserRole`, data);
    return result;
  }

  async function updateCompanyDetails(data) {
    const result = await axios.post(`${API.URL}UpdateCompanyName`, data);
    return result;
  }


  async function displayRazorPay(type) {

    var data = null;
    if (type === "Individual") {
       let PriceAfterDiscount = Math.round(initialData.Price- (initialData.Price * initialData.DiscountPercentage / 100))
       console.log()
      data = await axios.post(`${API.URL}razorPay/${PriceAfterDiscount}`);
    } else {
      let CompanyAfterDiscount = Math.round(company.Price- (company.Price * company.DiscountPercentage / 100))
      data = await axios.post(`${API.URL}razorPay/${CompanyAfterDiscount}`);
    }

    const result = data.data.output.Attributes;
    const __DEV__ = document.domain === 'localhost';
    console.log(data);
    const options = {
   
      "key": 'rzp_test_nDfaBdpKMGXFdF',
      "currency": result.currency,
      "name": "Subscription Purchase",
      "description": "Test Transaction",
      "order_id": result.id,
      "handler": function (response) {
        console.log(response);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        if (response) {
          setLoading(true);
          const subscriptionDetails = {
            UserId: registeredUser.Id,
            SubscriptionDiscountId: type === 'Individual' ? initialData.DiscountId : company.DiscountId,
            SubscriptionPricingHistoryId: type === 'Individual' ? initialData.HistoryId : company.HistoryId,
            StartDate: new Date().toDateString(),
            EndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toDateString(),
          }

          const paymentDetails = {
            RazorPaymentId: response.razorpay_payment_id,
            OrderId: response.razorpay_order_id,
            PaymentSignature: response.razorpay_signature,
            Amount: result.amount / 100,
            PaidFor: 1,
          }

          const request = {
            SubscriptionDetails: subscriptionDetails,
            Ticket: registeredUser.Ticket,
            PaymentDetails: paymentDetails
          };
          //data = await axios.post(`https://localhost:44327/api/razorPay/${initialData.Price}`);
          console.log(request);
          saveSubscription(request)
            .then(res => {
              if (res === true) {
                type === 'Individual' ? SubsSelectionClick(type, null) : SubsSelectionClick(type, companyName);
              }
            });

        }
      },
      "prefill": {
        "name": props.registeredUser.FullName,
        "email": props.registeredUser.EmailId,
        "contact": props.registeredUser.ContactNo
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

  }

  async function saveSubscription(data) {
    const result = await axios.post(`${API.URL}SaveSubscription`, data);
    return result.data.output;
  }



  console.log(initialData)
  return (
    <div>
      <div style={{ paddingLeft: "center" }}>

        <Container style={{ textAlign: "center" }}>
          <br />
          <Typography variant='h4'>Choose your plan</Typography>
          <br />
          <br />
          <Grid container style={{ textAlign: 'center', paddingLeft: isMobile ? '' : '180px' }} >
            <Grid item xs={isMobile ? 12 : 5}>
              <SubscriptionCard type='Individual' img={`${initialData.ImagePath}`} price={initialData.Price} discount={initialData.DiscountPercentage} link="/DocumentUpload=Individual" description={initialData.Description} />
              <Backdrop className={classes.backdrop} open={loading} style={{zIndex:'9999'}}>
                <img src={loader} alt='loading' style={{opacity:'1'}} width='200' height='200'/>
              </Backdrop>
              <a><Button className={classes.btnSelect} onClick={() => { displayRazorPay("Individual"); }}>SELECT</Button></a>
            </Grid>
            <Grid item xs={isMobile ? 12 : 5}>
              <SubscriptionCard type='Corporate' img={`${company.ImagePath}`} price={company.Price} discount={company.DiscountPercentage} link="/DocumentUpload=Company" description={company.Description} handleClick={props.SubsSelectionClick} />
              <Backdrop className={classes.backdrop} open={loading} style={{zIndex:'9999'}}>
                <img src={loader} alt='loading' style={{opacity:'1'}} width='200' height='200'/>
              </Backdrop>
              <a><Button className={classes.btnSelect} onClick={() => setModalShow(true)}>SELECT</Button></a>
            </Grid>
          </Grid>
          <Modal
            animation={false}
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Update the Company name.
      </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ textAlign: 'center' }}>
              <Form style={{ textAlign: 'center', paddingLeft: '50px' }}>
                <Form.Group controlId="formBasicEmail" style={{ width: '80%' }}>
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" value={companyName} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='login' style={{ marginRight: isMobile ? '100px' : '50px', width: '60%' }} onClick={props.onHide} onClick={() => { setModalShow(false); displayRazorPay("Company"); }}>UPDATE</Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );

}


const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
  IndividualSub: selectIndividualSub,
  registeredUser: selectRegisteredUser
})

const mapDispatchToProps = dispatch => ({
  setProgress: value => dispatch(setProgress(value)),
  setIsHome: value => dispatch(setIsHome(value)),
  setSubscriptionType: value => dispatch(setSubscriptionType(value)),
  setIndividualSub: value => dispatch(setIndividualSub(value)),
  setRegisteredUser: value => dispatch(setRegisteredUser(value)),
  setUserStatus: value => dispatch(setUserStatus(value)),
  setUserRole: value => dispatch(setUserRole(value)),
  setCompanyDetails: object => dispatch(setCompanyDetails(object)),
  setCurrentUser: value => dispatch(setCurrentUser(value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscription));
