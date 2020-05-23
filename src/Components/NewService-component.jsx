/*jshint esversion:6*/

import React from "react";
import ServiceContainer from "./subComponents/services-container";
import {Container} from 'react-bootstrap';

class New extends React.Component{
  constructor(){
    super();
    this.state={
      services:[],
      Date: ""
    }
  }

  componentDidMount(){
    const data = [{
      id:"1",
      name:"Saurabh Mane",
      date: "16 April"
    },{
      id:"2",
      name:"Saikiran Bait",
      date:"16 April"
    },{
      id:"3",
      name:"Devang Khandhar",
      date:"30 December"
    },
  {
    id:"4",
    name:"Namita Patil",
    date:"3 May"
  }];

  this.setState({services:data})

  }

  render(){
    const{services,Date} = this.state;
    const filteredServices = services.filter(service =>
      service.date.toLowerCase().includes(Date.toLowerCase())
    );
    return(
      <div >
        <Container>
    
        </Container>
      </div>
    );
  }

}

export default New;



// <div className="row">
//   <h1 className="display-4 col-lg-4">New</h1>
//   <div className='col-lg-4' style={{marginTop:"20px"}}>
//       <input type="text" className="form-control " placeholder="Search By Date" onChange={e => this.setState({Date:e.target.value}) }/>
// </div>
//   <div className="col-lg-4" style={{textAlign:"right",marginTop:"20px"}}>
//   <a className="btn" style={{borderRadius:"5px", border:"1px solid #4B66EA"}} href={"/UserPage/Service-Provider"}>Back to Dashboard</a>
//   </div>
// </div>
//   <hr/>
//   <ServiceContainer Services={filteredServices}  type="new"/>
