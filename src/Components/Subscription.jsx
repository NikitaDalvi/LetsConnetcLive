/*jshint esversion:6*/
import React from "react";
import subsIcon from "../Images/subs-icon.png";
import subsCompanyIcon from '../Images/subs-company-icon.png';
import Heading from "./subComponents/page-headings";
import SubscriptionCard from "./subComponents/Subscription-Card";
import {Button,Modal,Form} from 'react-bootstrap';

function Subscription(props){
const [modalShow, setModalShow] = React.useState(false);
const [companyName, setCompanyName] = React.useState('');

const handleChange= event => {
  setCompanyName(event.target.value);
}


  return (
    <div style={{textAlign:"center"}}>
    <br/>
    <Heading text="Your choice is..."/>
    <div className="row" style={{textAlign:"center", width:"90%"}}>
    <div className="col-lg-4" style={{marginLeft:"320px"}}>
    <div className="container subs-container">
      <SubscriptionCard type="Individual" img={subsIcon} price="199" link="/DocumentUpload=Individual" des1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
      des2="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. "/>
          <a><Button variant='login' onClick={()=>{props.subClick("Individual",null)}}>SELECT</Button></a>
</div>
    </div>
    <div className="col-lg-4">
    <div className="container subs-container">
    <SubscriptionCard type="Company" img={subsCompanyIcon} price="10,000" link="/DocumentUpload=Company" des1="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
    des2="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." handleClick={props.SubsSelectionClick}/>
        <a><Button variant='login' onClick={() => setModalShow(true)}>SELECT</Button></a>
</div>
    </div>
</div>



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

    </div>
  );
}


export default Subscription;


//onClick={()=>{props.subClick("Company");}}
