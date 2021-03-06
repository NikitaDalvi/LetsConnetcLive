/*jshint esversion: 6*/
import React from "react";
import Registration from "./Registration-component"
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import {Container} from '@material-ui/core';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectProgress} from '../redux/user/user-selector';

 function ProfessionalForm({progress}){

   return(
     <div>
     <br/>
     <br/>
     <br/>
     <br/>
     <Container maxWidth="sm" style={{marginLeft:'550px'}}>
     <ProgressBar
  percent={progress}
  filledBackground='linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)'
  height={6}
  width={400}
>
  <Step transition="scale">
    {({ accomplished }) => (
      <svg width="150" height="100">
              <g>
                 <circle cx="70 " cy="50" r="15"
                 style={{ fill: `${accomplished ? '#FF5343' : 'gray'}` }}> </circle>
   <text  x="10" y="90" fill={`${accomplished ? 'black' : 'gray'}`}>Basic Information</text>
                </g>

           </svg>
    )}
  </Step>
  <Step transition="scale">
    {({ accomplished }) => (
      <svg width="150" height="100">
              <g>
                 <circle cx="70 " cy="50" r="15"
                 style={{ fill: `${accomplished ? '#FF5343' : 'gray'}` }}> </circle>
   <text  x="30" y="90" fill={`${accomplished ? 'black' : 'gray'}`}>Choose Plan</text>
                </g>

           </svg>
    )}
  </Step>
  <Step transition="scale">
    {({ accomplished }) => (
      <svg width="150" height="100">
              <g>
                 <circle cx="70 " cy="50" r="15"
                 style={{ fill: `${accomplished ? '#FF5343' : 'gray'}` }}> </circle>
   <text  x="40" y="90" fill={`${accomplished ? 'black' : 'gray'}`}>Payment</text>
                </g>

           </svg>
    )}
  </Step>
  <Step transition="scale">
    {({ accomplished }) => (
      <svg width="150" height="100">
              <g>
                 <circle cx="70 " cy="50" r="15"
                 style={{ fill: `${accomplished ? '#FF5343' : 'gray'}` }}> </circle>
   <text  x="10" y="90" fill={`${accomplished ? 'black' : 'gray'}`}>KYC Verification</text>
                </g>

           </svg>
    )}
  </Step>
</ProgressBar>
</Container>
<br/>
<br/>
<br/>
     <Registration type="Service-Provider" />

     </div>
   );
 }


const mapStateToProps = createStructuredSelector({
  progress: selectProgress
});

 export default connect(mapStateToProps)(ProfessionalForm);
