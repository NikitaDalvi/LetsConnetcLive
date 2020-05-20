/*jshint esversion:6*/

import React from "react";
import RatingCard from "./RatingAndReview-card";
import {Container,Grid} from '@material-ui/core';

function RatingContainer(props){
  return(
    <Container>
    <Grid container spacing={3}>
      <Grid item xs={4}>
      <RatingCard name={props.name1} rating="4" review="The customer was good and co-operative"/>
      </Grid>
      <Grid item xs={4}>
      <RatingCard name={props.name2} rating="4" review="The customer was good and co-operative"/>
      </Grid>
      <Grid item xs={4}>
      <RatingCard name={props.name3} rating="4.5" review="The customer was good and co-operative"/>
      </Grid>
      <Grid item xs={3}>
      <RatingCard name={props.name4} rating="4.5" review="The customer was good and co-operative"/>
      </Grid>
    </Grid>
    </Container>
  );
}

export default RatingContainer;
