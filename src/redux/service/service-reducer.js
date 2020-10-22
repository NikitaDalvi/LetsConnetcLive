/*jshint esversion:9*/
import {serviceActionTypes} from './service-types';
import {addServiceType,addService,addLocation,addAvailability,removeTimeSlot} from './service-utils';

const INITIAL_STATE={
  serviceType:'',
  dropdownList:[],
  serviceList:[],
  serviceTypes:[],
  locationList:[],
  workingHours:[],
  savedWorkingHours:[],
  ratingAndReviews:[],
  myServicesProgress:null,
  savedServices:[],
  nearbySPList:[]
};

const serviceReducer = (state=INITIAL_STATE,action) => {
  switch (action.type) {
    case serviceActionTypes.SET_SERVICE_TYPE:
      return{
        ...state,
        serviceType:action.payload
      };

      case serviceActionTypes.ADD_TO_DROPDOWN:
      return{
        ...state,
        dropdownList:[...state.dropdownList,action.payload]
      };

    case serviceActionTypes.ADD_SERVICE_FROM_API: 
    return {
      ...state,
      serviceList: action.payload
    }

    case serviceActionTypes.ADD_SERVICE:
    return {
      ...state,
      serviceList:addService(state.serviceList,action.payload)
    };

    case serviceActionTypes.REMOVE_SERVICE:
    return{
      ...state,
      serviceList:state.serviceList.filter(serviceItem => serviceItem.Id !== action.payload.Id)
    };

    case serviceActionTypes.CLEAR_DROPDOWN:
    return{
      ...state,
      dropdownList:[]
    };

    case serviceActionTypes.ADD_SERVICE_TYPES:
    return{
      ...state,
      serviceTypes:addServiceType(state.serviceTypes,action.payload)
    };

    case serviceActionTypes.REMOVE_SERVICE_TYPES:
    return{
      ...state,
      serviceTypes:[]
    };

    case serviceActionTypes.ADD_LOCATION:
    return{
      ...state,
      locationList:addLocation(state.locationList,action.payload)
    };

    case serviceActionTypes.CLEAR_LOCATION:
    return{
      ...state,
      locationList:[]
    };

    case serviceActionTypes.ADD_AVAILABILITY:
    return{
      ...state,
      workingHours:addAvailability(state.workingHours,action.payload)
    };

    case serviceActionTypes.SET_WORKING_HOURS:
    return{
      ...state,
      workingHours:action.payload
    };

    case serviceActionTypes.CLEAR_WORKING_HOURS:
    return{
      ...state,
      workingHours:[]
    };

    case serviceActionTypes.REMOVE_TIMESLOT:
    return{
      ...state,
      workingHours:removeTimeSlot(state.workingHours,action.payload)
    };

    case serviceActionTypes.ADD_RATING_AND_REVIEWS:
    return{
      ...state,
      ratingAndReviews:[...state.ratingAndReviews, action.payload]
    };

    case serviceActionTypes.SET_MY_SERVICES_PROGRESS:
    return{
      ...state,
      myServicesProgress:action.payload
    };

    case serviceActionTypes.SET_SAVED_SERVICES:
    return{
      ...state,
      savedServices:action.payload
    };

    case serviceActionTypes.SET_NEARBY_SP_LIST:
    return{
      ...state,
      nearbySPList:action.payload
    };

    case serviceActionTypes.CLEAR_SERVICE:
      return {
        ...state,
        serviceList: []
      }

    default:
      return state;
  }
};

export default serviceReducer;
