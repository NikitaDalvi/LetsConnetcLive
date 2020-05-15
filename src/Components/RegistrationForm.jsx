/*jshint esversion: 6*/
import React,{useState} from "react";
import {Link} from "react-router-dom";
import {Typography,makeStyles,TextField,Grid,Button,Container} from '@material-ui/core';

function RegistrationForm(props){


  const[inputText,setInput] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  });


  function handleChange(event){
    const {name,value} = event.target;
    setInput(prevValue =>{
      return{
      ...prevValue,
      [name]:value}
    });
  }

    const useStyles = makeStyles(theme =>({

    }));

const classes = useStyles();
const {name, email, password, confirmPassword} = inputText;

  return(
    <div>
      <Container>
      <Grid Container spacing={3}>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
        </Grid>
      </Grid>

</Container>
<br/>
<br/>
<br/>
<br/>
<br/>
    </div>
  );
}

export default RegistrationForm;

// <div className=" professional-container">
//
//   <h1 className="login-title">Registration</h1>
//     <p style={{fontWeight:"bold", textAlign:"center", color:"#4B66EA"}}>{props.type}</p>
//  <br/>
//  <div className="form-group" >
//    <div className="row prof-reg-row" style={{paddingLeft:"70px"}}>
//      <label className="col-lg-3"> Name</label>
//      <div className="col-lg-7">
//        <input name='name' className="form-control" type="text" value={inputText.name} onChange={handleChange} placeholder="Full Name"/>
//      </div>
//    </div>
//    <div className="row prof-reg-row" style={{paddingLeft:"70px"}}>
//      <label className="col-lg-3"> Email</label>
//      <div className="col-lg-8">
//        <input name='email' className="form-control" type="text" value={inputText.email} onChange={handleChange} placeholder="Email Id"/>
//      </div>
//    </div>
//    <div className="row prof-reg-row" style={{paddingLeft:"70px"}}>
//      <label className="col-lg-3"> Password</label>
//      <div className="col-lg-7">
//        <input name='password' className="form-control" type="password" value={inputText.password} onChange={handleChange} placeholder="Password"/>
//      </div>
//    </div>
//    <div className="row prof-reg-row" style={{paddingLeft:"70px"}}>
//      <label className="col-lg-3"> </label>
//      <div className="col-lg-7">
//        <input name='confirmPassword' className="form-control" type="password" value={inputText.confirmPassword} onChange={handleChange} placeholder="Confirm Password"/>
//      </div>
//    </div>
//    <br/>
//    <div style={{textAlign: "center",marginTop:"30px"}}>
//    <a><Button  variant='login' onClick={()=>{props.handleClick(name,email,password,confirmPassword)}}>REGISTER</Button></a>
//  </div>
//  </div>
// </div>
