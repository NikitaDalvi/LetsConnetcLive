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
