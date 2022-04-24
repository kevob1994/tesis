import { combineReducers } from 'redux';
import authReducer from './auth';
import courseReducer from './course';

export default combineReducers({
  auth: authReducer,
  courses: courseReducer,
});
