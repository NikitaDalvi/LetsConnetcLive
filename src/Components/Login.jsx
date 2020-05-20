/*jshint esversion: 9*/
import React,{useState} from "react";

//import LoggedInCustomer from "./LoggedInUser-C-component";
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {setCurrentUser} from '../redux/user/user-actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser,selectUserType} from '../redux/user/user-selector';
import {Typography,makeStyles,TextField,Grid,Button,Container} from '@material-ui/core';

function Login(props){

  const [input,setInput] = useState({
    EmailId:"",
    password:""
  })





function handleChange(event){
  const{name,value} = event.target;

  setInput(
    prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
}

// const getResponse = async() => {
//   const res =  await axios.post('https://localhost:44327/api/login/loginUser',input);
//   return res.data.output;
// };

async  function checkValidation(){
  // props.history.push(`/UserPage/ServiceProvider/RatingAndReview`);
 const{setCurrentUser} = props;
const result = await axios.post('https://localhost:44327/api/login/loginUser',input);
const res = result.data.output;
console.log(res);
if(res !== null){
  setCurrentUser(res);
}else{
  console.log('invalid');
}
// .then(res => res.data.output !== null ? setCurrentUser(res.data.output): console.log("invalid"))
// .then(res => console.log(res.data.output.Id));



// console.log(props.currentUser);
//
if(props.currentUser !== null){
  debugger
  if(this.props.userType === 'Service-Provider'){
      props.history.push('/UserPage/ServiceProvider/RatingAndReview');
  }
}


  // if(input.username === "user" && input.password === "password"){
  //   setLogIn(true);
  //   if(userType==="new"){
  //     if(props.type==="Service-Provider"){
  //       setStage("services");
  //     }else if(props.type === "Customer"){
  //         props.history.push(`/UserPage/${props.type}`)
  //     }
  //   }else if (userType==="old") {
  //     if(props.type==="Service-Provider"){
  //       props.history.push(`/UserPage/${props.type}`)
  //     }else if(props.type === "Customer"){
  //         props.history.push(`/UserPage/${props.type}`)
  //     }
  //   }
  // }else{
  //   setLogIn(false);
  // }



}


  const useStyles = makeStyles(theme =>({
    title:{
      textAlign:'center',
    },
    sub:{
      textAlign:'center',

    },
    mainForm:{
      alignContent:'center',
      marginTop:'30px',
      marginBottom:'200px'
    },
    mainGrid:{
      textAlign:'center'
    },
    txtField:{
      width:'50%',
      '&:focus':{
        outlineColor:'#FF5343!important'
      }
    },
    griditem:{
      marginBottom:'15px'
    },
    btnSignIn:{
      width:'200px',
      fontSize:'12px',
      background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
      height:'40px',
      borderTopLeftRadius:'20px',
      borderTopRightRadius:'20px',
      borderBottomLeftRadius:'20px',
      borderBottomRightRadius:'20px',
      color:'white',


      '&:hover':{
        background:'transparent',
        border:'1px solid  #FF5343',
        color:'black',

      }
    },
  }));

  const classes = useStyles();

//if(stage===""){
  return (
    <Container style={{width:"80%",marginTop:'100px'}}>
<Typography className={classes.title} variant='h4'>Sign In</Typography>
  <Typography className={classes.title} variant='subtitle1'>{props.type}</Typography>
  <form  className={classes.mainForm}>
  <Container maxWidth="sm">
  <Grid container className={classes.mainGrid}>
  <Grid item xs={12} className={classes.griditem}>
  <TextField onChange={handleChange} name="EmailId" className={classes.txtField} id="outlined-basic"  label="Username/Email Address" variant="outlined" />
  </Grid>
  <Grid item xs={12} className={classes.griditem}>
  <TextField onChange={handleChange} name="password" className={classes.txtField} id="outlined-basic" type='password'  label="Password" variant="outlined" />
  </Grid>
  <Grid item xs={12} className={classes.griditem}>
  <Button type='button' onClick={checkValidation} className={classes.btnSignIn}>Sign In</Button>
  </Grid>
</Grid>
<a style={{marginLeft:'300px'}}>Forgot Password?</a>
</Container>
</form>

  </Container>
);
// }else if (stage==="services") {
//   return(
//     <div>
//      <ServicesToProvide/>
//      </div>
//   );
//
// }else if(stage==="SPLoggedIn"){
//   return(
//     <div>
//      <UserPage/>
//      </div>
//   );
// }else if(stage==="CLoggedIn"){
//   return(
//     <div>
//      <LoggedInCustomer/>
//      </div>
//   );
// }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userType:selectUserType
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));



// <div className="form-group">
// <label>Username</label>
// <input onChange={handleChange} name="EmailId" className="form-control" type="text" placeholder="Username"/>
// </div>
// <div className="form-group">
// <label>Password</label>
//   <input onChange={handleChange} name="password" className="form-control"type="password" placeholder="Password"/>
// </div>
// <div style={{textAlign: "center",marginBottom: "10px"}}>
//
// <Button variant="login" onClick={checkValidation}>SUBMIT</Button>
//
// </div>
