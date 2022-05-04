export enum ActionTypesAlert {
  SUCCESS_ALERT = 'SUCCESS_ALERT',
  ERROR_ALERT = 'ERROR_ALERT',
  CLOSE_ALERT = 'CLOSE_ALERT',
}

interface IActionAlertSuccess {
  type: ActionTypesAlert.SUCCESS_ALERT;
  payload: {
    title: string;
    textBody: string;
  };
}

interface IActionAlertError {
  type: ActionTypesAlert.ERROR_ALERT;
  payload: {
    title: string;
    textBody: string;
  };
}
interface IActionAlertClose {
  type: ActionTypesAlert.CLOSE_ALERT;
}
export type TActionAlert =
  | IActionAlertSuccess
  | IActionAlertError
  | IActionAlertClose;
