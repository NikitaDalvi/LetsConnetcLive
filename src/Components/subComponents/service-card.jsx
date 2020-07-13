/*jshint esversion:6*/
import React from "react";
import {Button} from 'react-bootstrap'

function ServiceCard(props){
  const [service,setService] = React.useState('incomplete');


    return(
      <div className="card" style={{width:"18rem"}}>
    <div className="card-body">
        <h5 className="card-title " >{props.date}</h5>
      <h5 className="card-title " style={{color:"#82A0F6"}}>{props.name}</h5>
      <div style={{display:"grid",gridTemplateColumns:"0.5fr 1fr",gridGap:"5px"}}>
      <h6 className="card-subtitle mb-2 text-muted">Services</h6>
      <ul >
        <li className="card-text">{props.service}</li>
      </ul>
      </div>
      <hr/>
      <div style={{display:"grid",gridTemplateColumns:"0.5fr 1fr",gridGap:"5px"}}>
      <h6 className="card-subtitle mb-2 text-muted">Time slots</h6>
      <ul style={{marginTop:"5px"}}>
        {props.timeslots.map(item => <li className="card-text">{item.StartTime} - {item.EndTime}</li>)}
      </ul>

    </div>
    <div style={{display:props.status===3?"":"none", textAlign:"center"}}>
        <a href="#" className="card-link btn btn-success">Accept</a>
        <a href="#" className="card-link btn btn-danger">Decline</a>
    </div>
    <div style={{display:props.type==="today"?"":"none", textAlign:"center"}}>
        <Button variant={service==='incomplete'?'ServiceCard':'ServiceCardReverse'} onClick={()=>{setService('complete')}}>{service==='incomplete'?'COMPLETE':'COMPLETED!'}</Button>
    </div>
  </div>
  </div>
    );


}

export default ServiceCard;
