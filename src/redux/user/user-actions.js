/*jshint esversion:9*/
import {UserActionTypes} from './user-types';

export const  setCurrentUser = user =>({
  type:UserActionTypes.SET_CURRENT_USER,
  payload: user
})
