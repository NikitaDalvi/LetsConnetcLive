/*jshint esversion :9*/

import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Checkbox, FilledInput, FormControl, InputAdornment, InputLabel, IconButton, Backdrop, CircularProgress, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpertCard from './subComponents/ExpertCard-component';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user-selector';
import { selectNearbySPList } from '../redux/service/service-selector';
import { setNearbySPList } from '../redux/service/service-actions';
import { API } from '../API';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
  gridItem: {
    margin: theme.spacing(0)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panel: {
    width: '15%',
    margin: theme.spacing(1),
    zIndex: '500',
    position: 'fixed'
  },
  textField: {
    width: '30ch',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));


function NearbyExperts({ setNearbySPList, currentUser, nearbySPs }) {
  const classes = useStyles();
  const [serviceTypes, setServiceTypes] = useState([]);
  const [nearbyList, setNearbyList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState({
    Latitude: '',
    Longitude: ''
  });
  const [filteredList, setFilteredList] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('');
  const [radius, setRadius] = useState('5');

  useEffect(() => {
    setLoading(true);
    console.log(radius);
    console.log(navigator.permissions.allow)
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, {maximumAge:60000, timeout: 10000, enableHighAccuracy: true});
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };
    //if(radius!=="0"){
      const showPosition = async (position) => {
        const request = {
          Radius: parseInt(radius),
          Latitude: position.coords.latitude.toString(),
          Longitude: position.coords.longitude.toString()
        }
        setLocation({
          Latitude: position.coords.latitude.toString(),
          Longitude: position.coords.longitude.toString()
        });
        // const res = await axios.post(`${API.URL}getNearbyServiceProviders`,request);
        getNearbyExperts(request)
          .then(res => {
            if (res) {
              console.log(res.data);
              if (res.data.output) {
                setLoading(false);
                setNearbyList(res.data.output);
                setFilteredList(res.data.output);
              }
            }
          });
  
      };
    // }else{
    //   setFilteredList(nearbyList);
    // }



    if (currentUser) {
      getLocation();
      getServiceTypes();
    }
  }, [currentUser, radius]);


  // async function getNearbyExperts(){
  //
  // }
  async function getServiceTypes() {
    const res = await axios.get(`${API.URL}getServiceTypes`);
    return setServiceTypes(res.data.output);
  }

  useEffect(() => {
    if (selectedServices.length !== 0) {
      var filteredResult = [];
      //selectedServices.map(item => filteredResult.push(nearbyList.find(service => service.ServiceType === item)));

      selectedServices.forEach(item=>{
        nearbyList.map(service => service.ServiceType === item?filteredResult.push(service):service);
      })
      setFilteredList(filteredResult);
    }
  }, [selectedServices]);

  // useEffect(()=>{
  //
  // },[radius])

  const getNearbyExperts = async (data) => {
    //data.Longitude = 18.499416
    //data.Latitude =73.859024
    const res = await axios.post(`${API.URL}getNearbyServiceProviders`, data);
    return res;
  }

  useEffect(() => {

    if (ratingFilter) {
      console.log(ratingFilter);

      let rating = parseInt(ratingFilter)
      var filteredResult = [];
      debugger;
      nearbyList.map(service => 
        service.Rating>=rating?
        filteredResult.push(service)
        :
        service);
      //filteredResult.push(nearbyList.find(service => service.Rating >= ratingFilter));
      setFilteredList(filteredResult);
    }
  }, [ratingFilter]);

  console.log(navigator.geolocation)
  function showError(error) {
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;

      default:
        alert('An unknown error occurred!');
    }
  }

  // const ratings = [1,2,3,4];
  //
  // const [checked,setChecked] = useState([]);
  //
  // const ratingFilterChange = (value)=>{
  //
  //     const currentIndex = selectedRatings.indexOf(value);
  //     const newChecked = [...selectedRatings];
  //     if(currentIndex !== -1){
  //       newChecked.splice(currentIndex,1);
  //     }else{
  //       newChecked.push(value);
  //     }
  //
  //     setSelectedRatings(newChecked);
  //     console.log(newChecked);
  // }


  const handleChange = event => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleSearch = () => {
    setLoading(true);
    const request = {
      searchQuery: searchText,
      Latitude: location.Latitude,
      Longitude: location.Longitude,
      Radius: 5
    };

    search(request)
      .then(res => { setLoading(false); setNearbyList(res); });
  }

  async function search(data) {
    const result = await axios.post(`${API.URL}searchServiceProviders`, data);
    return result.data.output;
  }


  const serviceFilterChange = (value) => {
    const filters = [...selectedServices];
    const currentIndex = filters.indexOf(value);
    if (currentIndex !== -1) {
      filters.splice(currentIndex, 1);
    } else {
      filters.push(value);
    }
    setSelectedServices(filters);
  };


  return (
    <Container>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container>
        <Grid item xs='3' className={classes.gridItem} >
          <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Filter by Rating</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={ratingFilter} onChange={event => { setRatingFilter(event.target.value); }}>
                  <FormControlLabel value="0" control={<Radio />} label="> None" />
                  <FormControlLabel value="1" control={<Radio />} label="> 1" />
                  <FormControlLabel value="2" control={<Radio />} label="> 2" />
                  <FormControlLabel value="3" control={<Radio />} label="> 3" />
                  <FormControlLabel value="4" control={<Radio />} label="> 4" />
                </RadioGroup>
              </FormControl>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid item xs='3' className={classes.gridItem} >
          <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Filter by Services</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{ width: '100%' }}>
                {serviceTypes.map(item =>
                  <React.Fragment>
                    <Checkbox
                      color="primary"
                      onChange={() => { serviceFilterChange(item.Service) }}
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    <span style={{ paddingTop: '10px' }}>{item.Service}</span>
                  </React.Fragment>
                )}

              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item xs='3' className={classes.gridItem} >
          <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Filter by Distance</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={radius} onChange={event => { setRadius(event.target.value); }}>
                  <FormControlLabel value="0" control={<Radio />} label="> None" />
                  <FormControlLabel value='2' control={<Radio />} label="Under 2Km" />
                  <FormControlLabel value='5' control={<Radio />} label="Under 5Km" />
                  <FormControlLabel value='10' control={<Radio />} label="Under 10Km" />
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item xs='3' className={classes.gridItem} >
          <FormControl className={clsx(classes.margin, classes.textField, classes.panel)} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Search</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type='text'
              onChange={handleChange}
              value={searchText}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle search"
                    edge="end"
                    onClick={() => { handleSearch() }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container>
        {filteredList.map(item => <Grid item xs='3' className={classes.gridItem}>
          <ExpertCard id={item && item.ServiceProviderId} name={item && item.ServiceProvider} serviceType={item && item.ServiceType} rating={item && item.Rating} DPPath={`https://letnetworkdev.obtainbpm.com/${item && item.DPPath}`} address={item && item.Address} />
        </Grid>)}
      </Grid>
    </Container>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  nearbySPs: selectNearbySPList
});

const mapDispatchToProps = dispatch => ({
  setNearbySPList: list => dispatch(setNearbySPList(list))
});

export default connect(mapStateToProps, mapDispatchToProps)(NearbyExperts);
