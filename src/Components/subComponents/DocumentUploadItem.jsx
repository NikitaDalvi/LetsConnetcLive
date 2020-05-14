import React,{useState} from "react";
//import Input from "./Input"

function UploadItem(props){




  return(
    <div>
    <div className="form-row" style={{paddingLeft:"70px" }}>
      <div class="custom-file" style={{width:"87%"}}>
          <input onChange={(event)=>{props.change(event,props.id);}} type="file" name='file' class="custom-file-input" id="customFile"/>
          <label id={"document"+props.id} class="custom-file-label" for="customFile" style={{textAlign:"left"}}>Upload {props.item} here..</label>
      </div>
      <br/>
      <br/>
    </div>
    <div className="form-row" style={{paddingLeft:"70px", width:"80%", display: props.isChanged===props.id? "":"none" }}>
      <label>{props.item} Number:</label>
          <input className="form-control" onChange={(event)=>{props.change(event,props.id);}} type="text" name='number' placeholder="Type number here.."/>
          <br/>
    </div>
    <br/>
    <br/>
    </div>

  );
}

export default UploadItem;
//  document.getElementById({props.index}).innerText = newValue;
