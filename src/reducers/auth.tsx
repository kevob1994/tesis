import { ActionTypesAuth, TActionAuth } from '../actions/auth/types';
import { AuthReducerI } from '../utils/interfaces';

const initialState: AuthReducerI = {
  token: localStorage.getItem('token'),
  isAuthenticate: localStorage.getItem('token') ? true : null,
  loading: localStorage.getItem('token') ? true : false,
  isLoadingAction: false,
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
      const { token, user } = action.payload;
      localStorage.setItem('token', token);
      return {
        ...state,
        user,
        isAuthenticate: true,
        loading: false,
      };

    case ActionTypesAuth.EDIT_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
        loading: false,
        isLoadingAction: false,
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
    case ActionTypesAuth.LOADING_ACTION:
      return {
        ...state,
        isLoadingAction: true,
      };
    case ActionTypesAuth.END_LOADING:
      return {
        ...state,
        loading: false,
        isLoadingAction: false,
      };
    default:
      return state;
  }
};

export default authReducer;
