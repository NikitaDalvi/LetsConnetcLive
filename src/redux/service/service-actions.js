/*jshint esversion: 9*/
import {serviceActionTypes} from './service-types';

export const setServiceType = serviceType => ({
  type:serviceActionTypes.SET_SERVICE_TYPE,
  payload:serviceType
});

export const setDropdown = service => ({
  type:serviceActionTypes.ADD_TO_DROPDOWN,
  payload:service
});

export const clearDropdown = () => ({
  type:serviceActionTypes.CLEAR_DROPDOWN
});

export const addService = service => ({
  type:serviceActionTypes.ADD_SERVICE,
  payload:service
});

export const removeService = service => ({
  type:serviceActionTypes.REMOVE_SERVICE,
  payload:service
});

export const addServiceTypes = type => ({
  type:serviceActionTypes.ADD_SERVICE_TYPES,
  payload:type
});

export const removeServiceTypes = () => ({
  type:serviceActionTypes.REMOVE_SERVICE_TYPES,
});

export const addLocation = location => ({
  type:serviceActionTypes.ADD_LOCATION,
  payload:location
});

export const clearLocation = () => ({
  type:serviceActionTypes.CLEAR_LOCATION
});

export const addAvailability = availability => ({
  type: serviceActionTypes.ADD_AVAILABILITY,
  payload:availability
});

export const removeTimeslot = object => ({
  type: serviceActionTypes.REMOVE_TIMESLOT,
  payload:object
});

export const setWorkingHours = list => ({
  type: serviceActionTypes.SET_WORKING_HOURS,
  payload:list
});

export const clearWorkingHours = () =>({
  type: serviceActionTypes.CLEAR_WORKING_HOURS,
});

export const addRatingAndReviews = ratings => ({
  type: serviceActionTypes.ADD_RATING_AND_REVIEWS,
  payload:ratings
});

export const setServicesProgress = value => ({
  type: serviceActionTypes.SET_MY_SERVICES_PROGRESS,
  payload:value
});

export const  setSavedServices = value => ({
  type: serviceActionTypes.SET_SAVED_SERVICES,
  payload: value
});

export const setNearbySPList = list =>({
  type:serviceActionTypes.SET_NEARBY_SP_LIST,
  payload: list
});
