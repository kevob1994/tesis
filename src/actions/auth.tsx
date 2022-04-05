import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import setAuthToken from '../utils/setAuthToken';
import clientAxios from './../config/axios';
import {
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
} from './types';

export const register =
  (
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) =>
  async (dispatch: Dispatch) => {
    const body = JSON.stringify({
      name,
      email,
      password,
      password_confirmation,
    });

    try {
      const res = await clientAxios.post('register', body);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      console.log(error);
      const err = error.response.data.error;
      console.log(error.response);
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const body = JSON.stringify({ email, password });
    try {
      // const resGet = await clientAxios.get('sanctum/csrf-cookie');

      const res = await clientAxios.post('login', body);
			console.log("res")
			console.log(res)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error: any) {
      console.log(error);
      console.log("error", error.response);
      const err = error.response.data.error;
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  dispatch({
    type: USER_LOADED,
    payload: { token: 'sd121dd12d' },
  });

  // try {
  //   const res = await axios.post('api/users', body, config);

  //   dispatch({
  //     type: REGISTER_SUCCESS,
  //     payload: res.data,
  //   });
  // } catch (error: any) {
  //   const err = error.response.data.error;
  //   dispatch({
  //     type: REGISTER_FAIL,
  //   });
  // }
};
