/*jshint esversion: 6*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, makeStyles, TextField, Grid, Button, Container, MenuItem, Select, FormControl, InputLabel, Checkbox } from '@material-ui/core';
import RegistrationLogo from '../Images/registration.png';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectUserType, selectRegisteredUser } from '../redux/user/user-selector';
import { selectAllServiceTypes } from '../redux/service/service-selector';
import { setProgress, setRegisteredUser } from '../redux/user/user-actions';
import { addServiceTypes, removeServiceTypes } from '../redux/service/service-actions';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { API } from "../API";


function RegistrationForm(props) {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const { userType, serviceTypes, setProgress, setRegisteredUser, addServiceTypes, removeServiceTypes, registeredUser, history } = props;
  const [inputText, setInput] = useState({
    serviceTypeId: '',
    serviceType: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: ''
  });

  React.useEffect(() => {
    // if(registeredUser !== null){
    //     history.push('/Registration/Subscription');
    // }
    GetServiceType().then(result => result.data.output.map(value => addServiceTypes(value)));
    setProgress(0);
  }, [addServiceTypes, registeredUser, history, setProgress]);

  function GetServiceType() {
    return axios.get(`${API.URL}getServiceTypes`);
  }

  async function handleClick() {
    // console.log('hit');
    // if(props.userType==='Service-Provider'){
    //    setProgress(50);
    // }else{
    //   setProgress(100);
    // }
    const { name, email, password, confirmPassword, mobile, serviceTypeId } = inputText;
    debugger

    if (password === confirmPassword) {
      const registrationData = {
        FullName: name,
        EmailId: email,
        Password: password,
        ContactNo: mobile,
        ServiceTypeId: serviceTypeId,
        isCustomer: userType === 'Service-Provider' ? false : true,
        UserRole: userType === 'Service-Provider' ? 2 : 4
      };

      const userData = await axios.post(`${API.URL}registerUser`, registrationData);
      if (userData.data.output !== null) {
        console.log(userData);
        //const userId = userData.data.output.Id;
        if (userData.data.output !== null) {
          setRegisteredUser(userData.data.output);
          history.push('/Registration/Subscription');
        }
      }
    } else {
      alert("Both passwords don't match!")
    }
  }


  function handleChange(event) {
    const { name, value } = event.target;
    setInput(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
    });
    if (name === 'serviceType') {
      const ServiceType = serviceTypes.find(type => type.Service === value.Service);
      console.log(ServiceType);
      setInput(prevValue => {
        return {
          ...prevValue,
          serviceTypeId: ServiceType.Id
        };
      });
      return;
    }
    console.log(inputText);
  }

  const useStyles = makeStyles(theme => ({
    title: {
      margin: theme.spacing(1),
    },
    fromControl: {
      margin: theme.spacing(1),
      width: '60%',
    },
    label: {
      fontSize: '15px',

    },
    select: {
      width: '350px',

    },
    textField: {
      width: '350px'
    },
    btnSignUp: {
      margin: theme.spacing(1),
      width: '350px',
      fontSize: '12px',
      background: 'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
      height: '40px',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      color: 'white',


      '&:hover': {
        background: 'transparent',
        border: '1px solid  #FF5343',
        color: 'black',

      }
    }

  }));

  const classes = useStyles();
  const { name, email, password, confirmPassword, mobile, serviceType } = inputText;

  return (
    <div>

      <Grid container spacing={2}>
        <Grid item xs={isMobile ? 12 : 7} style={{ textAlign: 'right' }}>
          <img src={RegistrationLogo} />
        </Grid>
        <Grid item xs={isMobile ? 12 : 5}>
          <Grid container className={classes.title}>
            <Grid item xs={isMobile ? 12 : 3}>
              <Typography variant='h4' style={{ textAlign: isMobile ? 'center' : '' }}>Sign Up</Typography>
            </Grid>
            <Grid item xs={isMobile ? 12 : 3} style={{ textAlign: isMobile ? 'center' : '' }}>
              <br />
              <Typography variant='caption' >Have an account? <a href='/Login'>SignIn</a></Typography>
            </Grid>
          </Grid>
          <form style={{ textAlign: isMobile ? 'center' : '' }}>


            <FormControl className={classes.fromControl} variant="outlined" style={{ display: userType === 'Service-Provider' ? '' : 'none' }}>
              <InputLabel className={classes.label} id="demo-simple-select-outlined-label-2">Select Service Type</InputLabel>
              <Select
                className={classes.select}
                labelId="demo-simple-select-outlined-label-2"
                id="demo-simple-select-outlined-2"
                value={serviceType}
                onChange={handleChange}
                label="Select Service Type"
                name='serviceType'
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {serviceTypes ? serviceTypes.map((type, index) => { return (<MenuItem key={index} value={type}>{type.Service}</MenuItem>); }) : <MenuItem></MenuItem>}
              </Select>
            </FormControl>

            <FormControl className={classes.fromControl}  >
              <TextField className={classes.textField} id="outlined-basic" value={name} name='name' onChange={handleChange} label="Full Name" variant="outlined" />
            </FormControl>

            <FormControl className={classes.fromControl}  >
              <TextField className={classes.textField} id="outlined-basic" value={email} name='email' onChange={handleChange} label="Email Address" variant="outlined" />
            </FormControl>

            <FormControl className={classes.fromControl}  >
              <TextField className={classes.textField} id="outlined-basic" value={mobile} name='mobile' onChange={handleChange} label="Mobile Number" variant="outlined" />
            </FormControl>

            <FormControl className={classes.fromControl}  >
              <TextField className={classes.textField} id="outlined-basic" value={password} name='password' onChange={handleChange} type='password' label="Password" variant="outlined" />
            </FormControl>

            <FormControl className={classes.fromControl}  >
              <TextField className={classes.textField} id="outlined-basic" value={confirmPassword} name='confirmPassword' onChange={handleChange} type='password' label="Confirm Password" variant="outlined" />
            </FormControl>
            <Grid container>
              <Grid item xs={isMobile ? 12 : 1}>
                <Checkbox
                  defaultChecked
                  color="default"
                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                />
              </Grid>
              <Grid item xs={isMobile ? 12 : 5} style={{ paddingTop: '10px' }}>
                <p className='muted'><span style={{ fontSize: '12px' }}>I have read the </span><span style={{ fontSize: '15px', fontWeight: 'bold', textDecoration: 'underline' }}>Terms and Conditions.</span></p>
              </Grid>
            </Grid>
            <Button type='button' onClick={() => { handleClick(); }} className={classes.btnSignUp}>Sign Up</Button>
          </form>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
  serviceTypes: selectAllServiceTypes,
  registeredUser: selectRegisteredUser
})

const mapDispatchToProps = dispatch => ({
  setProgress: value => dispatch(setProgress(value)),
  setRegisteredUser: value => dispatch(setRegisteredUser(value)),
  addServiceTypes: value => dispatch(addServiceTypes(value)),
  removeServiceTypes: () => dispatch(removeServiceTypes())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm));

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




// <FormControl className={classes.fromControl} variant="outlined" >
// <InputLabel className={classes.label} id="demo-simple-select-outlined-label">I want a account to ?</InputLabel>
// <Select
// className={classes.select}
// labelId="demo-simple-select-outlined-label"
// id="demo-simple-select-outlined"
// value={inputText.accountType}
// onChange={handleChange}
// label="I want a account to ?"
// name='accountType'
// >
// <MenuItem value="">
// <em>None</em>
// </MenuItem>
// <MenuItem value='service-provider'>To work</MenuItem>
// <MenuItem value='customer'>To hire</MenuItem>
// </Select>
// </FormControl>
