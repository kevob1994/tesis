import { Dispatch } from 'redux';
import { ActionTypesAlert } from './types';

export const closeModal = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypesAlert.CLOSE_ALERT,
  });
};
