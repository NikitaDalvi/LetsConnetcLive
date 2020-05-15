/*jshint esversion: 6*/
import React from "react";
import Form from "./RegistrationForm";
import Subscription from "./Subscription";
//import CompanyDocumentUpload from "./CompanyDocumentUpload";
import DocumentForm from "./DocumentUpload";
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';



class Registration extends React.Component{
  constructor(){
    super();
    this.state={
      stage: "1",
      registrationType:"",
      currentUserId:'',
      incorporationCertificate:{
        file:null,
        type:5,
        number:''
      },
      panCard:{
        file:null,
        type:2,
        number:''
      },
      udyogAdhar:{
        file:null,
        type:7,
        number:''
      },
      allDocuments:[]
        }
  }



 Stage1Click = async (name,email,password,confirmPassword) =>{


  // if (password === confirmPassword){
  //   const registrationData = {
  //     FullName: name,
  //     EmailId: email,
  //     Password:password
  //   };
  //
  //   const userData = await axios.post('https://localhost:44327/api/registerUser',registrationData);
  //   const userId = userData.data.output.Id;
  //   if(userId !== null){
  //     this.setState({currentUserId:userId,
  //       stage:'2'
  //       });
  //   }
  //
  //
  //
  // }else{
  //   alert("Both passwords don't match!")
  // }
   this.setState({
      stage:"2"
    },
  console.log(this.state));


}

SubsSelectionClick = (type,companyName) =>{
  // console.log(this.state.currentUserId);
  // if(this.props.type==='Service-Provider'){
  //   const updatedData ={
  //     Id:this.state.currentUserId,
  //     UserRole: type === 'Individual'? 2:3,
  //     Status:3,
  //     CompanyName:companyName
  //   }
  //   if(type==='Individual'){
  //   axios.post('https://localhost:44327/api/Update_UserRole',updatedData)
  //   .then(
  //     this.setState({
  //       stage:"3",
  //       registrationType: type
  //     },
  //   console.log(this.state))
  // );
  // }else{
  //   axios.post('https://localhost:44327/api/UpdateCompanyName',updatedData)
  //   .then(
  //     this.setState({
  //       stage:"3",
  //       registrationType: type
  //     },
  //   console.log(this.state))
  // );
  // }
  // }

// console.log(companyName);
this.setState({
  stage:"3",
  registrationType: type
},
console.log(this.state))

}

uploadDocuments = () => {
//   const allDocuments = [];
//   let result = null;
//   allDocuments.push(incorporationCertificate,panCard,udyogAdhar);
//   console.log(allDocuments);
//   allDocuments.map(async document => {
//     let formdata = new FormData();
//     formdata.append('Files',document.file);
//                       formdata.append('AddedById','e0e36616-c5f7-4add-8960-06ca80c71b5c');
//                       formdata.append('DocumentType',document.type);
//                       formdata.append('DocumentNumber',document.number);
//     result = await fetch(`https://localhost:44327/api/UploadDocuments/e0e36616-c5f7-4add-8960-06ca80c71b5c/${document.type}/${document.number}`,
//     {
//       method:'POST',
//       body:formdata
//     }
//   );
// let  res = await result.json();
//
//     console.log(res);
//   });

  this.setState({
    stage:'4'
  });
}


  render(){
    const{stage, registrationType} = this.state;

    if(stage === "1"){
      return(
      <Form type={this.props.type} handleClick={this.Stage1Click}></Form>
    );}else if(stage === "2"){
      return(
        <div>
        <Subscription subClick={this.SubsSelectionClick}/>
        </div>
      );
    }else if(stage === "3"){
      if(registrationType === "Individual"){
        var SPitem = ["Adhaar Card", "Pan Card", "CA Certificate"];
        var Citem = ["Adhaar Card","Pan Card"];
        if(this.props.type === 'Service-Provider'){
          return(
            <DocumentForm handleDocuments={this.uploadDocuments}   items={SPitem} type="Individual"/>
          );
        }else{
            return(
          <DocumentForm handleDocuments={this.uploadDocuments}   items={Citem} type="Individual"/>
        );
        }

      }else{
        var item = ["Incorporation Certificate/Incorporation proof","Company PAN Card","Udhyog Adhaar","GST certificate" ];
        return(
          <DocumentForm items={item} type="Company" handleDocuments={this.uploadDocuments} />
        );
      }
    }else if(stage==='4'){
      return (<div className="container messageContainer">
        <p class="h3">Your documents are sent for Verification. <br/> We will inform you through e-mail once done.<br/><br/><span class="h1"> Thank You ! </span></p>
        <br/>
          <a href='/'><Button variant='login' type="submit" style={{width:"12%"}}>BACK TO HOME</Button></a>
      </div>);
    }

}
  }


const mapStateToProps = ({user}) =>({
  currentUser: user.currentUser
})



export default connect(mapStateToProps)(Registration);

//incorporationCertificate,panCard,udyogAdhar

// <div style={{display:this.state.currentUserId !== ''? "none":'',zIndex:'9999',position:'fixed', width:'100%', heigth:"100%"}}>
// <Spinner animation="border" role="status" >
//     <span className="sr-only">Loading...</span>
// </Spinner>
// </div>




    // .then(res => this.setState({currentUserId: res.data.output.Id}))
    // .then(this.state.currentUserId !== ''? console.log(this.state.currentUserId):console.log(this.state.currentUserId));
    // .then( this.state.currentUserId !== ''?  this.setState({
    //     stage:"2"
    //    },
    //  console.log(this.state)) : this.setState({stage:'1'}))
