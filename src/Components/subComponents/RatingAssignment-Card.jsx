/*jshint  esversion:6*/
import React from "react";

function RateAssignCard(props){
  return (
    <div class="accordion" id={"accordion"+props.id}>
    <div className="card" style={{width:"18rem"}}>
  <div className="card-body">
    <h5 className="card-title" style={{color:"#82A0F6"}}>{props.name}</h5>
    <div class="card-header" id={"heading"+props.id} style={{backgroundColor:"transparent"}}>
  <h2 class="mb-0">
    <button class="btn " type="button" data-toggle="collapse" data-target={"#collapse"+props.id} aria-expanded="true" aria-controls={"collapse"+props.id}>
      Services served 
    </button>
  </h2>
</div>

<div id={"collapse"+props.id} class="collapse hide" aria-labelledby={"heading"+props.id} data-parent={"#accordion"+props.id}>
  <div class="card-body">
    <ul>
      {
        props.services.map(service => (
        <li>{service}</li>
      ))
    }
    </ul>
  </div>
</div>
<br/>
<div style={{textAlign:"center"}}>
<button type="button" className="btn btn-warning" style={{width:"200px", color:"white"}} onClick={()=>{props.RateService(props.id,props.name);}}>Rate and Review</button>
</div>
</div>
</div>
</div>
  );
}

export default RateAssignCard;
