import { ActionTypesAlert, TActionAlert } from './../actions/alert/types';
import { AlertReducerI } from '../utils/interfaces';
import { StatusModalE } from '../hooks/useModalStatus';

const initialState: AlertReducerI = {
  title: '',
  textBody: '',
  show: false,
  type: null,
};

const alertReducer = (state = initialState, action: TActionAlert) => {
  switch (action.type) {
    case ActionTypesAlert.SUCCESS_ALERT:
      console.log(action.payload);
      return {
        ...state,
        title: action.payload.title,
        textBody: action.payload.textBody,
        show: true,
        type: StatusModalE.SUCCESS,
      };
    case ActionTypesAlert.ERROR_ALERT:
      console.log(action.payload);
      return {
        ...state,
        title: action.payload.title,
        textBody: action.payload.textBody,
        show: true,
        type: StatusModalE.ERROR,
      };
    case ActionTypesAlert.CLOSE_ALERT:
      return { ...state, title: '', textBody: '', show: false, type: null };
    default:
      return state;
  }
};

export default alertReducer;
