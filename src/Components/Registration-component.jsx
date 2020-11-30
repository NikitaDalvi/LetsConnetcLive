/*jshint esversion: 6*/
import React from "react";
import Form from "./RegistrationForm";
import Subscription from "./Subscription";
//import CompanyDocumentUpload from "./CompanyDocumentUpload";
import DocumentForm from "./DocumentUpload";
import Message from './nextPage';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {setProgress,setIsHome} from '../redux/user/user-actions';
import {Container,styled,Typography,Button} from '@material-ui/core';
import "react-step-progress-bar/styles.css";
import Progressbar from './subComponents/ProgressBar';
import {Switch, Route} from "react-router-dom";
import MediaQuery from 'react-responsive';


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



//
//  Stage1Click = async (name,email,password,confirmPassword) =>{
//
// if(this.props.type==='Service-Provider'){
//    this.props.setProgress(35);
// }else{
//   this.props.setProgress(50);
// }
//
//
//   // if (password === confirmPassword){
//   //   const registrationData = {
//   //     FullName: name,
//   //     EmailId: email,
//   //     Password:password
//   //   };
//   //
//   //   const userData = await axios.post('https://localhost:44327/api/registerUser',registrationData);
//   //   const userId = userData.data.output.Id;
//   //   if(userId !== null){
//   //     this.setState({currentUserId:userId,
//   //       stage:'2'
//   //       });
//   //   }
//   //
//   //
//   //
//   // }else{
//   //   alert("Both passwords don't match!")
//   // }
//    this.setState({
//       stage:"2"
//     },
//   console.log(this.state));
//
//
// }

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
this.props.setProgress(100);

if(this.props.type==='Service-Provider'){
  this.setState({
    stage:"3",
    registrationType: type
  })
}else{
  this.props.setIshome(true);
  this.props.history.push('/');
}


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


componentDidMount(){
    console.log('called');
this.props.setProgress(0);
}




  render(){
    const{stage, registrationType} = this.state;
    const MyButton =  styled(Button)({
         width:'100px',
         fontSize:'12px',
         background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
         height:'40px',
         color:'white',
         borderRadius:'8px'
     });

     console.log('Registration Component:', this.props.userType)
return(
  <div>
  <br/>
  <br/>
  <br/>
  <Container maxWidth="sm" style={{textAlign:'center',width:'100%'}}>
    <Progressbar type={this.props.userType} progress={this.props.progress} />
</Container>

<br/>
<br/>
<br/>
  <Switch>
    <Route exact path='/Registration/Form' component={Form}/>
    <Route exact path='/Registration/Subscription' component={Subscription}/>
    <Route exact path='/Registration/KYC' component={DocumentForm}/>
    <Route exact path='/Registration/message' component={Message}/>

  </Switch>

  </div>
)

}
  }


const mapStateToProps = ({user}) =>({
  currentUser: user.currentUser,
  progress: user.progress,
  userType:user.userType
})

const mapDispatchToProps = dispatch => ({
  setProgress: value => dispatch(setProgress(value)),
  setIshome: value => dispatch(setIsHome(value))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Registration));

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






    //
    //
    // if(stage === "1"){
    //   return(
    //   <Form type={this.props.type} handleClick={this.Stage1Click}></Form>
    // );}else if(stage === "2"){
    //   return(
    //     <div>
    //     <Subscription subClick={this.SubsSelectionClick}/>
    //     </div>
    //   );
    // }else if(stage === "3"){
    //   if(registrationType === "Individual"){
    //     var SPitem = ["Adhaar Card", "Pan Card", "CA Certificate"];
    //     var Citem = ["Adhaar Card","Pan Card"];
    //     if(this.props.type === 'Service-Provider'){
    //       return(
    //         <DocumentForm handleDocuments={this.uploadDocuments}   items={SPitem} type="Individual"/>
    //       );
    //     }else{
    //         return(
    //       <DocumentForm handleDocuments={this.uploadDocuments}   items={Citem} type="Individual"/>
    //     );
    //     }
    //
    //   }else{
    //     var item = ["Incorporation Certificate/Incorporation proof","Company PAN Card","Udhyog Adhaar","GST certificate" ];
    //     return(
    //       <DocumentForm items={item} type="Company" handleDocuments={this.uploadDocuments} />
    //     );
    //   }
    // }else if(stage==='4'){
    //   return (<Container>
    //     <Typography variant='h5'>Your documents are sent for Verification. <br/> We will inform you through e-mail once done.<br/><br/><span class="h1"> Thank You ! </span></Typography>
    //     <br/>
    //       <a href='/'><MyButton variant='login' onClick={()=>{this.props.setIshome(true);this.props.setProgress(0);}} type="submit" style={{width:"12%"}}>BACK TO HOME</MyButton></a>
    //       <br/>
    //       <br/>
    //       <br/>
    //       <br/>
    //   </Container>);
    // }
