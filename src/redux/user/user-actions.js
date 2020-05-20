/*jshint esversion:9*/
import {UserActionTypes} from './user-types';

export const  setCurrentUser = user =>({
  type:UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const setIsHome = value => ({
  type:UserActionTypes.SET_ISHOME,
  payload:value
});

export const setProgress = value => ({
  type:UserActionTypes.SET_REGISTRATION_PROGRESS,
  payload:value
});

export const setUserType = value => ({
  type:UserActionTypes.SET_USER_TYPE,
  payload: value
});
