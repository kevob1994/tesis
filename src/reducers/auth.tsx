import { ActionTypesAuth, TActionAuth } from '../actions/auth/types';
import { AuthReducerI } from '../utils/interfaces';

const initialState: AuthReducerI = {
  token: localStorage.getItem('token'),
  isAuthenticate: localStorage.getItem('token') ? true : null,
  loading: localStorage.getItem('token') ? true : false,
  user: null,
};

const authReducer = (state = initialState, action: TActionAuth) => {
  switch (action.type) {
    case ActionTypesAuth.USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isAuthenticate: true,
        loading: false,
      };

    case ActionTypesAuth.REGISTER_SUCCESS:
    case ActionTypesAuth.LOGIN_SUCCESS:
      const { token, ...user } = action.payload;
      localStorage.setItem('token', token);
      console.log(user);
      return {
        ...state,
        user: user,
        isAuthenticate: true,
        loading: false,
      };

    case ActionTypesAuth.REQUEST_AUTH_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticate: false,
        loading: false,
      };

    case ActionTypesAuth.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticate: false,
        loading: false,
      };
    case ActionTypesAuth.LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default authReducer;
