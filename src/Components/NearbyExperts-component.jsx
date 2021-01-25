/*jshint esversion :9*/
/*jshint -W087*/

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
    margin: theme.spacing(4),
    //marginBottom:'10px'
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
  const [locationFilter,setLocationFilter] = useState(0);
  const [chargeFilter,setChargeFilter] = useState(0);
  const [filterApplied,setFilterApplied] = useState([]);
  const [filters,setFilters] = useState({
    Rating:0,
    ServiceType:null,
    ServicesGiven:0,
    ServicesCharge:0
  });

  useEffect(() => {
    setLoading(true);
    console.log(radius);
    console.log(navigator.permissions.allow)
    // const getLocation = () => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition, showError, {maximumAge:60000, timeout: 10000, enableHighAccuracy: true});
    //   } else {
    //     alert('Geolocation is not supported by this browser.');
    //   }
    // };
    //if(radius!=="0"){
      const showPosition = async (lat,long) => {
        const request = {
          Radius: parseInt(radius),
          Latitude: lat.toString(),
          Longitude: long.toString()
        }
        setLocation({
          Latitude: lat.toString(),
          Longitude: long.toString()
        });
        // const res = await axios.post(`${API.URL}getNearbyServiceProviders`,request);
        getNearbyExperts(request)
          .then(res => {
            if (res) {
              console.log(res.data);
              if (res.data.output) {
                setLoading(false);
                let filterResult = [];
                if(filterApplied.length>0){
                  if(filterApplied.ServiceType!==null){
                    res.data.output.map(item => item.Rating >= filterApplied.Rating&&item.ServiceType===filterApplied.ServiceType&&item.ServicesGiven===filterApplied.ServicesGiven&&item.ServicesCharge===filterApplied.ServicesCharge?filterResult.push(item):item);
                  }else{
                    res.data.output.map(item => item.Rating >= filterApplied.Rating&&item.ServicesGiven===filterApplied.ServicesGiven&&item.ServicesCharge===filterApplied.ServicesCharge?filterResult.push(item):item);
                  }
                }else{
                    filterResult = res.data.output;
                }
                setFilteredList(filterResult);
                setNearbyList(res.data.output);
              }
            }
          });

      };




    if (currentUser) {
      if(currentUser.LocationDetails){
            showPosition(currentUser.LocationDetails[0].Latitude,currentUser.LocationDetails[0].Longitude);
      }else{
          showPosition(0,0);
      }

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

  const applyFilter = e => {
    const{name,value} = e.target;
    let currentList = filterApplied;
        debugger;
    if(value!==null&&value!=='0'){
      if(!currentList.includes(name)){
        currentList.push(name);
      }
    }else{
        currentList = currentList.filter(item => item !== name);
    }
    let currentFilters = filters;
    debugger;
    if(name==='Rating'||name==='ServicesGiven'||name==='ServicesCharge'){
          currentFilters[name] = parseInt(value);
    }else{
            currentFilters[name] = value;
    }
    setFilterApplied(currentList);
    setFilters(currentFilters);
    let filterResult = [];
    if(currentList.length>0){
      if(currentFilters.ServiceType!==null){
        nearbyList.map(item => item.Rating >= currentFilters.Rating&&item.ServiceType===currentFilters.ServiceType&&item.ServicesGiven===currentFilters.ServicesGiven&&item.ServicesCharge===currentFilters.ServicesCharge?filterResult.push(item):item);
      }else{
        nearbyList.map(item => item.Rating >= currentFilters.Rating&&item.ServicesGiven===currentFilters.ServicesGiven&&item.ServicesCharge===currentFilters.ServicesCharge?filterResult.push(item):item);
      }
      // currentList.forEach((filter, i) => {
      //   if(filter==='Rating'){
      //     if(filterResult.length===0){
      //             nearbyList.map(item => item[filter] >= currentFilters[filter]?filterResult.push(item):item);
      //     }else{
      //       filterResult.map(item => item[filter] >= currentFilters[filter]?filterResult.push(item):item);
      //     }
      //   }else{
      //     nearbyList.map(item => item[filter] === currentFilters[filter]?filterResult.push(item):item);
      //   }
      // });
    }else{
        filterResult = nearbyList;
    }
    setFilteredList(filterResult);
  };




  const handleLocation = e => {
    const {value} = e.target;
    console.log(value);
    setLocationFilter(parseInt(value));
    if(value==='0'){
      setFilteredList(nearbyList);
      return;
    }
    let filtered = [];
    nearbyList.map(item => item.ServicesGiven === parseInt(value)? filtered.push(item):item);
    setFilteredList(filtered);
  };


  return (
    <Container>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container>
        <Grid item xs='2' className={classes.gridItem} style={{zIndex:'999'}}>
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
                <RadioGroup aria-label="gender" name="Rating" value={filters.Rating} onChange={applyFilter}>
                  <FormControlLabel value={0}  control={<Radio />} label=" All" />
                  <FormControlLabel value={1} control={<Radio />} label=" 1 & More" />
                  <FormControlLabel value={2} control={<Radio />} label=" 2 & More" />
                  <FormControlLabel value={3} control={<Radio />} label=" 3 & More" />
                  <FormControlLabel value={4} control={<Radio />} label=" 4 & More" />
                </RadioGroup>
              </FormControl>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid item xs='2' className={classes.gridItem} >
          <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Filter by Services</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="ServiceType" value={filters.ServiceType} onChange={applyFilter}>
                  <FormControlLabel value={null}  control={<Radio />} label=" All" />
                  <FormControlLabel value='Doctor' control={<Radio />} label="Doctor" />
                  <FormControlLabel value='CA' control={<Radio />} label="CA" />
                </RadioGroup>
              </FormControl>

            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item xs='2' className={classes.gridItem} >
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
                  <FormControlLabel value="100" control={<Radio />} label="> None" />
                  <FormControlLabel value='2' control={<Radio />} label="Under 2Km" />
                  <FormControlLabel value='5' control={<Radio />} label="Under 5Km" />
                  <FormControlLabel value='10' control={<Radio />} label="Under 10Km" />
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item xs='2' className={classes.gridItem} >
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Filter by Location</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl component="fieldset">
              <RadioGroup aria-label="ServicesGiven" name="ServicesGiven" value={filters.ServicesGiven} onChange={applyFilter}>
                <FormControlLabel value={0} control={<Radio />} label="> All" />
                <FormControlLabel value={1} control={<Radio />} label="On Site" />
                <FormControlLabel value={2} control={<Radio />} label="Off Shore" />
                <FormControlLabel value={3} control={<Radio />} label="Remote" />
                <FormControlLabel value={4} control={<Radio />} label="Both(On Site and Off Shore)" />
              </RadioGroup>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </Grid>
        <Grid item xs='2' className={classes.gridItem} >
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Filter by Charge</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl component="fieldset">
              <RadioGroup aria-label="charge" name="ServicesCharge" value={filters.ServicesCharge} onChange={applyFilter}>
                <FormControlLabel value={0} control={<Radio />} label="> All" />
                <FormControlLabel value={1} control={<Radio />} label="per Hour" />
                <FormControlLabel value={2} control={<Radio />} label="per Assignment" />
                <FormControlLabel value={3} control={<Radio />} label="Full Time" />
              </RadioGroup>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </Grid>
      </Grid>
      <Grid container>
        {filteredList.map(item => <Grid item xs='3' className={classes.gridItem}>
          <ExpertCard id={item && item.ServiceProviderId} name={item && item.ServiceProvider} serviceType={item && item.ServiceType} rating={item && item.Rating} DPPath={`https://letnetworkdev.obtainbpm.com/${item && item.DPPath}`} address={item && item.Address} resumename={item && item.ResumePath} videopath={item && item.IntroductoryVideoPath} />
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
