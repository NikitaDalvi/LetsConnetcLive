import React from "react";
import { Typography } from "@material-ui/core";
import { useMediaQuery } from "react-responsive";
import homeVector from "../Images/sr-header1.png";
import img from "../Images/sr-header1.png";



function NearbyExperts() {
  return (
      <div>
          <img src={img} style={{
          display: "flex",
          justifyContent: "center",
          height:"80%",
          width:"80%"

        }} />

      </div>
  );
}

export default NearbyExperts;
