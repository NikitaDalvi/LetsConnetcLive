/*jshint esversion:6*/

import React from "react";
import RatingContainer from "./subComponents/RatingAndReview-container";
import {Container} from 'react-bootstrap';

class RatingAndReview extends React.Component{
  constructor(){
    super();
    this.state = {

    }
  }

  render(){
    return(
      <div>
      <Container>
      <div className="row">
        <h1 className="display-4 col-lg-6">Rating and Review</h1>
        <div className="col-lg-6" style={{textAlign:"right",marginTop:"20px"}}>
        <a className="btn" style={{borderRadius:"5px", border:"1px solid #4B66EA"}} href={"/UserPage/Service-Provider"}>Back to Dashboard</a>
        </div>
      </div>
        <hr/>
        <div className="card-mainContainer">
          <RatingContainer name1="Devang Khandhar" name2="Dishank Mehta" name3="Saurabh Mane" name4="Nikita Dalvi"/>
        </div>
        </Container>
      </div>
    );
  }
}

export default RatingAndReview;
