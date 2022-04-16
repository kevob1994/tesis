import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import {
  GenderE,
  RoleE,
  UserI,
  UserRegisterFormI,
} from '../../utils/interfaces';
import { clientAxios, headerAuthToken } from '../../config/axios';
import { ActionTypesAuth } from './types';

export interface AxiosAuth {
  token: string;
  user: UserI;
}

export interface UserLoginFormI {
  email: string;
  password: string;
}

export const register =
  (params: UserRegisterFormI) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypesAuth.LOADING,
    });
    try {
      const res = await clientAxios.post<AxiosAuth>('register', params);
      dispatch({
        type: ActionTypesAuth.REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      console.log(error.response);
      dispatch({
        type: ActionTypesAuth.REQUEST_AUTH_FAIL,
      });
    }
  };

export const login = (params: UserLoginFormI) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypesAuth.LOADING,
  });

  try {
    const res = await clientAxios.post<AxiosAuth>('login', params);

    dispatch({
      type: ActionTypesAuth.LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error: any) {
    console.log('error', error.response);
    const err = error.response.data.error;
    dispatch({
      type: ActionTypesAuth.REQUEST_AUTH_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch: Dispatch) => {
	dispatch({
		type: ActionTypesAuth.LOADING,
	});
  try {
    const res = await clientAxios.get<AxiosAuth>('user', {
      headers: headerAuthToken(),
    });
    // debugger;
    dispatch({
      type: ActionTypesAuth.LOGIN_SUCCESS,
      payload: {...res.data, token: localStorage.token },
    });
  } catch (error: any) {
    console.log('error', error.response);
    const err = error.response.data.error;
    dispatch({
      type: ActionTypesAuth.REQUEST_AUTH_FAIL,
    });
  }
};
