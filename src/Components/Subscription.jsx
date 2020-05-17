/*jshint esversion:6*/
import React from "react";
import singleUser from "../Images/Single-User.png";
import corporateUser from '../Images/Corporate-User.png';
import Heading from "./subComponents/page-headings";
import SubscriptionCard from "./subComponents/Subscription-Card";
import {Modal,Form} from 'react-bootstrap';
import {Typography,makeStyles,Grid,Button,Container} from '@material-ui/core';

function Subscription(props){
const [modalShow, setModalShow] = React.useState(false);
const [companyName, setCompanyName] = React.useState('');

const handleChange= event => {
  setCompanyName(event.target.value);
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

  return (
    <div style={{paddingLeft:"center"}}>
    <Container style={{textAlign:"center"}}>
    <br/>
    <Typography variant='h4'>Choose your plan</Typography>
<br/>
<br/>
    <Grid container style={{textAlign:'center',paddingLeft:'180px'}} >
      <Grid itemn xs={5}>
      <SubscriptionCard type="Individual" img={singleUser} price="199" link="/DocumentUpload=Individual" des1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    des2="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. "/>
      <a><Button className={classes.btnSelect} onClick={()=>{props.subClick("Individual",null)}}>SELECT</Button></a>
      </Grid>
      <Grid item xs={5}>
      <SubscriptionCard type="Company" img={corporateUser} price="10,000" link="/DocumentUpload=Company" des1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
      des2="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." handleClick={props.SubsSelectionClick}/>
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
      <Button variant='login' style={{marginRight:'50px', width:'60%'}} onClick={props.onHide} onClick={()=>{props.subClick("Company",companyName);}}>UPDATE</Button>
    </Modal.Footer>
  </Modal>
</Container>
<br/>
<br/>
<br/>
<br/>
    </div>
  );
}


export default Subscription;



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
