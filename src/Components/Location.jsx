/*jshint esversion:9*/

import React, { useState, useEffect } from "react";
import Heading from "./subComponents/page-headings";
import ServiceItem from "./subComponents/ServiceListItems";
// import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user-selector";
import { selectLocations } from "../redux/service/service-selector";
import {
  addLocation,
  removeLocation,
  clearLocation,
  setServicesProgress,
} from "../redux/service/service-actions";
import { setUserServiceStatus } from "../redux/user/user-actions";
import {
  Snackbar,
  CircularProgress,
  Backdrop,
  withStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Grid,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import WarningIcon from "@material-ui/icons/Warning";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import MuiAlert from "@material-ui/lab/Alert";
import { API } from "../API";
import { useMediaQuery } from 'react-responsive';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Location(props) {

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

  const [data, setData] = useState({
    entryId: "",
    ServiceProviderId: "",
    Address: "",
    Latitude: "",
    Longitude: "",
  });

  const [detailedAddress, setDetailedAddress] = useState("");
  const [detailsLength, setDetailsLength] = useState(null);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [severity, setSeverity] = useState("");

  const {
    currentUser,
    setUserStatus,
    addLocation,
    clearLocation,
    setProgress,
  } = props;

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setData((prevValue) => {
      return { ...prevValue, [name]: value };
    });
    console.log(data);
  }

  function detailsChange(event) {
    const { value } = event.target;
    setDetailedAddress(value);

    console.log(detailedAddress);
  }

  function addToList() {
    // setRow(prevValue => [...prevValue, data]);

    data.Address = `${detailedAddress},${data.Address}`;
    setDetailsLength(detailedAddress.length);
    console.log(props.locationList.length);
    const existing = props.locationList.find(
      (item) => item.entryId === data.entryId
    );
    console.log(data);
    if (existing) {
      addLocation(data);
    } else {
      if (props.locationList.length === 2) {
        setSeverity("warning");
        setAlert("Only 2 locatons can be added by a user");
        setOpen(true);
      } else {
        addLocation(data);
      }
    }

    setData({
      entryId: "",
      Address: "",
      Latitude: "",
      Longitude: "",
    });
    setDetailedAddress("");
    setAddress("");
  }

  function removeLocation(service) {
    props.removeLocation(service);
  }

  function editLocation(location) {
    console.log(detailsLength);
    var address = location.Address.slice(
      detailsLength + 1,
      location.Address.length
    );
    setData({
      entryId: location.entryId,
      Address: address,
      Latitude: location.Latitude,
      Longitude: location.Longitude,
    });

    var detail = location.Address.slice(0, detailsLength);
    setAddress(address);
    setDetailedAddress(detail);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function saveToDatabase() {
    setLoading(true);
    const request = {
      LocationDetails: props.locationList,
      ticket: currentUser.Ticket,
    };

    const result = await axios.post(
      `${API.URL}SaveServiceProviderLocation`,
      request
    );
    if (result) {
      if (result.data.responseCode === 200) {
        setLoading(false);
        setSeverity("success");
        setAlert("The locations are saved successfully!");
        clearLocation();
        result.data.output.LocationDetails.map((item) => addLocation(item));
        setOpen(true);
        if (currentUser.isLocationsAdded === null) {
          const locationsSaved = {
            type: 3,
            ServiceCharge: currentUser.ServiceCharge,
            ServiceGiven: currentUser.ServiceGiven,
          };
          setUserStatus(locationsSaved);
          if(currentUser.UserRole===1){
            if (currentUser.isServicesAdded && currentUser.isWorkingHoursAdded) {
              setProgress(100);
              return;
            }
            if (currentUser.isServicesAdded) {
              setProgress(66);
              return;
            }
          }else{
            if (currentUser.isServicesAdded) {
              setProgress(100);
              return;
            }
          }
        }
      } else {
        setLoading(false);
        setSeverity("error");
        setAlert(
          "Unexpected error occured ! Saving locations was unsuccessfull."
        );
        setOpen(true);
      }
    }
  }

  // async function saveToDatabase(){
  //     const postData = [];
  //     props.serviceList.map(service => {
  //       var type= '';
  //       switch (service.type) {
  //         case 'hour':
  //           type = 'PerHr';
  //           break;
  //         case 'month':
  //             type = 'PerMon';
  //             break;
  //         case 'assignment':
  //           type = 'PerAs';
  //           break;
  //         default:
  //           type='';
  //       }
  //
  //       const entry = {
  //         ServiceId:service.Id,
  //         ServiceTypeId:props.serviceType,
  //         ServiceProviderId:currentUser.Id,
  //         Fees:service.fees,
  //         ServiceGiven:service.location,
  //         ServiceCharge:type
  //       };
  //
  //       postData.push(entry);
  //     });
  //
  //     const res = await axios.post('https://localhost:44327/api/AddService',postData);
  //     console.log(res);
  //   }

  // useEffect(()=>{
  //   const status = async() => {
  //
  //     clearDropdown();
  //     if(currentUser!==null){
  //     const data = {ServiceProviderId: currentUser.Id};
  //     axios.post('https://localhost:44327/api/GetServiceTypesByUserId',data)
  //     .then((res) => {
  //         const serviceTypeId = res.data.output[0].ServiceTypeId;
  //         SetServiceType(serviceTypeId);
  //         const typeId = {ServiceTypeId: serviceTypeId};
  //         axios.post('https://localhost:44327/api/GetServices',typeId)
  //         .then((res) => {
  //             console.log(res);
  //             res.data.output.map(item => (AddToDropdown(item)));
  //
  //
  //         });
  //
  //
  //     });
  //   }else{
  //     console.log('fail');
  //   }
  //   };
  //
  //   const Status =  status();
  //   console.log(Status);
  // },[currentUser,AddToDropdown,clearDropdown,SetServiceType]);

  useEffect(() => {
    if (currentUser) {
      setData((prevValue) => {
        return {
          ...prevValue,
          ServiceProviderId: currentUser.Id,
        };
      });

      const request = {
        ServiceProviderId: currentUser.Id,
        ticket: currentUser.Ticket,
      };
      gettingLocations(request).then((res) => addingSavedLocations(res));
    }
  }, [currentUser, addLocation]);

  function addingSavedLocations(response) {
    if (response.length !== 0) {
      clearLocation();
      response.data.output.map((item) => {
        const object = {
          ...item,
          entryId: item.Id,
        };
        addLocation(object);
      });
    }
  }

  async function gettingLocations(data) {
    const result = await axios.post(
      `${API.URL}GetLocationListByServiceProviderId`,
      data
    );
    return result;
  }

  const useStyles = makeStyles((theme) => ({
    grid: {
      margin: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
    text: {
      marginTop: theme.spacing(1),
      width: "100%",
    },
    button: {
      width: "100%",
      height: "50px",
      background: "linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)",
      color: "white",
      marginTop: theme.spacing(1),
    },
    table: {
      minWidth: isMobile?'':"500px",
    },
    tableBtn: {
      margin: theme.spacing(1),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const [address, setAddress] = useState("");

  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const latlng = await getLatLng(result[0]);

    setAddress(value);
    setData((prevValue) => {
      return {
        ...prevValue,
        Address: value,
        Latitude: latlng.lat,
        Longitude: latlng.lng,
      };
    });
    setCoordinates(latlng);
    console.log(data);
  };

  const classes = useStyles();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {alert}
        </Alert>
      </Snackbar>
      <Grid container>
        <Grid item xs={isMobile?12:3} className={classes.grid}>
          <Grid container>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Grid item xs={12} style={{ width: "300px" }}>
                    <TextField
                      variant="outlined"
                      label="Flat-No./Block-No."
                      style={{ width: "100%", marginTop: "10px" }}
                      value={detailedAddress}
                      onChange={detailsChange}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} style={{ width: "300px" }}>
                    <TextField
                      variant="outlined"
                      label="Address"
                      multiline
                      rows="3"
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input",
                      })}
                      style={{ width: "100%" }}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };

                        console.log(suggestion);
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      className={classes.button}
                      onClick={addToList}
                      variant="contained"
                    >
                      ADD TO LIST &#10095;
                    </Button>
                  </Grid>
                </div>
              )}
            </PlacesAutocomplete>
          </Grid>
        </Grid>
        <Grid item xs={isMobile?12:8} className={classes.grid}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell align="center">Address</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.locationList.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.Address}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#2196f3", color: "white" }}
                        className={classes.tableBtn}
                        startIcon={<EditIcon />}
                        onClick={() => editLocation(row)}
                      >
                        Edit
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {props.locationList.length === 0 ? (
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
                marginTop: "50px",
                color: "#bdbdbd",
              }}
            >
              <WarningIcon /> No locations added yet!
            </Typography>
          ) : (
            <div style={{ width: "100%", textAlign: "right" }}>
              <Button
                className={classes.button}
                style={{ width: isMobile?'50%':"22%", margin: "5px" }}
                variant="contained"
                onClick={() => {
                  saveToDatabase();
                }}
                startIcon={<SaveAltIcon />}
              >
                Apply & Save
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  locationList: selectLocations,
});

const mapDispatchToProps = (dispatch) => ({
  addLocation: (location) => dispatch(addLocation(location)),
  clearLocation: () => dispatch(clearLocation()),
  setUserStatus: (object) => dispatch(setUserServiceStatus(object)),
  setProgress: (value) => dispatch(setServicesProgress(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Location);

// <TextField  className={classes.text} onChange={handleChange} value={data.city} name='city' id="outlined-basic" label="City" variant="outlined" />

// <Grid item xs={12}>
// <TextField className={classes.text} onChange={handleChange} value={data.city} name='city' id="outlined-basic" label="City" variant="outlined" />
// </Grid>
// <Grid item xs={12}>
// <TextField
// className={classes.text}
// id="outlined-multiline-static"
// label="Address"
// multiline
// rows={4}
// value={data.address}
// onChange={handleChange}
// variant="outlined"
// name='address'
// />
// </Grid>
// <Grid item xs={5}>
//
// </Grid>
// <Grid item xs={7}>
// <TextField name='pincode' value={data.pincode} onChange={handleChange} className={classes.text}  id="outlined-basic" label="Pincode" variant="outlined" />
// </Grid>
// <Grid item xs={12}>
// <Button className={classes.button} onClick={addToList} variant="contained" >
//   ADD TO LIST &#10095;
// </Button>
// </Grid>
//
