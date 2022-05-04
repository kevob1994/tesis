import './index.scss';
import { StatusModalE, useModalStatus } from '../../hooks/useModalStatus';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreI } from '../../utils/interfaces';

const ModalStatus = () => {
  const { openModalStatus, contextHolder } = useModalStatus();
  const { show, type, title, textBody } = useSelector((state: StoreI) => state.alert);
  useEffect(() => {
    if (type && show) openModalStatus(type, title, textBody);
  }, [show, type]);
  return <>{(show) ? contextHolder : null}</>;
};

export default ModalStatus;