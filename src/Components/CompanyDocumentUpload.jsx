/*jshint esversion:6*/
import React from "react";
import DocumentForm from "./DocumentUpload";

function CompanyDocument(props){
  var item = ["Incorporation Certificate/Incorporation proof","Company PAN Card","Udhyog Adhaar","GST certificate" ];
  const allDocuments = [];
  function handleDocuments(incorporationCertificate,panCard,udyogAdhar){
    allDocuments.push(incorporationCertificate,panCard,udyogAdhar);
  }
  return(
    <DocumentForm items={item} type="Company" handleDocuments={handleDocuments} uploadDocuments = {()=>{props.uploadDocuments(allDocuments)}}/>
  );

}

export default CompanyDocument;
