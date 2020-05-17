import React from "react";
import UploadItem from "./subComponents/DocumentUploadItem";
import EmployeeList from "./subComponents/EmployeeList";
import {Typography,makeStyles,Grid,Button,Container} from '@material-ui/core';



function DocumentUpload(props){
  var Items =props.items;

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
    <a ><Button  className={classes.btnUpload} type="submit" onClick={()=>{props.handleDocuments();}}>UPLOAD AND VERIFY</Button></a>
  </div>
    </Container>
  );


}


export default DocumentUpload;


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
