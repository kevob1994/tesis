import { ActionTypesAuth, TActionAuth } from '../actions/auth/types';
import { AuthReducerI } from '../utils/interfaces';

const initialState: AuthReducerI = {
  token: localStorage.getItem('token'),
  isAuthenticate: null,
  loading: false,
  user: null,
};

const authReducer = (state = initialState, action: TActionAuth) => {
  switch (action.type) {
    case ActionTypesAuth.USER_LOADED:
      return { ...state, user: action.payload, isAuthenticate: true, loading: false };

    case ActionTypesAuth.REGISTER_SUCCESS:
    case ActionTypesAuth.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return { ...state, ...action.payload, isAuthenticate: true, loading: false };

    case ActionTypesAuth.REQUEST_AUTH_FAIL:
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
