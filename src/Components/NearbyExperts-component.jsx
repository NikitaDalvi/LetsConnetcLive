import React from "react";
import { Typography } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import homeVector from "../Images/sr-header1.png";
import img from "../Images/sr-header1.png";



function NearbyExperts() {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  return (
      <div>
          <img src={img} style={{height:'450px', width:'900px',textAlign: 'center'}} />

      </div>
  );
}

export default NearbyExperts;
