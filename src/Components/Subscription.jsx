/*jshint esversion:6*/
import React, { useState, useEffect } from "react";
import singleUser from "../Images/Single-User.png";
import corporateUser from '../Images/Corporate-User.png';
import Heading from "./subComponents/page-headings";
import SubscriptionCard from "./subComponents/Subscription-Card";
import {Modal,Form} from 'react-bootstrap';
import {Typography,makeStyles,Grid,Button,Container,CircularProgress,Backdrop} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {selectUserType,selectIndividualSub,selectRegisteredUser} from '../redux/user/user-selector';
import {setProgress,setIsHome,setSubscriptionType,setIndividualSub,setRegisteredUser,setUserStatus,setUserRole,setCompanyDetails,setCurrentUser} from '../redux/user/user-actions';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';



function loadRazorPay(src){
  return new Promise((resolve)=> {
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


function Subscription(props){
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
const [modalShow, setModalShow] = useState(false);
const [companyName, setCompanyName] = useState('');
const {setIndividualSub} = props;
const [paymentSuccess,setPaymentSuccess] = useState(false);
//
const [loading, setLoading] = useState(false);
const [initialData, setinitialData] = useState({});
const [company,setCompany] = useState({});
const [selectedSub,setSelectedSub] = useState('');
//
const handleChange= event => {
  setCompanyName(event.target.value);
};

const{userType,setProgress,registeredUser,setCurrentUser} = props;

useEffect(() => {
setLoading(true);
  // function getIndividualSub(){
  //   return  axios.get('http://letnetworkdev.obtainbpm.com/api/getSubscription/0');
  // }
  //  getIndividualSub().then(result => {
  //    setinitialData(result.data.output[0]);
  //    // setIndividualSub(result.data.output[0]);
  //  });
  // setIndividualSub(IndividualSub.data.output);
if(userType === 'Service-Provider'){
  setProgress(50);
}else{
  setProgress(100)
;}
const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

  const fetchData = () => {
    if(registeredUser){
      const ticket = registeredUser.Ticket;
      axios.post(`https://localhost:44327/api/GetActiveSubscription`,ticket)
        .then(res =>    { console.log(res);
          if(userType === 'Service-Provider'){
            const individual = res.data.output.find(sub => sub.SubscriptionType === 1);
            const corporate =  res.data.output.find(sub => sub.SubscriptionType === 2);
            setinitialData(individual);
            setCompany(corporate);
            setLoading(false);
          }else{
            const individual = res.data.output.find(sub => sub.SubscriptionType === 3);
            const corporate =  res.data.output.find(sub => sub.SubscriptionType === 4);
            setinitialData(individual);
            setCompany(corporate);
            setLoading(false);
          }
          // axios.get(`https://localhost:44327/api/getSubscription/0`)
          //       .then((res) => {
          //           setinitialData(res.data);
          //           axios.get(`https://localhost:44327/api/getSubscription/1`)
          //             .then((res) => {
          //               setCompany(res.data);
          //               if(res.data.responseCode === 200){
          //                 setLoading(false);
          //               }else{
          //                 console.log(res.data.responseCode);
          //               }
          //             });
          //       });
              });
    }

          };
          fetchData();
},[userType,setProgress,registeredUser])





  const useStyles = makeStyles(theme =>({
    btnSelect:{
      margin: theme.spacing(1),
      width:'100px',
      fontSize:'12px',
      background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
      height:'40px',
      color:'white',
      borderRadius:'8px'
    },
    backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  }));

  const classes = useStyles();

  const SubsSelectionClick = (type,companyName) =>{
    var updatedData;
    debugger
    if(props.userType==='Service-Provider'){
       updatedData ={
        Id:props.registeredUser.Id,
        UserRole: type === 'Individual'? 2:6,
        Status:2,
        CompanyName:companyName,
        Ticket:registeredUser.Ticket
      }

    }else{
      updatedData ={
       Id:props.registeredUser.Id,
       UserRole: type === 'Individual'? 4:5,
       Status:6,
       CompanyName:companyName,
       Ticket:registeredUser.Ticket
     }
    }
    if(type==='Individual'){
    updateUserRole(updatedData)
    .then(res => {
      if(res.data.responseCode === 200){
      userType === 'Service-Provider'?props.setUserStatus(2):props.setUserStatus(6);
        userType === 'Service-Provider'?props.setUserRole(2):props.setUserRole(4);
      }
    });
  }else{
    updateCompanyDetails(updatedData)
    .then(res=>{
      if(res.data.responseCode === 200){
        userType === 'Service-Provider'?props.setUserStatus(2):props.setUserStatus(6);
      userType === 'Service-Provider'?props.setUserRole(6):props.setUserRole(5);
        const details ={
          companyName:updatedData.CompanyName,
          companyId:res.data.output
        };
        props.setCompanyDetails(details);

      }
    });
  }
  setLoading(false);
if(userType === 'Service-Provider'){
  props.history.push('/Registration/KYC');
}else{
  setCurrentUser(registeredUser);
  props.history.push('/UserPage/Customer/Dashboard');
}
  // console.log(companyName);
//   props.setProgress(100);
// props.setSubscriptionType(type);
//   if(props.userType==='Service-Provider'){
//     props.history.push('/Registration/KYC');
//   }else{
//     props.setRegisteredUser(null);
//     props.setIsHome(true);
//     props.history.push('/');
//   }
}

async function updateUserRole(data){
  const result = await axios.post('https://localhost:44327/api/Update_UserRole',data);
  return result;
}

async function updateCompanyDetails(data){
  const result = await axios.post('https://localhost:44327/api/UpdateCompanyName',data);
  return result;
}


async function displayRazorPay(type){

  var data = null;
  if(type==="Individual"){
       data = await axios.post(`https://localhost:44327/api/razorPay/${initialData.Price}`);
  }else{
    data = await axios.post(`https://localhost:44327/api/razorPay/${company.Price}`);
  }

    const result = data.data.output.Attributes;
   const __DEV__ = document.domain === 'localhost';
   console.log(data);
   const  options = {
    "key": __DEV__? 'rzp_test_4WUuA0rfz1EeJX':'production_key',
    "amount": result.amount,
    "currency": result.currency,
    "name": "Subscription Purchase",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "order_id": result.id,
    "handler": function (response){
        console.log(response);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        if(response){
          setLoading(true);
          const subscriptionDetails = {
            UserId:registeredUser.Id,
            SubscriptionDiscountId: type==='Individual'?initialData.DiscountId:company.DiscountId,
            SubscriptionPricingHistoryId:type==='Individual'?initialData.HistoryId:company.HistoryId,
            StartDate: new Date().toDateString(),
            EndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toDateString(),
          }

          const paymentDetails = {
            RazorPaymentId:response.razorpay_payment_id,
            OrderId:response.razorpay_order_id,
            PaymentSignature:response.razorpay_signature,
            Amount:result.amount/100,
            PaidFor:1,
          }

          const request ={
            SubscriptionDetails: subscriptionDetails,
            Ticket: registeredUser.Ticket,
            PaymentDetails: paymentDetails
          };
          //data = await axios.post(`https://localhost:44327/api/razorPay/${initialData.Price}`);
          console.log(request);
          saveSubscription(request)
          .then(res => {
            if(res=== true){
              type==='Individual'?SubsSelectionClick(type,null):SubsSelectionClick(type,companyName);
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

async function saveSubscription(data){
  const result = await axios.post('https://localhost:44327/api/SaveSubscription',data);
  return result.data.output;
}




  return (
    <div>
    <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
    <div style={{paddingLeft:"center"}}>

    <Container style={{textAlign:"center"}}>
    <br/>
    <Typography variant='h4'>Choose your plan</Typography>
<br/>
<br/>
    <Grid container style={{textAlign:'center',paddingLeft:isMobile?'':'180px'}} >
      <Grid itemn xs={isMobile?12:5}>
      <SubscriptionCard type='Individual' img={`http://letnetworkdev.obtainbpm.com${initialData.ImagePath}`} price={initialData.Price} discount={initialData.DiscountPercentage} link="/DocumentUpload=Individual" description={initialData.Description}/>
      <a><Button className={classes.btnSelect} onClick={()=>{displayRazorPay("Individual");}}>SELECT</Button></a>
      </Grid>
      <Grid item xs={isMobile?12:5}>
      <SubscriptionCard type='Corporate' img={`http://letnetworkdev.obtainbpm.com${company.ImagePath}`} price={company.Price} discount={initialData.DiscountPercentage} link="/DocumentUpload=Company" description={company.Description} handleClick={props.SubsSelectionClick}/>
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
    <Modal.Body style={{textAlign:'center'}}>
    <Form style={{textAlign:'center',paddingLeft:'50px'}}>
  <Form.Group controlId="formBasicEmail" style={{width:'80%'}}>
    <Form.Label>Company Name</Form.Label>
    <Form.Control type="text" value={companyName} onChange={handleChange} />
  </Form.Group>
  </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='login' style={{marginRight:isMobile?'100px':'50px', width:'60%'}} onClick={props.onHide} onClick={()=>{setModalShow(false);displayRazorPay("Company");}}>UPDATE</Button>
    </Modal.Footer>
  </Modal>
</Container>
<br/>
<br/>
<br/>
<br/>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Subscription));

//onClick={()=>{SubsSelectionClick("Individual",null);}}

// <div className="row" style={{textAlign:"center", width:"90%"}}>
// <div className="col-lg-4" style={{marginLeft:"320px"}}>
// <div className="container subs-container">
//   <SubscriptionCard type="Individual" img={subsIcon} price="199" link="/DocumentUpload=Individual" des1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
//   des2="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. "/>
//       <a><Button variant='login' onClick={()=>{props.subClick("Individual",null)}}>SELECT</Button></a>
// </div>
// </div>
// <div className="col-lg-4">
// <div className="container subs-container">
// <SubscriptionCard type="Company" img={subsCompanyIcon} price="10,000" link="/DocumentUpload=Company" des1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
// des2="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." handleClick={props.SubsSelectionClick}/>
//     <a><Button variant='login' onClick={() => setModalShow(true)}>SELECT</Button></a>
// </div>
// </div>
//
// </div>

//onClick={()=>{props.subClick("Company");}}
