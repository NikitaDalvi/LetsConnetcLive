import React from "react";
import UploadItem from "./subComponents/DocumentUploadItem";
import EmployeeList from "./subComponents/EmployeeList";
import {Typography,makeStyles,Grid,Button,Container} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import {selectUserType} from '../redux/user/user-selector';


function DocumentUpload({userType,history}){

      const SPitem = ["Adhaar Card", "Pan Card", "CA Certificate"];
      const Citem = ["Adhaar Card","Pan Card"];
var Items;
      if(userType === 'Service-Provider'){
         Items =SPitem;
      }else{
         Items =Citem;
      }


  const [incorporationCertificate,setIncorporationCertificate] = React.useState({
    file:null,
    type:5,
    number:''
  });

  const [panCard,setPanCard] = React.useState({
    file:null,
    type:2,
    number:''
  });

  const [udyogAdhar,setUdyogAdhar] = React.useState({
    file:null,
    type:7,
    number:''
  });

  function handleChange(event,id){
    console.log('called');
    const{name,value} = event.target;

    const item = Items.filter((i,index) => {return index === id;});
    console.log(item[0]);


    switch (item[0]) {
      case "Incorporation Certificate/Incorporation proof":
        if(name==='file'){
          let file = event.target.files[0];
          setIncorporationCertificate(prevValue => {
          return {
            ...prevValue,
            file:file
          };
          });

        }else{
          setIncorporationCertificate(prevValue => {
            console.log(prevValue.number);
          return {
            ...prevValue,
            number:value
          };
        });
        }

        break;
        case "Company PAN Card":
          if(name==='file'){
            let file = event.target.files[0];
            setPanCard(prevValue => {
            return {
              ...prevValue,
              file:file
            };
            });
          }else{
            setPanCard(prevValue => {
            return {
              ...prevValue,
              number:value
            };
            });
          }

          break;
          case "Udhyog Adhaar":
            if(name==='file'){
              let file = event.target.files[0];
              setUdyogAdhar(prevValue => {
              return {
                ...prevValue,
                file:file
              };
              });
            }else{
              setUdyogAdhar(prevValue => {
              return {
                ...prevValue,
                number:value
              };
              });
            }

            break;
      default:

    }
    console.log(incorporationCertificate);
  }


  const uploadDocuments = () => {
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

  history.push('/Registration/message');
  }


  const useStyles = makeStyles(theme =>({
    title:{
      textAlign:'center'
    },
    btnUpload:{
      margin: theme.spacing(1),
      width:'200px',
      fontSize:'12px',
      background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
      height:'40px',
      color:'white',
      borderRadius:'8px'
    }
  }));

const classes = useStyles();


  return(
    <Container maxWidth="sm">
        <Typography className={classes.title} variant='h4'>KYC verification</Typography>
        <br/>
        <br/>
               {Items.map((uploadItem,index) => (<UploadItem item={uploadItem}  change={handleChange} id={index}/>))}
    <div style={{textAlign: "center",marginBottom: "10px"}}>
    <a ><Button  className={classes.btnUpload} type="submit" onClick={()=>{uploadDocuments();}}>UPLOAD AND VERIFY</Button></a>
  </div>
    </Container>
  );


}
const mapStateToProps = createStructuredSelector({
  userType: selectUserType
})

export default withRouter(connect(mapStateToProps)(DocumentUpload));


//incorporationCertificate,panCard,udyogAdhar

//   <div className="form-row" style={{paddingLeft:"70px" }}>
//       <label classname="col-lg-3" style={{marginTop:"10px"}}>Document to Upload</label>
//       <select onChange={handleChange}  class="form-control col-lg-6" style={{marginLeft:"40px"}}>
//   <option selected>Choose...</option>
//   {Items.map(listItem => <option>{listItem}</option>)}
// </select>
//
//   </div>


// <div className="form-row" style={{paddingLeft:"70px" }}>
//   <div class="custom-file" style={{width:"87%"}}>
//       <input type="file" class="custom-file-input" id="customFile"/>
//       <label class="custom-file-label" for="customFile" style={{textAlign:"left"}}>Upload {label} here..</label>
//   </div>
// </div>
// <br/>
// <div className="form-row" style={{marginRight:"50px",paddingLeft:"60px", display: type === "true" ? "block" : "none"}}>
//   <div class="custom-file" style={{width:"95%"}}>
//       <input type="file" class="custom-file-input" id="customFile"/>
//       <label class="custom-file-label" for="customFile" style={{textAlign:"left"}}>Upload CA certificate here..</label>
//   </div>
// </div>
// <br/>
