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
import { useMediaQuery } from 'react-responsive';
import { API } from '../API';
import clsx from 'clsx';




function NearbyExperts({ setNearbySPList, currentUser, nearbySPs }) {

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

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
        width: isMobile?'50%':'15%',
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
    ServiceGiven:0,
    ServiceCharge:0,
    radius:'5'
  });

  useEffect(() => {
    setLoading(true);
    console.log(radius);
    console.log(navigator.permissions.allow)

      const showPosition = async (lat,long) => {
        const request = {
          Radius: parseInt(radius),
          Latitude: lat.toString(),
          Longitude: long.toString()
        };
        setLocation({
          Latitude: lat.toString(),
          Longitude: long.toString()
        });

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

  const applyFilter = async e => {
    setLoading(true);
    const{name,value} = e.target;
    let currentList = filterApplied;
        debugger;
    if(value!==null&&value!=='0'&&value!==''){
      if(!currentList.includes(name)){
        currentList.push(name);
      }
    }else{
        currentList = currentList.filter(item => item !== name);
    }
    let currentFilters = filters;
    debugger;
    if(name==='Rating'||name==='ServiceGiven'||name==='ServiceCharge'){
          currentFilters[name] = parseInt(value);
    }else{
      if(value===""){
        currentFilters[name] = null;
      }else{
        currentFilters[name] = value;
      }

    }
    setFilterApplied(currentList);
    setFilters(currentFilters);
    let filterResult = nearbyList;
    if(currentList.length>0){
      debugger;
      if(currentList.includes('ServiceType')&&currentFilters.ServiceType!==null){
        filterResult=filterResult.filter(item => item.ServiceType===currentFilters.ServiceType);
      }
      if(currentList.includes('ServiceCharge')&&currentFilters.ServiceCharge!==0){
        filterResult=filterResult.filter(item => item.ServiceCharge===currentFilters.ServiceCharge);
      }
      if(currentList.includes('ServiceGiven')&&currentFilters.ServiceGiven!==0){
        filterResult=filterResult.filter(item => item.ServiceGiven===currentFilters.ServiceGiven);
      }
      if(currentList.includes('Rating')&&currentFilters.Rating!==0){
        filterResult=filterResult.filter(item => item.Rating>=currentFilters.Rating);
      }
      if(currentList.includes('radius')&&currentFilters.radius!=='0'){
        let response = await handleNearby(currentFilters.radius);
        console.log(response);
        let array = [];
        response.forEach((item, i) => {
          let finding = filterResult.find(filtered => filtered.ServiceProviderId === item.ServiceProviderId);
          if(finding){
            array.push(finding);
          }
        });
        filterResult = array;
      }
    }
    setFilteredList(filterResult);
    setLoading(false);
  };



  const handleNearby = async(radius) => {
    const request = {
      Radius: parseInt(radius),
      Latitude: currentUser.LocationDetails[0].Latitude.toString(),
      Longitude: currentUser.LocationDetails[0].Longitude.toString()
    };
    setLocation({
      Latitude: currentUser.LocationDetails[0].Latitude.toString(),
      Longitude: currentUser.LocationDetails[0].Longitude.toString()
    });

    let response = await getNearbyExperts(request);
    return response.data.output;
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
      <Typography className={classes.heading}>Filter by</Typography>
      <Grid container>
        <Grid item xs={isMobile?'12':'2'} className={classes.gridItem} style={{zIndex:'999'}}>
          <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Rating</Typography>
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
        <Grid item xs={isMobile?'12':'2'} className={classes.gridItem} style={{zIndex:isMobile?'996':''}}>
          <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Profession</Typography>
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

        <Grid item xs={isMobile?'12':'2'} className={classes.gridItem} style={{zIndex:isMobile?'994':''}}>
       
        
          <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Distance</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="radius" value={filters.radius} onChange={applyFilter}>
                  <FormControlLabel value="100" control={<Radio />} label="> None" />
                  <FormControlLabel value='2' control={<Radio />} label="Under 2Km" />
                  <FormControlLabel value='5' control={<Radio />} label="Under 5Km" />
                  <FormControlLabel value='10' control={<Radio />} label="Under 10Km" />
                </RadioGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>

        <Grid item xs={isMobile?'12':'2'} className={classes.gridItem} style={{zIndex:isMobile?'992':''}}>
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Location</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl component="fieldset">
              <RadioGroup aria-label="ServiceGiven" name="ServiceGiven" value={filters.ServiceGiven} onChange={applyFilter}>
                <FormControlLabel value={0} control={<Radio />} label="> All" />
                <FormControlLabel value={1} control={<Radio />} label="On Site" />
                <FormControlLabel value={3} control={<Radio />} label="Virtual" />
                <FormControlLabel value={4} control={<Radio />} label="OnSite/Virtual" />
              </RadioGroup>
            </FormControl>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </Grid>
        <Grid item xs={isMobile?'12':'2'} className={classes.gridItem} style={{zIndex:isMobile?'990':''}}>
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Charge</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <FormControl component="fieldset">
              <RadioGroup aria-label="charge" name="ServiceCharge" value={filters.ServiceCharge} onChange={applyFilter}>
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
        {filteredList.map(item => <Grid item xs={isMobile?'12':'3'} className={classes.gridItem}>
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
