/*jshint esversion: 6*/
import React from "react";
import DocumentUpload from "./DocumentUpload.jsx"

function IndividualUpload(props){
      return(
        <DocumentUpload items={props.items} type="individual"/>
      );

}
