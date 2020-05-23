/*jshint esversion:9*/
import {serviceActionTypes} from './service-types';
import {addServiceType,addService} from './service-utils';

const INITIAL_STATE={
  serviceType:'',
  dropdownList:[],
  serviceList:[],
  serviceTypes:[]
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
    default:
      return state;
  }
};

export default serviceReducer;
