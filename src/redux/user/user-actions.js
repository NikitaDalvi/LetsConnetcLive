/*jshint esversion:9*/
import {UserActionTypes} from './user-types';

export const  setCurrentUser = user =>({
  type:UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const editCurrentUser = user => ({
  type:UserActionTypes.EDIT_CURRENT_USER,
  payload:user
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

export const setRegisteredUser = value =>({
  type:UserActionTypes.SET_REGISTERED_USER,
  payload: value
});

export const setSubscriptionType = value => ({
  type:UserActionTypes.SET_SUBSCRIPTION_TYPE,
  payload: value
});

export const setIndividualSub = value => ({
  type:UserActionTypes.SET_INDIVIDUAL_SUB,
  payload:value
});

export const setProfilePicture = path => ({
  type:UserActionTypes.SET_PROFILE_PICTURE,
  payload:path
});

export const setDashboardDetails = object => ({
  type:UserActionTypes.SET_DASHBOARD_DETAILS,
  payload:object
});


export const setProfessionalList = value => ({
  type:UserActionTypes.SET_PROFESSIONAL_LIST,
  payload:value
});

export const setUserServiceStatus = object => ({
  type: UserActionTypes.SET_USER_SERVICE_STATUS,
  payload:object
});

export const setUserStatus = value => ({
  type:UserActionTypes.SET_USER_STATUS,
  payload:value
});

export const setUserRole = value => ({
  type:UserActionTypes.SET_USER_TYPE,
  payload:value
});

export const setCompanyDetails = value =>({
  type:UserActionTypes.SET_COMPANY_DETAILS,
  payload:value
});


export const setExpertId = value =>({
  type:UserActionTypes.SET_EXPERT_ID,
  payload:value
});
