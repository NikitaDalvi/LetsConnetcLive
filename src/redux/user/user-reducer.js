/*jshint esversion:9*/
import {UserActionTypes} from './user-types';

const Initial_State = {
  currentUser: null,
  isHome:true
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
    default:
      return state;
  }

};


export default userReducer;
