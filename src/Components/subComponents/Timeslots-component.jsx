/*jshint esversion: 6*/
import React from "react";
import moment from 'moment';
import {Container} from 'react-bootstrap';

function GetTimeslots(props){

  function getTimeStops(start, end){
    var startTime = moment(start, 'HH:mm');
    var endTime = moment(end, 'HH:mm');

    if( endTime.isBefore(startTime) ){
      endTime.add(1, 'day');
    }

    // var timeSlotStart = [];
    // var timeSlotEnd = [];
    var timeSlots = [];
    while(startTime <= endTime){
      var Start = new moment(startTime).format('HH:mm').toString();
      var End = new moment(startTime.add(1,'hour')).format('HH:mm').toString();
      timeSlots.push(Start+" - "+End);
      startTime.add(30, 'minutes');
    }
    return timeSlots;
  }

  const TimeSlots = getTimeStops(props.startTime,props.endTime);
  return(
<div className="mb-5">
    {TimeSlots.map(slot => (
      <div>
            <hr/>
      <div className="row" style={{paddingLeft:"180px"}}>

      <div className="col-lg-2">
      <input className="form-check-input  mr-2" type="checkbox" value="" id="defaultCheck1"/>
      </div>
      <div className="col-lg-6">
     <p className="h3 ">{slot}</p>
     </div>

     </div>
          <hr/>
     </div>
   ))}
</div>
  );
}

export default GetTimeslots;



// timeSlotStart.push(new moment(startTime).format('HH:mm'));
// timeSlotEnd.push(new moment(startTime.add(1,'hour')).format('HH:mm'));
// timeSlots.push()
// startTime.add(30, 'minutes');
