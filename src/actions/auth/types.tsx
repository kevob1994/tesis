import { UserEditI, UserI } from 'utils/interfaces';

export enum ActionTypesAuth {
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  USER_LOADED = 'USER_LOADED',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOADING = 'LOADING',
  LOGOUT = 'LOGOUT',
  REQUEST_AUTH_FAIL = 'REQUEST_AUTH_FAIL',
  EDIT_SUCCESS = 'EDIT_SUCCESS',
  REQUEST_EDIT_AUTH_FAIL = 'REQUEST_EDIT_AUTH_FAIL',
  LOADING_ACTION = 'LOADING_ACTION',
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

interface IActionAuthEditSuccess {
  type: ActionTypesAuth.EDIT_SUCCESS;
  payload: UserEditI;
}

interface IActionAuthRequestAuthFail {
  type: ActionTypesAuth.REQUEST_AUTH_FAIL;
}

interface IActionAuthLoading {
  type: ActionTypesAuth.LOADING;
}

interface IActionAuthLoadingAction {
  type: ActionTypesAuth.LOADING_ACTION;
}

interface IActionLogout {
  type: ActionTypesAuth.LOGOUT;
}

export type TActionAuth =
  | IActionAuthUserLoaded
  | IActionAuthRegisterSuccess
  | IActionAuthLoginSuccess
  | IActionAuthRequestAuthFail
  | IActionAuthLoading
  | IActionLogout
  | IActionAuthEditSuccess
  | IActionAuthLoadingAction;
