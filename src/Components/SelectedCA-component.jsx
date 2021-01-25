/*jshint esversion:6*/
import React from "react";
import {Container,Button} from "react-bootstrap";
import {Form,Col} from "react-bootstrap";
import DatePicker from 'react-date-picker';
import Timeslots from './subComponents/Timeslots-component';

class SelectedCA extends React.Component{
  constructor(){
    super();

    this.state={
date:new Date(),
workingDays:[],
startTime:"",
endTime:"",
booked: false
    }
  }

onChange = date => {
  const Date = date.toString().slice(0,15);
  const res = Date.split(' ');
  var day;
    if(res[0] === "Mon"){
      day = "Monday";
    }else if(res[0] === "Tue"){
      day = "Tuesday";
    }else if(res[0] === "Wed"){
      day = "Wednesday";
    }else if(res[0] === "Thu"){
      day = "Thursday";
    }else if(res[0] === "Fri"){
      day = "Friday";
    }else if(res[0] === "Sat"){
      day = "Saturday";
    }else if(res[0] === "Sun"){
      day = "Sunday";
    }

const WorkingDay = this.state.workingDays.filter(DAY => (
  DAY.day === day
))

this.setState({
  startTime: WorkingDay[0].StartTime,
  endTime: WorkingDay[0].EndTime
})

this.setState({
  date:date })

}

componentDidMount(){
  const days =[
    {
      day:"Monday",
      StartTime:"9:00",
      EndTime:"16:00"
    },
    {
      day:"Tuesday",
      StartTime:"9:00",
      EndTime:"16:00"
    },
    {
      day:"Wednesday",
      StartTime:"10:00",
      EndTime:"16:00"
    },
    {
      day:"Thursday",
      StartTime:"9:00",
      EndTime:"18:00"
    },
    {
      day:"Friday",
      StartTime:"9:00",
      EndTime:"16:00"
    }
  ];

  this.setState({
    workingDays: days
  });
}




  render(){
    return(
      <div>
        <Container style={{paddingLeft:"200px"}}>
        <div style={{textAlign:"right"}}>
        <Button variant="flat" onClick={() => {this.props.BackClick();}}>Back to list</Button>
        </div>
          <div className="Availability-Container">
            <p className="display-3" style={{color:"#C104C9"}}>CA</p>
            <br/>
            <hr style={{width:"50%", marginLeft:"180px"}}/>
            <br/>
            <p className="h5 mb-1" style={{paddingLeft:"50px",textAlign:"left",color:"#C104C9"}}>About the CA..</p>
            <div className="row" style={{paddingLeft:"250px"}}>
            <div className="col-lg-3">
            <p className="lead" style={{textAlign:"center", fontSize:"60px"}}>{this.props.rating}<span style={{fontSize:"20px",color:"black"}}>/5</span></p>
            <h6 className="card-subtitle mb-2 ">Rating</h6>
            </div>
            <div className="col-lg-3">
            <p className="lead" style={{textAlign:"center", fontSize:"60px"}}>{this.props.exp}<span style={{fontSize:"20px",color:"black"}}>years</span></p>
            <h6 className="card-subtitle mb-2 ">Experience</h6>
            </div>
            </div>
            <br/>
            <p className="h5 mb-3" style={{paddingLeft:"50px",textAlign:"left",color:"#C104C9"}}>Choose the services you want..</p>
            <Container>
            <Form>
              <Form.Row>
                {this.props.services.map(service => (
                  <Col lg={3}>
                  <div class="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label" for="defaultCheck1">
                    {service}
                    </label>
                  </div>
                  </Col>
                ))}
              </Form.Row>
            </Form>
            </Container>
            <br/>
            <p className="h5 mb-3" style={{paddingLeft:"50px",textAlign:"left",color:"#C104C9"}}>Book your appointment..</p>
            <DatePicker
          onChange={this.onChange}
          value={this.state.date}
          format="dd-MM-yyyy"

        />
        <br/>
        <br/>
          <Timeslots startTime={this.state.startTime} endTime={this.state.endTime}/>

          <Button variant={this.state.booked === false? "login":"normal"} onClick={()=>{this.setState({booked:true})}}>{this.state.booked === false ? "Book" : "Booked!"}</Button>
          </div>

        </Container>

      </div>
    );
  }
}

export default SelectedCA;


// var day = () => {
//   switch (res[0]) {
//     case "Mon":
//       return "Monday";
//       break;
//     case "Tue":
//       return "Tuesday";
//       break;
//     case "Wed":
//       return "Wednesday";
//       break;
//     case "Thu":
//       return "Thursday";
//       break;
//     case "Fri":
//       return "Friday";
//       break;
//     case "Sat":
//       return "Saturday";
//       break;
//     case "Sun":
//       return "Sunday";
//       break;
//     default:
//
//   }
