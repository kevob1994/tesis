import { ActionTypesAlert, TActionAlert } from './../actions/alert/types';
import { AlertReducerI, StatusModalE } from '../utils/interfaces';

const initialState: AlertReducerI = {
  show: false,
  type: null,
};

const alertReducer = (state = initialState, action: TActionAlert) => {
  switch (action.type) {
    case ActionTypesAlert.SUCCESS_ALERT:
      return {
        ...state,
        show: true,
        type: StatusModalE.SUCCESS,
      };
    case ActionTypesAlert.ERROR_ALERT:
      return {
        ...state,
        show: true,
        type: StatusModalE.ERROR,
      };
    case ActionTypesAlert.CLOSE_ALERT:
      return { ...state, show: false, type: null };
    default:
      return state;
  }
};

export default alertReducer;
