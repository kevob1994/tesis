import { Modal, Button, Space, ModalFuncProps, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { closeModal } from '../actions/alert/alert';
import { ActionTypesAlert } from '../actions/alert/types';

export enum StatusModalE {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  CONFIRM = 'confirm',
}

export const useModalStatus = () => {
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();
  const closeModalStatus = () => {
    dispatch({
      type: ActionTypesAlert.CLOSE_ALERT,
    });
  };

  const bodyModal = (title: string, textBody: string): ModalFuncProps => {
    return {
      title: title,
      centered: true,
      okButtonProps: { onClick: () => Modal.destroyAll() },
      cancelButtonProps: { onClick: () => Modal.destroyAll() },
      okText: 'Aceptar',
      content: (
        <>
          <p>{textBody}</p>
        </>
      ),
    };
  };

  const openModalStatus = (
    status: StatusModalE,
    title: string,
    textBody: string
  ) => {
    switch (status) {
      case StatusModalE.INFO:
        modal.info(bodyModal(title, textBody));
        return;
      case StatusModalE.SUCCESS:
        modal.success(bodyModal(title, textBody));
        return;
      case StatusModalE.ERROR:
        modal.error(bodyModal(title, textBody));
        return;
      case StatusModalE.WARNING:
        modal.warning(bodyModal(title, textBody));
        return;
      case StatusModalE.CONFIRM:
        modal.confirm(bodyModal(title, textBody));
        return;
      default:
        return;
    }
  };
  return { openModalStatus, contextHolder };
};
