import { Dispatch } from 'redux';
import { ActionTypesAlert } from './types';

export const closeModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypesAlert.CLOSE_ALERT,
  });
};
