import { clientAxios, headerAuthToken } from 'config/axios';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import {
  UserEditFormI,
  UserEditI,
  UserI,
  UserRegisterFormI,
} from 'utils/interfaces';
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
        alertError();
      }
    } catch (error: any) {
      alertError();
      dispatch({
        type: ActionTypesAuth.REQUEST_AUTH_FAIL,
      });
      alertError();
    }
  };

export const login = (params: UserLoginFormI) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypesAuth.LOADING,
  });

  try {
    const res = await clientAxios.post<AxiosAuth>('login', params);

    if (res.status === 200) {
      dispatch({
        type: ActionTypesAuth.LOGIN_SUCCESS,
        payload: res.data,
      });
    } else {
      alertError('Verifique sus datos e intente nuevamente');
    }
  } catch (error: any) {
    alertError('Verifique sus datos e intente nuevamente');
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
      dispatch({
        type: ActionTypesAuth.LOADING_ACTION,
      });
      const res = await clientAxios.put<UserEditI>(`user/${id}`, params, {
        headers: headerAuthToken(),
      });

      if (res.status === 201) {
        toast.success('Se guardaron los cambios de forma exitosa');
        dispatch({
          type: ActionTypesAuth.EDIT_SUCCESS,
          payload: res.data,
        });
      } else {
        alertError();
      }
    } catch (error: any) {
      alertError();
      dispatch({
        type: ActionTypesAuth.REQUEST_EDIT_AUTH_FAIL,
      });
    }
  };

export const changePassword =
  (password: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: ActionTypesAuth.LOADING_ACTION,
      });
      const res = await clientAxios.put<UserEditI>(
        `users/editpass?password=${password}`,
        null,
        {
          headers: headerAuthToken(),
        }
      );

      if (res.status === 200) {
        toast.success('Se cambio la contraseña de forma exitosa');

        dispatch({
          type: ActionTypesAuth.END_LOADING,
        });
      } else {
        alertError();
      }
    } catch (error: any) {
      alertError();
      dispatch({
        type: ActionTypesAuth.REQUEST_EDIT_AUTH_FAIL,
      });
    }
  };

const alertError = (msg: string = 'A ocurrido un error!') => toast.error(msg);
