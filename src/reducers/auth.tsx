import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticate: null,
  loading: true,	
  user: null,
};

const authReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case USER_LOADED:
      return { ...state, user: payload, isAuthenticate: true, loading: false };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return { ...state, ...payload, isAuthenticate: true, loading: false };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        ...payload,
        token: null,
        isAuthenticate: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
