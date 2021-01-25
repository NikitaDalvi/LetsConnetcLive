/*jshint esversion: 6*/
import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import RatingAssignCard from "./subComponents/RatingAssignment-Card";
import RatingCard from "./subComponents/RatingAndReview-card";
import {Container} from 'react-bootstrap';
 import {withRouter} from 'react-router-dom';

class RatingCustomer extends React.Component{
  constructor(){
    super();
    this.state={
      Data:[],
      RatingData:[],
      ModalId:"",
      show:false,
      ModalName:"",
      stage:"new",
      BtnText:"Past Ratings >"
    };
  }


  componentDidMount(){
    const CA = [
      {
        name:"Saurabh Mane",
        services:["Financial Advising","Accounting"]
      },
      {
        name:"Devang Khandhar",
        services:["Book Keeping","Consultion"]
      },
      {
        name:"Saikiran Bait",
        services:["Technical consulting"]
      },
      {
        name:"Namita Patil",
        services:["Accounting", "Taxation"]
      }
    ];

    const Ratings = [
      {
        name:"Rahul Patil",
        rating:"4",
        review:"The Service-Provider was good and efficient."
      },
      {
        name:"Sandeep Jagtap",
        rating:"4.5",
        review:"The Service-Provider was good and efficient."
      },
      {
        name:"Rohan Naik",
        rating:"4.2",
        review:"The Service-Provider was good and efficient."
      },
      {
        name:"Vidhi Roy",
        rating:"3.5",
        review:"The Service-Provider was good and efficient."
      }
    ]


    this.setState({
      Data: CA,
      RatingData: Ratings
    })

  }

ClickToRate = (id,name) =>{
  this.setState({
    ModalId: id,
    ModalName:name
  })
this.setState({show:true});

}

StageToggle = (event) => {
  if(this.state.BtnText === "Past Ratings >"){
    this.setState({
      BtnText: "< New Ratings",
      stage:"old"
    });
  }else{
    this.setState({
      BtnText: "Past Ratings >",
      stage:"new"
    });
  }
};


  render(){
    const handleClose = () => this.setState({show:false});

    return(
      <div>
      <Container>
      <div className="row ">
        <h1 className="display-4 col-lg-4">Ratings</h1>
        <div className="col-lg-4  ">
        <button className="btn mt-4" style={{borderRadius:"5px", border:"1px solid #C104C9"}} onClick={this.StageToggle}>{this.state.BtnText}</button>
        </div>
        <div className="col-lg-4" style={{textAlign:"right",marginTop:"20px"}}>
        <a className="btn" style={{borderRadius:"5px", border:"1px solid #C104C9"}} onClick={()=>this.props.history.push(`/UserPage/Customer/Dashboard/${this.props.match.params.id}`)}>Back to Dashboard</a>
        </div>
      </div>
        <hr/>
        <div className="card-mainContainer">
          {
            this.state.stage === "new"?
            this.state.Data.map((data,index) => (
            <RatingAssignCard id={index} name={data.name} services={data.services} RateService={this.ClickToRate}/>
          )):
          this.state.RatingData.map(data => (
            <RatingCard name={data.name} rating={data.rating} review={data.review}/>
          ))
}
        </div>

      </Container>
      <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton style={{backgroundColor:"#C104C9",color:"white"}}>
            <Modal.Title>Rate & Review: {this.state.ModalName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="row">
                <label className="col-lg-2">Rate:</label>
                <input type="text" className="form-control col-lg-1 mr-1" />
                <span style={{fontSize:"25px"}}>/5</span>
              </div>
              <br/>
              <div className="row">
                <label className="col-lg-2">Review:</label>
                <input type="text" className="form-control col-lg-9 mr-1" placeholder={"How do you like "+this.state.ModalName+"..."}/>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={handleClose}>
              Close
            </Button>
            <Button style={{border:"1px solid #C104C9", backgroundColor:"white", color: "black"}} onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(RatingCustomer);
