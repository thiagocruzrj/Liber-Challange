import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import request from './request';

export default combineReducers({
  alert,
  auth,
  request
});
