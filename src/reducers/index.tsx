import { combineReducers } from 'redux';
import alertReducer from './alert';
import authReducer from './auth';
import courseReducer from './course';

export default combineReducers({
  auth: authReducer,
  courses: courseReducer,
  alert: alertReducer,
});
