/*jshint esversion:6*/
import React, { useState, useEffect } from "react";
import singleUser from "../Images/Single-User.png";
import corporateUser from '../Images/Corporate-User.png';
import Heading from "./subComponents/page-headings";
import SubscriptionCard from "./subComponents/Subscription-Card";
import {Modal,Form} from 'react-bootstrap';
import {Typography,makeStyles,Grid,Button,Container} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {selectUserType,selectIndividualSub,selectRegisteredUserId} from '../redux/user/user-selector';
import {setProgress,setIsHome,setSubscriptionType,setIndividualSub} from '../redux/user/user-actions';
import axios from 'axios';

function Subscription(props){
const [modalShow, setModalShow] = useState(false);
const [companyName, setCompanyName] = useState('');
const {setIndividualSub} = props;

//
const [loading, setLoading] = useState(true);
const [initialData, setinitialData] = useState({});
const [company,setCompany] = useState({});

//
const handleChange= event => {
  setCompanyName(event.target.value);
};


useEffect(() => {
  // function getIndividualSub(){
  //   return  axios.get('http://letnetworkdev.obtainbpm.com/api/getSubscription/0');
  // }
  //  getIndividualSub().then(result => {
  //    setinitialData(result.data.output[0]);
  //    // setIndividualSub(result.data.output[0]);
  //  });
  // setIndividualSub(IndividualSub.data.output);

  const fetchData = () => {
              axios.get(`https://localhost:44327/api/getSubscription/0`)
                  .then((res) => {
                      setinitialData(res.data);
                      axios.get(`https://localhost:44327/api/getSubscription/1`)
                        .then((res) => {
                          setCompany(res.data);
                          if(res.data.responseCode === 200){
                            setLoading(false);
                          }else{
                            console.log(res.data.responseCode);
                          }
                        })
                  });
          };
          fetchData();
},[])


if (!loading) {
    console.log("initialData:",company);
    console.log("SubscriptionFeatures:",company.output[0].SubscriptionFeatures );
    console.log("SubscriptionFeatures[1]:",company.output[0].SubscriptionFeatures[1] );
}


  const useStyles = makeStyles(theme =>({
    btnSelect:{
      margin: theme.spacing(1),
      width:'100px',
      fontSize:'12px',
      background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
      height:'40px',
      color:'white',
      borderRadius:'8px'
    }
  }));

  const classes = useStyles();

  const SubsSelectionClick = (type,companyName) =>{
    if(props.userType==='Service-Provider'){
      const updatedData ={
        Id:props.registeredUserId,
        UserRole: type === 'Individual'? 2:3,
        Status:3,
        CompanyName:companyName
      }
      if(type==='Individual'){
      axios.post('https://localhost:44327/api/Update_UserRole',updatedData);
    }else{
      axios.post('https://localhost:44327/api/UpdateCompanyName',updatedData);
    }
    }

  // console.log(companyName);
  props.setProgress(100);
props.setSubscriptionType(type);
  if(props.userType==='Service-Provider'){
    props.history.push('/Registration/KYC');
  }else{
    props.setIsHome(true);
    props.history.push('/');
  }
}


if(!loading){
  return (
    <div style={{paddingLeft:"center"}}>
    <Container style={{textAlign:"center"}}>
    <br/>
    <Typography variant='h4'>Choose your plan</Typography>
<br/>
<br/>
    <Grid container style={{textAlign:'center',paddingLeft:'180px'}} >
      <Grid itemn xs={5}>
      <SubscriptionCard type={initialData.output[0].Name} img={singleUser} price={initialData.output[0].Amount} link="/DocumentUpload=Individual" description={initialData.output[0].SubscriptionFeatures}/>
      <a><Button className={classes.btnSelect} onClick={()=>{SubsSelectionClick("Individual",null);}}>SELECT</Button></a>
      </Grid>
      <Grid item xs={5}>
      <SubscriptionCard type={company.output[0].Name} img={corporateUser} price={company.output[0].Amount} link="/DocumentUpload=Company" description={company.output[0].SubscriptionFeatures} handleClick={props.SubsSelectionClick}/>
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
      <Button variant='login' style={{marginRight:'50px', width:'60%'}} onClick={props.onHide} onClick={()=>{SubsSelectionClick("Company",companyName);}}>UPDATE</Button>
    </Modal.Footer>
  </Modal>
</Container>
<br/>
<br/>
<br/>
<br/>
    </div>
  );
}else{
  return(
    <div>
    </div>
  )
}

}


const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
  IndividualSub: selectIndividualSub,
  registeredUserId: selectRegisteredUserId
})

const mapDispatchToProps = dispatch => ({
  setProgress: value => dispatch(setProgress(value)),
  setIsHome: value => dispatch(setIsHome(value)),
  setSubscriptionType: value => dispatch(setSubscriptionType(value)),
  setIndividualSub: value => dispatch(setIndividualSub(value))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Subscription));



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
