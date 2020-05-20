/*jshint esversion:6*/

import React from "react";
import RatingContainer from "./subComponents/RatingAndReview-container";
import {Container,AppBar,Toolbar,Typography,makeStyles} from '@material-ui/core';
import StarHalfIcon from '@material-ui/icons/StarHalf';

class RatingAndReview extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }




  render(){
    return(
      <div>
      <Container >
      <AppBar position="static" style={{borderRadius:'5px',height:'60px',backgroundColor:'white'}}>
    <Toolbar variant="dense" style={{marginTop:'5px'}}>
    <StarHalfIcon style={{color:'black'}}/>
      <Typography variant="h6" style={{color:'black',marginLeft:'10px'}}>
        Ratings & Reviews
      </Typography>
    </Toolbar>
  </AppBar>
        <hr/>
        <div>
          <RatingContainer name1="Devang Khandhar" name2="Dishank Mehta" name3="Saurabh Mane" name4="Nikita Dalvi"/>
        </div>
        </Container>
      </div>
    );
  }
}

export default RatingAndReview;
