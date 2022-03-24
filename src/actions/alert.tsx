import { SET_ALERT, REMOVE_ALERT } from './types';

export const createAlert =
  (msg: string, alertType: string) => (dispatch: any) => {
    const id = guidGenerator();

    dispatch({
      type: SET_ALERT,
      payload: {
        id,
        msg,
        alertType,
      },
    });
  };

const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};
