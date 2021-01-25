  /*jshint esversion:9*/
import {combineReducers} from 'redux';
import userReducer from './user/user-reducer';
import serviceReducer from './service/service-reducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key:'root',
  storage,
  whitelist:['user','service']
};

const rootReducer = combineReducers({
  user: userReducer,
  service: serviceReducer
});

export default persistReducer(persistConfig,rootReducer);
