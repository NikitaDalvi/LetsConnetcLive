/*jshint esversion:9*/
/*jshint -W087*/
import {UserActionTypes} from './user-types';
import {ChangeUserServiceStatus} from './user-utils';

const Initial_State = {
  currentUser: null,
  isHome:true,
  progress:0,
  userType:'',
  registeredUser:null,
  subscriptionType:'',
  IndividualSub:{},
  DashboardDetails:null,
  professionalList:[],
  ExpertId:''
};

const userReducer = (state=Initial_State, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
    return {
      ...state,
      currentUser: action.payload
    };

    case UserActionTypes.EDIT_CURRENT_USER:
    return{
      ...state,
      currentUser: {...state.currentUser,FullName:action.payload.FullName,EmailId:action.payload.EmailId,ContactNo:action.payload.ContactNo,Gender:action.payload.Gender,DOB: action.payload.DOB,Description: action.payload.Description}
    };

    case UserActionTypes.SET_ISHOME:
    return{
      ...state,
      isHome:action.payload
    };

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

    case UserActionTypes.SET_REGISTERED_USER:
    return{
      ...state,
      registeredUser: action.payload
    };

    case UserActionTypes.SET_SUBSCRIPTION_TYPE:
      debugger;
    return{
      ...state,
      subscriptionType: action.payload
    };

    case UserActionTypes.SET_INDIVIDUAL_SUB:
    return{
      ...state,
      IndividualSub: action.payload
    };

    case UserActionTypes.SET_PROFILE_PICTURE:

    return{
      ...state,
      currentUser:{...state.currentUser,DPPath:action.payload}
    };

    case UserActionTypes.SET_DASHBOARD_DETAILS:
    return{
      ...state,
      DashboardDetails:action.payload
    };

    case UserActionTypes.SET_PROFESSIONAL_LIST:
    return{
      ...state,
      professionalList: [...state.professionalList, action.payload]
    };

    case UserActionTypes.SET_USER_SERVICE_STATUS:
    return{
      ...state,
      currentUser:ChangeUserServiceStatus(state.currentUser,action.payload)
    };

    case UserActionTypes.SET_USER_STATUS:
    return{
      ...state,
      registeredUser:{...state.registeredUser,Status:action.payload}
    };

    case UserActionTypes.SET_USER_ROLE:
    return{
      ...state,
      registeredUser:{...state.registeredUser,UserRole:action.payload}
    };

    case UserActionTypes.SET_COMPANY_DETAILS:
    return{
      ...state,
      registeredUser:{...state.registeredUser,CompanyName:action.payload.companyName,CompanyId:action.payload.companyId,UserRole:6}
    };

    case UserActionTypes.SET_EXPERT_ID:
    return{
      ...state,
      ExpertId: action.payload
    };

    case UserActionTypes.SET_SERVICES_ADDED:
      return{
        ...state,
        currentUser:{...state.currentUser,isServicesAdded:action.payload}
      };

    case UserActionTypes.EDIT_RESUME:
    return{
      ...state,
      currentUser:{...state.currentUser,ResumeName:action.payload.name,ResumePath:action.payload.path}
    };

    case UserActionTypes.EDIT_VIDEO:
    return{
      ...state,
      currentUser:{...state.currentUser,IntroductoryVideoName:action.payload.name,IntroductoryVideoPath:action.payload.path}
    };

    default:
      return state;
  }

};


export default userReducer;
