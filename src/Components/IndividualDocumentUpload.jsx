import React from "react";
import DocumentForm from "./DocumentUpload";

function CustomerDocument(props){
  var SPitem = ["Adhaar Card", "Pan Card", "CA Certificate"];
  var Citem = ["Adhaar Card","Pan Card"];
  if(props.type === "Service-Provider"){
  return(
    <DocumentForm  items={SPitem} type="Individual"/>
  );
}else{
  return(
    <DocumentForm  items={Citem} type="Individual"/>
  );
}
}

export default CustomerDocument;
