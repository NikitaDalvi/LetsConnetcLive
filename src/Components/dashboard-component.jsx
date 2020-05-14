import React from 'react';
import DashboardCard from "./subComponents/Dashboard-card";
 import Container from 'react-bootstrap/Container';


const Dashboard = (props) => (
  <div>
  <Container>
  <h1 className="display-4">My Service Requests</h1>
    <hr/>
    <div className="card-mainContainer">
    <DashboardCard id="Today" name="Today's" type="SP" routeName="TodayService"  />
    <DashboardCard id="Upcoming" name="Upcoming" type="SP" routeName="Upcoming"  />
    <DashboardCard id="New" name="New" type="SP" routeName="NewRequest" />
    </div>
    <br/>
    <h1 className="display-4">Others</h1>
    <hr/>
    <div className="card-mainContainer">
    <DashboardCard id="RatingAndReview" type="SP" name="Rating & Review" routeName="RatingAndReview"  />
    <DashboardCard id="Wallet" type="SP" name="My Wallet" routeName="Wallet" />
    </div>
    </Container>
    </div>
);

export default Dashboard;
