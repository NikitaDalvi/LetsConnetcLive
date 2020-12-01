/*jshint esversion:9*/
/*jshint -W087*/

import React, { useState, useEffect } from "react";
import Heading from "./subComponents/page-headings";
import ServiceItem from "./subComponents/ServiceListItems";
// import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user-selector";
import {
  selectDropdownItems,
  selectServices,
  selectServiceType,
  selectSavedServices,
} from "../redux/service/service-selector";
import {
  setServiceType,
  addService,
  setDropdown,
  removeService,
  clearDropdown,
  setSavedServices,
  setServicesProgress,
  clearService,
  addServicesFromAPI,
} from "../redux/service/service-actions";
import {
  setCurrentUser,
  setUserServiceStatus,
  setServicesAdded,
} from "../redux/user/user-actions";
import {
  Snackbar,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import WarningIcon from "@material-ui/icons/Warning";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import { API } from "../API";
import { setDate } from "date-fns/esm";

let tempAddToListData = [];

function ServicesProvide(props) {
  const [data, setData] = useState({
    Id: localStorage.getItem("serviceId") || "",
    location: localStorage.getItem("location") || "",
    service: "",
    fees: localStorage.getItem("fees") || "",
    type: localStorage.getItem("type") || "",
    workingDays: localStorage.getItem("workingDays") || "",
    otherService: null,
  });

  const {
    currentUser,
    AddToDropdown,
    clearDropdown,
    SetServiceType,
    setUserStatus,
    setSavedServices,
    savedServices,
    clearService,
    addServicesFromAPI,
    setServicesAdded
  } = props;

  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(false);
  const [serviceError, setServiceError] = useState(false);
  const [feesError, setFeesError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [SavedServices, setSaveServices] = useState([]);
  const [saveButtonEnable, setSaveButtonEnable] = useState(false);
  const [
    showServiceAssignmentSection,
    setShowServiceAssignmentSection,
  ] = useState(false);
  const [showApplySave, setShowApplySave] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    const { type, location, fees, workingDays } = data;

    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });

    setTimeout(() => {
      if (!type && !location && !fees && !workingDays) {
        console.log("AAA");
        setSaveButtonEnable(false);
      } else if (name === "type" && value === "Full-Time") {
        console.log("BBB");
        setOpen(true);

        setSaveButtonEnable(location && fees && fees !== "null" && workingDays);
      } else if (name === "type" && value !== "Full-Time") {
        console.log("CCC");
        setSaveButtonEnable(location && type);
      } else {
        console.log("DDD");
        setSaveButtonEnable(
          type && type !== "Full-Time"
            ? location && type
            : location && fees && workingDays
        );
      }
    }, 1000)

    //setSaveButtonEnable(false)
    if (name === "service") {

      console.log("eee");

      const service = props.dropdownList.find(
        (service) => service.Services === value
      );
      setData((prevValue) => {
        return {
          ...prevValue,
          Id: service.Id,
        };
      });
    }

    console.log(data);
  }

  console.log(data);
  async function saveToDatabaseDetails() {
    const Service = {
      ServiceId: data.Id,
      //ServiceTypeId: props.serviceType,
      ServiceProviderId: currentUser.Id,
      Fees: data.fees,
    };

    const postService = {
      Service,
      ticket: currentUser.Ticket,
    };
    const res = await saveServiceDetails(postService);
    if (res) {
      return res;
      // if (res.data) {
      //   debugger;
      //   if (res.data.responseCode === 200) {
      //     return "success";
      //   } else {
      //     return "fail";
      //   }
      // }
    }
  }

  function addToList() {


    // setRow(prevValue => [...prevValue, data]);
    if (data.location === "") {
      setLocationError(true);
      return;
    } else {
      setLocationError(false);
    }
    if (data.service === "") {
      setServiceError(true);
      return;
    } else {
      setServiceError(false);
    }
    if (data.fees === "") {
      setFeesError(true);
      return;
    } else {
      setFeesError(false);
    }
    if (data.type === "") {
      setTypeError(true);
      return;
    } else {
      setTypeError(false);
    }

    props.AddService(data);

    tempAddToListData.push(data);
    console.log(tempAddToListData);

    if (data.type === "Full-Time") {
      setData({
        Id: "",
        service: "",
        type: data.type,
        fees: data.fees,
        location: data.location,
        workingDays: data.workingDays,
      });
    } else {
      setData({
        Id: "",
        service: "",
        fees: "",
        type: data.type,
        location: data.location,
      });
    }

    //clearService()
  }
  function saveDetails() {
    setSaveButtonEnable(false);
    saveToDatabase(false);
    setShowApplySave(true);
  }

  function editService(row) {
    if (row.type === "Full-Time") {
      setData({
        Id: row.Id,
        service: row.service,
        fees: row.fees,
        type: data.type,
        location: data.location,
        workingDays: data.workingDays,
      });
    } else {
      setData({
        Id: row.Id,
        service: row.service,
        fees: row.fees,
        type: data.type,
        location: data.location,
      });
    }
  }

  async function removeService(item) {
    props.removeService(item);
    window.location.reload(true);

    const Service = {
      ServiceId: item.serviceId,
      ServiceProviderId: currentUser.Id,
    };

    const postdeleteService = {
      Service,
      ticket: currentUser.Ticket,
    };
    const res = await deleteServiceDetails(postdeleteService);
    if (res) {
      if (res.data) {

        if (res.data.responseCode === 200) {


          return "success";
        } else {

          return "fail";
        }
      }
    }
  }

  function getBasicDetailsService(){

    var type = "";
    switch (data.type) {
      case "hour":
        type = "PerHr";
        break;
      case "Full-Time":
        type = "Full_Time";
        break;
      case "assignment":
        type = "PerAs";
        break;
      default:
        type = "";
    }

    console.log(props.currentUser)
    const postData = {
      UserId: currentUser.Id,
      ServiceCharge: type,
      ServiceGiven: data.location,
      WorkingDays: data.workingDays,
      ticket: currentUser.Ticket,
    };

    const requestData = {
      ServiceProviderId: currentUser.Id,
      ticket: currentUser.Ticket,
    };


    getBasicDetails(requestData);

  }

  async function saveToDatabase(clearData) {
    setShowApplySave(false);
    var type = "";
    switch (data.type) {
      case "hour":
        type = "PerHr";
        break;
      case "Full-Time":
        type = "Full_Time";
        break;
      case "assignment":
        type = "PerAs";
        break;
      default:
        type = "";
    }

    const postData = {
      UserId: currentUser.Id,
      ServiceCharge: type,
      ServiceGiven: data.location,
      WorkingDays: data.workingDays,
      //services: [],
      ticket: currentUser.Ticket,
    };



    if (type === "Full_Time") {
      var days = 0;
      const modelData = {
        WorkingHours: [],
        ticket: currentUser.Ticket,
      };

      const Timeslot = {
        StartTime: "9:00",
        EndTime: "18:30",
        BufferTime: "0",
      };
      if (data.workingDays === "Monday_To_Friday") {
        for (var i = 0; i < 5; i++) {
          var hoursData = {
            ServiceProviderId: currentUser.Id,
            ServiceTypeId: props.serviceType,
            WorkingDays: i + 1,
            TimeSlots: [Timeslot],
          };
          modelData.WorkingHours.push(hoursData);
        }
      } else {
        for (var j = 0; j < 6; j++) {
          var HoursData = {
            ServiceProviderId: currentUser.Id,
            ServiceTypeId: props.serviceType,
            WorkingDays: j + 1,
            TimeSlots: [Timeslot],
          };
          modelData.WorkingHours.push(HoursData);
        }
      }
      const res = await saveWorkingHours(modelData);
      if (res === "success") {
        const result = await saveServices(postData);
        if (result === "success") {
          const servicesSaved = {
            type: 1,
            ServiceCharge: type,
            ServiceGiven: data.location,
          };
          const hoursSaved = {
            type: 2,
            ServiceCharge: type,
            ServiceGiven: data.location,
          };
          setUserStatus(servicesSaved);
          setUserStatus(hoursSaved);
          if (currentUser.isLocationsAdded) {
            props.setProgress(100);
          } else {
            props.setProgress(66);
          }
          clearService();
          if (clearData) {
            setData({
              Id: "",
              service: "",
              fees: "",
            });
          }
        } else {
          alert("unexpected error occured !");
        }
      } else {
        alert("unexpected error occured !!");
      }
    } else {
      const result = await saveServices(postData);
      if (result === "success") {
        const servicesSaved = {
          type: 1,
          ServiceCharge: type,
          ServiceGiven: data.location,
        };
        setUserStatus(servicesSaved);
        if (currentUser.isLocationsAdded) {
          props.setProgress(66);
        } else {
          props.setProgress(34);
        }
      } else {
        alert("unexpected error occured !!!");
      }
    }

    setShowServiceAssignmentSection(true);
    setSaveButtonEnable(false);
  }

  async function saveServices(postData) {
    const res = await axios.post(`${API.URL}AddServiceBasic`, postData);
    if (res) {
      if (res.data) {
        if (res.data.responseCode === 200) {
          console.log("hit");
          tempAddToListData = [];
          return "success";
        } else {
          return "fail";
        }
      }
    }
    console.log(res);
    setSaveButtonEnable(false);
  }

  console.log(data)
  const getBasicDetails = async (data) => {
    const res = await axios.post(`${API.URL}GetWorkingBasicDetails`, data);
    if (res) {

      console.log(res)
      if (res.data) {
        if (res.data.responseCode === 200) {
          const output = res.data.output
          console.log(output)
          if(output){
            setSaveButtonEnable(false);
            setShowServiceAssignmentSection(true);
            setShowApplySave(true);
          }
          setData(previousValue => {
            return {
              ...previousValue,
              Id: output.Id,
              type: output.ServiceCharge == 0 ? "" : output.ServiceCharge == 1 ? "hour" : output.ServiceCharge == 2 ? "assignment" : output.ServiceCharge == 3 ? "Full-Time" : "",
              location: output.ServiceGiven===1?'OnSite':output.ServiceGiven===2?'OffShore':output.ServiceGiven===3?'Remote':null,
              workingDays: output.WorkingDays===2?'Monday_To_Saturday':'Monday_To_Friday',
              fees: output.Fees
            }
          })
        } else {
          return "fail";
        }
      }
    }
  };

  async function saveServiceDetails(postService) {
    console.log(postService);
    const res = await axios.post(`${API.URL}AddServiceDetail`, postService);
    if (res) {
          debugger;
      if (res.data) {
        if (res.data.responseCode === 200) {
          return "success";
        } else {
          return "fail";
        }
      }
    }
  }

  async function deleteServiceDetails(postdeleteService) {
    const res = await axios.post(`${API.URL}DeleteService`, postdeleteService);
    if (res) {
      if (res.data) {
        if (res.data.responseCode === 200) {
          return "success";
        } else {
          return "fail";
        }
      }
    }
  }
  async function saveWorkingHours(workingHours) {
    const res = await axios.post(`${API.URL}AddWorkingHours`, workingHours);
    if (res) {
      if (res.data) {
        if (res.data.responseCode === 200) {
          return "success";
        } else {
          return "fail";
        }
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("location", data.location);
    localStorage.setItem("type", data.type);
    console.log(props.serviceList);

    if (data && data.location && data.type) setSaveButtonEnable(true);

    if (data.type === "Full-Time") {
      localStorage.setItem("fees", data.fees);
      localStorage.setItem("workingDays", data.workingDays);
    }
  }, [data]);

  useEffect(() => {
    if (savedServices) {
      console.log(savedServices);
      setSaveServices(savedServices);
    }
  }, [savedServices]);

  useEffect(() => {
    if(currentUser)
      getBasicDetailsService()
  }, [currentUser]);

  useEffect(() => {
    const status = async () => {
      clearDropdown();
      if (currentUser) {
        const data = {
          ServiceProviderId: currentUser.Id,
          ticket: currentUser.Ticket,
        };
        axios.post(`${API.URL}GetServiceTypesByUserId`, data).then((res) => {
          if (res.data.output && res.data.output[0]) {
            const serviceTypeId = res.data.output[0].ServiceTypeId;
            SetServiceType(serviceTypeId);
            const typeId = {
              ServiceTypeId: serviceTypeId,
              ticket: currentUser.Ticket,
            };

            axios.post(`${API.URL}GetServices`, typeId).then((res) => {
              console.log(res);
              res.data.output.map((item) => AddToDropdown(item));
              const savedServicesRequest = {
                ServiceProviderId: currentUser.Id,
                ticket: currentUser.Ticket,
              };

              axios
                .post(
                  `${API.URL}GetServiceListByServiceProviderId`,
                  savedServicesRequest
                )
                .then((res) => {
                  //setSavedServices(res.data.output)
                console.log(res.data.output);
                  addServicesFromAPI(res.data.output)
                });
            });

          }

        });
      } else {
        console.log("fail");
      }
    };

    const Status = status();
    console.log(Status);
  }, [
    currentUser,
    AddToDropdown,
    clearDropdown,
    SetServiceType,
    setSavedServices,
  ]);

  const useStyles = makeStyles((theme) => ({
    grid: {
      margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "100%",
    },
    text: {
      marginTop: "8px",
    },
    button: {
      width: "100%",
      //height: '50px',
      background: "linear-gradient(194.61deg, #BB60FC 15.89%, #FF5343 87.13%)",
      color: "white",
    },
    table: {
      minWidth: 700,
    },
    tableBtn: {
      margin: theme.spacing(1),
    },
    paper: {
      width: "80%",
      padding: "5px",
    },
    icon: {
      "&:hover": {
        cursor: "pointer",
      },
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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Note: Full-Time Service-Providers will have preferred working hours of
          9:00 am to 6:30 pm .
        </Alert>
      </Snackbar>

      {/*<Grid container>
        <Grid item xs="2">
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Select fees as per
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Select fees as per"
              value={data.type}
              name="type"
              onChange={handleChange}
              error={typeError}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="hour">Hour</MenuItem>
              <MenuItem value="assignment">Assignment</MenuItem>
              <MenuItem value="Full-Time">Daily</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs="2" style={{ marginLeft: "15px" }}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Select Preference
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Select Location"
              value={data.location}
              onChange={handleChange}
              name="location"
              error={locationError}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="OffShore">MyOffice</MenuItem>
              <MenuItem value="OnSite">Onsite</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {showApplySave && ( <Grid
          item
          xs="2"
          style={{
            marginLeft: "15px",
            display: data.type === "Full-Time" ? "" : "none",
          }}
        >
          <TextField
            className={classes.text}
            error={feesError}
            id="outlined-basic"
            name="fees"
            onChange={handleChange}
            value={data.fees}
            label="Fees/day"
            variant="outlined"
          />
        </Grid>)}

        <Grid
          item
          xs="2"
          style={{
            marginLeft: "8px",
            display: data.type === "Full-Time" ? "" : "none",
          }}
        >
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Working Days
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Working Days"
              value={data.workingDays}
              onChange={handleChange}
              name="workingDays"
              error={locationError}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Monday_To_Friday">Monday_To_Friday</MenuItem>
              <MenuItem value="Monday_To_Saturday">Monday_To_Saturday</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2} style={{ margin: "auto", marginLeft: "5%" }}>
          <Button
            className={classes.button}
            disabled={saveButtonEnable}
            //onClick={(e) => saveToDatabase(true)}
            onClick={(e) => saveDetails()}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
        </Grid>*/}

      {showServiceAssignmentSection && (
        <Grid container>
          <Grid item xs={3} className={classes.grid}>
            <Grid container>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select Service
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Select Service"
                    value={data.service}
                    onChange={handleChange}
                    name="service"
                    error={serviceError}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {props.dropdownList.map((item) => (
                      <MenuItem key={item.Id} value={item.Services}>
                        {item.Services}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  className={classes.text}
                  error={feesError}
                  style={{
                    marginBottom: "10px",
                    marginLeft: "8px",
                    display: data.service === "Others" ? "" : "none",
                  }}
                  id="outlined-basic"
                  name="otherService"
                  onChange={handleChange}
                  value={data.otherService}
                  label="Other Service"
                  variant="outlined"
                />
              </Grid>
             {/*<Grid item xs={8}>
                <TextField
                  className={classes.text}
                  error={feesError}
                  style={{
                    marginBottom: "10px",
                    marginLeft: "8px",
                    display: data.type === "hour" ? "none" : "",
                  }}
                  id="outlined-basic"
                  name="fees"
                  onChange={handleChange}
                  value={data && data.fees}
                  label={`Fees/${data.type}`}
                  variant="outlined"
                />
                </Grid>*/}

              <Grid item xs={12}>
                <Button
                  className={classes.button}
                  style={{ width: "98%", marginLeft: "10px" }}
                  onClick={() => {
                    addToList();
                    saveToDatabaseDetails()
                    .then(res => {
                    //  debugger;
                      if(res ==='success'){
                        setServicesAdded(true);
                      }
                    });
                  }}
                  variant="contained"
                >
                  ADD TO LIST &#10095;
                </Button>
              </Grid>
            </Grid>
          </Grid>

            <Grid item xs={8} className={classes.grid}>
              <Grid container>
                {props.serviceList && props.serviceList.map((item, index) => (


                  <Grid item xs="8" className={classes.grid} key={index}>
                    <Paper className={classes.paper}>
                      <Grid container>
                        <Grid item xs="8">
                          <Typography variant="h6">{item.service}</Typography>
                          <Typography variant="body1">
                            Rs{item.fees} /
                            {item.type === "Full-Time" ? "day" : item.type}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs="4"
                          style={{ textAlign: "right", padding: "20px" }}
                        >
                          <EditIcon
                            onClick={() => editService(item)}
                            className={classes.icon}
                            color="secondary"
                            style={{ marginRight: "10px" }}
                          />
                          <DeleteIcon
                            className={classes.icon}
                            onClick={() => removeService(item)}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}

              </Grid>
              {props.serviceList && props.serviceList.length > 0 && (
                <div
                  style={{
                    width: "65%",
                    textAlign: "right",
                    paddingRight: "150px",
                  }}
                ></div>
              )}
            </Grid>

        </Grid>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  dropdownList: selectDropdownItems,
  serviceList: selectServices,
  serviceType: selectServiceType,
  savedServices: selectSavedServices,
});

const mapDispatchToProps = (dispatch) => ({
  SetServiceType: (serviceType) => dispatch(setServiceType(serviceType)),
  AddService: (service) => dispatch(addService(service)),
  addServicesFromAPI: (services) => dispatch(addServicesFromAPI(services)),
  AddToDropdown: (service) => dispatch(setDropdown(service)),
  removeService: (service) => dispatch(removeService(service)),
  clearDropdown: () => dispatch(clearDropdown()),
  setCurrentUser: (value) => dispatch(setCurrentUser(value)),
  setUserStatus: (type) => dispatch(setUserServiceStatus(type)),
  setSavedServices: (value) => dispatch(setSavedServices(value)),
  setProgress: (value) => dispatch(setServicesProgress(value)),
  clearService: () => dispatch(clearService()),
  setServicesAdded: value => dispatch(setServicesAdded(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesProvide);
