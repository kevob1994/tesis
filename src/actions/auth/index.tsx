import { clientAxios, headerAuthToken } from 'config/axios';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { UserEditFormI, UserI, UserRegisterFormI } from 'utils/interfaces';
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
      if (res.status === 201) {
        toast.success('El registro fue exitoso');
        dispatch({
          type: ActionTypesAuth.REGISTER_SUCCESS,
          payload: res.data,
        });
      } else {
        toast.error('A ocurrido un error!');
      }
    } catch (error: any) {
      dispatch({
        type: ActionTypesAuth.REQUEST_AUTH_FAIL,
      });
      toast.error('A ocurrido un error!');
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
      type: ActionTypesAuth.USER_LOADED,
      payload: { ...res.data, token: localStorage.token },
    });
  } catch (error: any) {
    console.log('error', error.response);
    dispatch({
      type: ActionTypesAuth.REQUEST_AUTH_FAIL,
    });
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypesAuth.LOGOUT,
  });
};

export const editUser =
  (params: UserEditFormI, id: number) => async (dispatch: Dispatch) => {
    try {
      const res = await clientAxios.put<AxiosAuth>(`user/${id}`, params, {
        headers: headerAuthToken(),
      });
      dispatch({
        type: ActionTypesAuth.EDIT_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      console.log(error.response);
      dispatch({
        type: ActionTypesAuth.REQUEST_EDIT_AUTH_FAIL,
      });
    }
  };
