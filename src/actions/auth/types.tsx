import { UserI } from '../../utils/interfaces';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export enum ActionTypesAuth {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  USER_LOADED = 'USER_LOADED',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOADING = 'LOADING',
  REQUEST_AUTH_FAIL = 'REQUEST_AUTH_FAIL',
}
interface IPayloadAuth {
  token: string;
  user: UserI;
}

interface IActionAuthUserLoaded {
  type: ActionTypesAuth.USER_LOADED;
  payload: UserI;
}
interface IActionAuthRegisterSuccess {
  type: ActionTypesAuth.REGISTER_SUCCESS;
  payload: IPayloadAuth;
}

interface IActionAuthLoginSuccess {
  type: ActionTypesAuth.LOGIN_SUCCESS;
  payload: IPayloadAuth;
}

interface IActionAuthRequestAuthfail {
  type: ActionTypesAuth.REQUEST_AUTH_FAIL;
}

interface IActionAuthLoading {
  type: ActionTypesAuth.LOADING;
}
export type TActionAuth =
  | IActionAuthUserLoaded
  | IActionAuthRegisterSuccess
  | IActionAuthLoginSuccess
  | IActionAuthRequestAuthfail
  | IActionAuthLoading;
