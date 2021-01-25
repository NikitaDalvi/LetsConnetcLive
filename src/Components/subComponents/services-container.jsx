/*jshint esversion:6*/
import React from "react";
import ServiceCard from "./service-card";

function ServiceContainer(props){
    if(props.Services){
  return(
    <div>
    <div className="card-mainContainer">

      {props.Services.map(service => (
      <ServiceCard name={service.name} date={service.date} type={props.type} service1="Service-1" service2="Service-2" time1="10.00 AM-11:00 AM" time2="11:00 AM-12:00 PM"/>
    ))}

    </div>
    </div>
  );
}else{
  return(
    <div className="card-mainContainer">
    </div>
  );
}
}

export default ServiceContainer;

// <ServiceCard name="Saurabh Mane" date="16 April"type={props.type} service1="Service-1" service2="Service-2" time1="10.00 AM-11:00 AM" time2="11:00 AM-12:00 PM"/>
// <ServiceCard name="SaiKiran Bait" date="16 April" type={props.type} service1="Service-1" service2="Service-2" time1="10.00 AM-11:00 AM" time2="11:00 AM-12:00 PM"/>
// <ServiceCard name="Devang Khandhar" date="30 December" type={props.type} service1="Service-1" service2="Service-2" time1="10.00 AM-11:00 AM" time2="11:00 AM-12:00 PM"/>
// <ServiceCard name="Namita Patil" date="3 May" type={props.type} service1="Service-1" service2="Service-2" time1="10.00 AM-11:00 AM" time2="11:00 AM-12:00 PM"/>
