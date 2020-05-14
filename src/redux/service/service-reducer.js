/*jshint esversion:9*/
import {serviceActionTypes} from './service-types';
import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE={
  serviceType:'',
  dropdownList:[],
  serviceList:[]
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

    case serviceActionTypes.ADD_SERVICE:
    return {
      ...state,
      serviceList:[...state.serviceList,{...action.payload,Id:uuidv4()}]
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

    default:
      return state;
  }
};

export default serviceReducer;
