/*jshint esversion:6*/

import React from "react";
import CAcard from "./subComponents/CA-card";
import SelectedCA from "./SelectedCA-component";
import {Container} from 'react-bootstrap';
 import {withRouter} from 'react-router-dom';

class NearbyCA extends React.Component{
  constructor(props){
    super(props);
    this.state={
      stage:"list",
      data: [],
      input:{
        rating:""
      },
      selectedCA:{
        id:"3",
        experience:"2",
        rating:"3.5",
        services:["Taxation","Book Keeping"]
      }
    }

  }


componentDidMount(){
  const CA =[{
    id:"1",
    experience:"3",
    rating:"4",
    services:["Consulting","Accounting"]
  },
  {
    id:"2",
    experience:"5",
    rating:"4.5",
    services:["Financial Advising","Accounting"]
  },
  {
    id:"3",
    experience:"2",
    rating:"3.5",
    services:["Taxation","Book Keeping"]
  },
  {
    id:"4",
    experience:"2",
    rating:"3",
    services:["Consulting","Taxation"]
  }];

  this.setState({
    data: CA
  })
}


handleChange=(event)=>{
  const {name,value} = event.target;
  this.setState(prevState => ({
    ...prevState.input,
    input:{
        ...prevState,
      [name]:value
    }
  }))


}

handleClick = (id) => {
  const CADetails = this.state.data.filter(ca => (
    ca.id === id
  ));

  this.setState({
    selectedCA: CADetails[0],
    stage:"selectedCA"
  })

}

handleBackClick = ()=>{
  this.setState({
    stage:"list"
  });
}

  render(){
    const{data,input}=this.state;

    const  filteredData = data.filter(dat =>
        dat.rating.toLowerCase().includes(input.rating.toLowerCase())
      );


    return(
      <div >
      <Container>
      <div style={{display: this.state.stage==="list"?"":"none"}}>
      <div className="row" style={{marginBottom:"10px"}}>
        <h1 className="display-4 col-lg-4">Nearby CAs</h1>
        <div className="col-lg-4" style={{textAlign:"right",marginTop:"20px",marginLeft:"350px"}}>
        <a className="btn" style={{borderRadius:"5px", border:"1px solid #C104C9"}} onClick={()=>this.props.history.push(`/UserPage/Customer/Dashboard/${this.props.match.params.id}`)} > Dashboard</a>
        </div>
      </div>
      <div className="row">
      <div className="row container col-lg-6" style={{marginBottom:"10px"}}>
        <input type="text" className="form-control col-lg-3 mr-2" placeholder="Latitude"/>
        <input type="text" className="form-control col-lg-3 mr-2" placeholder="Longitude"/>
        <button className="btn login-btn col-lg-2" type=" button">Search</button>
      </div>
      <div className="container col-lg-6 row">
        <p className="h5 col-lg-2 mr-2">Filter:</p>
        <input onChange={this.handleChange} name="rating" type="text" className="form-control col-lg-2" placeholder="Rating"/>
        <span className="col-lg-1 mr-2" style={{fontSize:"24px"}}>/5</span>
      </div>
      </div>
      <p className="lead" style={{fontSize:"16px"}}><b>Note:</b> You can get your co-ordinates from this <a target="_blank" href="/latlong">link</a> and paste them here.</p>
      <hr/>
        <div className="card-mainContainer">
          {
            filteredData.map((ca,index) => (
              <CAcard id={ca.id} experience={ca.experience} rating={ca.rating} services={ca.services} selectCA={this.handleClick}/>
            ))
          }

        </div>
        </div>
  <div style={{display: this.state.stage==="selectedCA"?"":"none"}}>
    <SelectedCA rating={this.state.selectedCA.rating} exp={this.state.selectedCA.experience} services={this.state.selectedCA.services} BackClick={this.handleBackClick}/>
    </div>
</Container>
      </div>
    );
  }
}

export default withRouter(NearbyCA);
