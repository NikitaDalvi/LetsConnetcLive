/*jshint esversion:9*/
import React from 'react';
import { ProgressBar, Step } from "react-step-progress-bar";
import { useMediaQuery } from 'react-responsive';

function Progressbar({type,progress}){
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  if(type==='Service-Provider'){
    return(

      <ProgressBar
    percent={progress}
    filledBackground='linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)'
    height={6}
    width={isMobile?250:400}
    
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
       <svg width="180" height="100">
               <g>
                  <circle cx="85" cy="50" r="15"
                  style={{ fill: `${accomplished ? '#FF5343' : 'gray'}` }}> </circle>
    <text  x="15" y="90" fill={`${accomplished ? 'black' : 'gray'}`}>Purchase Subscription</text>
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
  );
}else{
  return(

    <ProgressBar
  percent={progress}
  filledBackground='linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)'
  height={6}
  width={300}
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
     <svg width="180" height="100">
             <g>
                <circle cx="85" cy="50" r="15"
                style={{ fill: `${accomplished ? '#FF5343' : 'gray'}` }}> </circle>
  <text  x="15" y="90" fill={`${accomplished ? 'black' : 'gray'}`}>Purchase Subscription</text>
               </g>

          </svg>
   )}
  </Step>

  </ProgressBar>
);
}

}

export default Progressbar;
