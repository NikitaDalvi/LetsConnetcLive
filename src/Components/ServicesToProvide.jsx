/*jshint esversion:9*/

import React from "react";
import Heading from "./subComponents/page-headings";
import ServiceItem from "./subComponents/ServiceListItems";
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user-selector';
import {selectDropdownItems,selectServices} from '../redux/service/service-selector';
import {setServiceType,addService,setDropdown,removeService} from '../redux/service/service-actions';



class ServicesProvide extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userId:'',
      Services:{
        Id:'',
        Service:"",
        Fee:"",
      }

    }
  }


 async componentDidMount(){
   if(this.props.currentUser!==null){
     const data = {ServiceProviderId: this.props.currentUser.Id};
     const result = await axios.post('https://localhost:44327/api/GetServiceType',data);
     if(result!= null){
       const serviceTypeId = result.data.output.ServiceTypeId;
       this.props.SetServiceType(serviceTypeId);
       const typeId = {ServiceTypeId: serviceTypeId};
        const dropdownItems = await axios.post('https://localhost:44327/api/GetServices',typeId);
        if(dropdownItems!=null){
          console.log(dropdownItems);
          dropdownItems.data.output.map(item => (this.props.AddToDropdown(item)));
        }
     }else{
       console.log(null);
     }



   }
}


 handleChange = (event) => {
    const{name, value} = event.target;

    this.setState(prevState =>
  (  {
        Services:{
        ...prevState.Services,
        [name]:value
      }
    }
  ))
  }


 handleClick=()=>{
    const services = this.state.Services;
    const existing = this.props.serviceList.find(item => item.Service === services.Service);
    if(existing == null){
          this.props.AddService(services);
    }else{
      alert('This service has already been selected!');
    }

  }

deleteItem=(Service)=>{
  this.props.removeService(Service);
  }

render(){
  return (

    <div style={{textAlign:"center"}}>
    <br/>
      <Heading text="Tell us about services you wish to provide.."/>
      <br/>
      <div className="container Services-Container">
        <div className="form-row pl-5">
        <label className="col-lg-3" style={{marginTop:"10px"}}> You can provide services...</label>
        <div className="col-lg-2">
        <select name='Service' class="form-control" >
        <option>Onsite</option>
        <option>Offshore</option>
        <option>Both</option>
    </select>
    </div>
        </div>
        <hr style={{width:'50%', marginLeft:'180px'}}/>
        <div className="form-row pl-5">
        <label className="col-lg-1" style={{marginTop:"10px"}}> Service</label>
        <div className="col-lg-4">
        <select name='Service' class="form-control" onChange={this.handleChange} value={this.state.Services.Service}>
        <option></option>
        {this.props.dropdownList.map(item => (item !== null ?item.Services != null?<option>{item.Services}</option>:<option></option>:''))}
    </select>
    </div>
        <label className="col-lg-1" style={{marginTop:"10px"}}>Fees</label>
        <div className="col-lg-2">
        <input onChange={this.handleChange} name ="Fee" className="form-control"  type="text" placeholder="&#8377;/hour" value={this.state.Services.Fee}/>
        </div>
        <Button variant='login'  onClick={this.handleClick} className=" col-lg-1" style={{marginLeft:"20px"}}> Add </Button>
        </div>
        <br/>
        <table className="table service-table">
          <thead style={{color:"#4B66EA"}}>
            <th scope="col">#</th>
            <th scope="col">Service</th>
            <th scope="col">Fees/hr</th>
            <th scope="col"></th>
          </thead>
          <tbody>
          {
            this.props.serviceList.map((serviceItem, index) => (
              <ServiceItem key={index} id={index+1} service={serviceItem} Name={serviceItem.Service} Fee={serviceItem.Fee} isClicked={this.deleteItem}/>
            ))
          }
          </tbody>
        </table>
        <br/>
        <Link to="/UserPage/ServiceProvider/Availability" style={{textDecoration: "none"}}>
        <a><Button variant='login'  type="submit">Next</Button></a>
        </Link>
      </div>
    </div>

  );
}

}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  dropdownList:selectDropdownItems,
  serviceList:selectServices
})

const mapDispatchToProps = dispatch => ({
  SetServiceType : serviceType =>dispatch(setServiceType(serviceType)),
  AddService : service => dispatch(addService(service)),
  AddToDropdown: service => dispatch(setDropdown(service)),
  removeService: service => dispatch(removeService(service))
})

export default connect(mapStateToProps,mapDispatchToProps)(ServicesProvide);
