import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
  alerts: [],
};

const alertReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SET_ALERT:
      return { ...state, alerts: [...state.alerts, payload] };

    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert: any) => alert.id !== payload),
      };
    default:
      return state;
  }
};
export default alertReducer;
