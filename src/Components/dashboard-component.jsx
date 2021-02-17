/*jshint esversion:9*/
import React, { useEffect, useState } from "react";
import DashboardCard from "./subComponents/Dashboard-card";
import { Container, Grid, makeStyles, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectUserType,
  selectCurrentUser,
  selectDashboardDetails,
} from "../redux/user/user-selector";
import { setDashboardDetails } from "../redux/user/user-actions";
import axios from "axios";
import { API } from "../API";
import { red, green } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
import { useMediaQuery } from 'react-responsive';
const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    marginTop: "2%",
  },
}));

const statusMapping = (statusCode) => {
  switch (statusCode) {
    case 1:
      return "USer  Registered";

    case 2:
      return "User  Subscribed";

    case 3:
      return "User  KYC is Uploaed";

    case 4:
      return "User is KYCAccept Here";

    case 5:
      return "User  KYC is Rejected ";

    case 6:
      return "User is Active ";

    case 7:
      return "User is Unpaid Hence User not Active ";

    case 8:
      return "User is Inactive ";

    case 9:
      return "User is Expired ";

    default:
      return "User is not active";
  }
};

const Dashboard = (props) => {
      const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [dashboardCustomerDetails, setdashboardCustomerDetails] = useState({});
  const { currentUser, dashBoardCounts, setDashBoardCounts, userType } = props;

  useEffect(() => {
    if (currentUser) {
      var data = {
        Id: currentUser.Id,
        ticket: currentUser.Ticket,
      };
      if (userType === "Service-Provider") {
        axios
          .post(`${API.URL}getSPDashboardDetails`, data)
          .then((res) => {
            console.log(res.data.output);
            setDashboardDetails(res.data.output);
          })
          .catch((error) => alert("Error from Dashboard details api"));
      } else if (userType === "Customer") {
        axios
          .post(`${API.URL}GetSEDashBoard`, data)
          .then((res) => {
            console.log(res.data.output);
            setdashboardCustomerDetails(res.data.output);
          })
          .catch((error) => alert("Error from Dashboard details api"));
      }
    }
  }, [currentUser, setDashBoardCounts, userType]);

  const classes = useStyles();
  if (props.userType === "Service-Provider") {
    return (
      <div>
        <Container>
          <center>
            {currentUser && currentUser.Status !== 6 && (
              <Tooltip title={statusMapping(currentUser && currentUser.Status)}>
                <Box
                  width="50%"
                  p={2}
                  bgcolor={red}
                  style={{ color: "#ffffff" }}
                >
                  User is not Active
                </Box>
              </Tooltip>
            )}
          </center>

          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#e65888"
                caption="Service Request"
                name="NEW"
                quantity={
                  dashboardDetails !== null
                    ? dashboardDetails.NewRequests
                    : "50"
                }
              />
            </Grid>
            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#c95ed6"
                caption="Service Request"
                name="TODAY"
                quantity={
                  dashboardDetails !== null
                    ? dashboardDetails.TodaysRequest
                    : "50"
                }
              />
            </Grid>
            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#e65888"
                caption="Service Request"
                name="UPCOMING"
                quantity={
                  dashboardDetails !== null ? dashboardDetails.Upcomming : "50"
                }
              />
            </Grid>

            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#c95ed6"
                caption="Service Request"
                name="COMPLETED"
                quantity={
                  dashboardDetails !== null ? dashboardDetails.Completed : "50"
                }
              />
            </Grid>
            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#e65888"
                caption="Commission Due"
                name="COMMISSION DUE"
                quantity={
                  dashboardDetails !== null
                    ? dashboardDetails.CommissionDue
                    : "50"
                }
              />
            </Grid>
            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#c95ed6"
                caption="Rating"
                name="RATING"
                quantity={
                  dashboardDetails !== null
                    ? `${Math.round (dashboardDetails.AvgRating)}`
                    : "5 &#10032;"
                }

              />
            </Grid>
            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#e65888"
                caption="Review"
                name="REVIEW"

                quantity={
                  dashboardDetails !== null
                    ? dashboardDetails.ReviewCount
                    : "50"
                }
              />
            </Grid>
          </Grid>

        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  } else {
    console.log(dashboardCustomerDetails);
    return (
      <div>
        <Container>
          <Grid container spacing={isMobile?0:2} className={classes.grid}>
            <Grid item xs={isMobile?'12':"3"}>
            <DashboardCard
                color="#e65888"
                caption="Nearby Experts"
                name="NEARBY EXPERT"
                quantity={
                  dashboardCustomerDetails !== null
                    ? dashboardCustomerDetails.NearByExperts
                    : "10"
                }
              />
            </Grid>
            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#c85ed8"
                caption="Service Requests"
                name="CONFIRMED"
                quantity={
                  dashboardCustomerDetails !== null
                    ? dashboardCustomerDetails.Confirmed
                    : "10"
                }
              />
            </Grid>
            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#e65888"
                caption="Service Request"
                name="PENDING"
                quantity={
                  dashboardCustomerDetails !== null
                    ? dashboardCustomerDetails.Pending
                    : "10"
                }
              />
            </Grid>

            <Grid item xs={isMobile?'12':"3"}>
              <DashboardCard
                color="#c85ed8"
                caption="Service Request"
                name="PAST"
                quantity={
                  dashboardCustomerDetails !== null
                    ? dashboardCustomerDetails.Past
                    : "10"
                }
              />
            </Grid>
            <Grid item xs={isMobile?'12':"3"}>

              <DashboardCard
                color="#e65888"
                caption="Rating"
                name="RATING"
                rating={
                  dashboardCustomerDetails !== null
                    ? `${Math.round(dashboardCustomerDetails.AvgRating)}`
                    : "5 &#10032;"
                }
              />
            </Grid>

            <Grid item xs={isMobile?'12':"3"}>

              <DashboardCard
                color="#c85ed8"
                caption="Review"
                name="REVIEW"
                quantity={
                  dashboardCustomerDetails !== null
                    ? dashboardCustomerDetails.ReviewCount
                    : "50"
                }
              />
            </Grid>

          </Grid>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
};

const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
  currentUser: selectCurrentUser,
  dashBoardCounts: selectDashboardDetails,
});

const mapDispatchToProps = (dispatch) => ({
  setDashBoardCounts: (object) => dispatch(setDashboardDetails(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
