/*jshint esversion:6*/
import React from 'react';
import DashboardCard from "./subComponents/Dashboard-card";
 import Container from 'react-bootstrap/Container';


const CustomerDashboard = (props) => (
  <div>
  <Container>
  <h1 className="display-4">Contents</h1>
    <hr/>
    <div className="card-mainContainer">
    <DashboardCard id="Nearby" name="Nearby CA" routeName="NearbyCA" userId={props.match.params.id} />
    <DashboardCard id="Rating" name="Rate & Review" routeName="Rating" userId={props.match.params.id} />
    </div>
    <br/>
    </Container>
    </div>
);

export default CustomerDashboard;
