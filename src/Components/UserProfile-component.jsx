/*jshint esversion: 6*/

import React from "react";
import userIcon from "../Images/user.jpg";
import DatePicker from 'react-date-picker';
import {Container} from 'react-bootstrap'

class UserProfile extends React.Component{
  constructor(){
    super();
    this.state={
      date:new Date()
    }
  }

onChange = date => this.setState({ date })

  render(){
    return(
    <div>
    <Container>
    <a className="btn" style={{borderRadius:"5px", border:"1px solid #C104C9", marginLeft:"800px"}} href={"/UserPage/ServiceProvider/Dashboard"}>Back to Dashboard</a>
      <div className=" profile-container" style={{marginLeft:"300px"}}>
        <div style={{textAlign:"center"}}>
          <img alt="img" src={userIcon} className="ProfilePicture"/>
          <br/>
          <br/>
          <br/>
          <div style={{textAlign:"center"}}>
          <form style={{paddingLeft:"60px"}}>
            <input type="text" className="form-control col-lg-10" name="Name" placeholder="Fullname"/>
            <br/>
            <input type="text" className="form-control col-lg-10" name="Name" placeholder="Email ID"/>
            <br/>
            <input type="text" className="form-control col-lg-10" name="Name" placeholder="Mobile Number"/>
            <br/>
            <select className="form-control col-lg-6" name="Name">
              <option selected>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <br/>
            <div className="row">
            <label className="col-lg-4">Date of Birth</label>
            <div className="col-lg-5" style={{textAlign:"left"}}>
            <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
          </div>
            </div>
            <br/>
            <input type="text" className="form-control col-lg-10" name="Name" placeholder="Address"/>
            <br/>
            <input type="text" className="form-control col-lg-6" name="Name" placeholder="Pincode"/>
            <br/>
            <div style={{paddingRight:"50px"}}>
            <button className="btn login-btn" type="Submit" >Update</button>
            </div>
          </form>
          </div>
        </div>
      </div>
      </Container>
      </div>
    );
  }
}

export default UserProfile;
