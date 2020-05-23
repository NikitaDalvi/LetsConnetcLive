/*jshint esversion:9*/
import {UserActionTypes} from './user-types';

const Initial_State = {
  currentUser: null,
  isHome:true,
  progress:0,
  userType:'',
  registeredUserId:'',
  subscriptionType:'',
  IndividualSub:{}
};

const userReducer = (state=Initial_State, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
    return {
      ...state,
      currentUser: action.payload
    };

    case UserActionTypes.SET_ISHOME:
    return{
      ...state,
      isHome:action.payload
    }

    case UserActionTypes.SET_REGISTRATION_PROGRESS:
    return{
      ...state,
      progress: action.payload
    };

    case UserActionTypes.SET_USER_TYPE:
    return{
      ...state,
      userType: action.payload
    };

    case UserActionTypes.SET_REGISTERED_USERID:
    return{
      ...state,
      registeredUserId: action.payload
    };

    case UserActionTypes.SET_SUBSCRIPTION_TYPE:
    return{
      ...state,
      subscriptionType: action.payload
    };

    case UserActionTypes.SET_INDIVIDUAL_SUB:
    return{
      ...state,
      IndividualSub: action.payload
    };
    default:
      return state;
  }

};


export default userReducer;
