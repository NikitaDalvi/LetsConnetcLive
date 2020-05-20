import React from "react";
import {Container,Typography,styled,Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {setProgress,setIsHome} from '../redux/user/user-actions';

function NextPage({setIshome,setProgress}){
  const MyButton =  styled(Button)({
       width:'100px',
       fontSize:'12px',
       background:'linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)',
       height:'40px',
       color:'white',
       borderRadius:'8px'
   });
  return (
    <Container>
        <Typography variant='h5'>Your documents are sent for Verification. <br/> We will inform you through e-mail once done.<br/><br/><span class="h1"> Thank You ! </span></Typography>
        <br/>
          <a href='/'><MyButton  onClick={()=>{setIshome(true);setProgress(0);}} type="submit" style={{width:"12%"}}>BACK TO HOME</MyButton></a>
          <br/>
          <br/>
          <br/>
          <br/>
      </Container>
  );
}

const mapDispatchToProps = dispatch => ({
  setIshome: value => dispatch(setIsHome(value)),
  setProgress: value => dispatch(setProgress(value))
})

export default connect(null,mapDispatchToProps)(NextPage);
