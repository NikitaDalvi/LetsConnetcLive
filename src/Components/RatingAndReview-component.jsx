/*jshint esversion:6*/

import React,{useState,useEffect} from "react";
import RatingContainer from "./subComponents/RatingAndReview-container";
import {Container,AppBar,Toolbar,Typography,makeStyles,Grid} from '@material-ui/core';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import RatingCard from "./subComponents/RatingAndReview-card";
import axios from 'axios';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../redux/user/user-selector';
import {selectRatingAndReviews} from '../redux/service/service-selector';
import {addRatingAndReviews} from '../redux/service/service-actions';

function RatingAndReview({currentUser,ratingsAndReviews,addRatingsAndReviews}){

    const [ratings,setRatings] = useState([]);

    useEffect(() => {
      if(currentUser!=null){
        const data = {
          Id:currentUser.Id,
          ticket:currentUser.Ticket
        };

         getRatings(data).then(res =>setRatings(res.data.output));
        // if(result!=null){
        //   console.log(result.data);
        // }
      }
    },[currentUser]);

    function getRatings(data){
      return  axios.post('https://localhost:44327/api/GetRatings',data);
    }

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
        <Container>
        <Grid container spacing={3}>
        {ratings.map((item,index)=><Grid item xs={4} key={index}>
        <RatingCard name={item.Name} dp ={item.DPPath} rating={item.Rating} review={item.Review}/>
        </Grid>)}

        </Grid>
        </Container>
        </div>
        </Container>
      </div>
    );
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  ratingsAndReviews : selectRatingAndReviews
});

const mapDispatchToProps = dispatch => ({
  addRatingsAndReviews : ratings => dispatch(addRatingAndReviews(ratings))
});

export default connect(mapStateToProps,mapDispatchToProps)(RatingAndReview);
