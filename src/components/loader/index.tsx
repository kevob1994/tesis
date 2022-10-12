import { Modal, Spin } from 'antd';
import { FunctionComponent } from 'react';
import './index.scss';

interface ILoaderProps {
  visible: boolean;
}

const Loader: FunctionComponent<ILoaderProps> = ({ visible }) => {
  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      width={150}
      centered={true}
			maskStyle={{
				background: 'white'
			}}
    >
      <div className='content-loader'>
        <Spin  />
      </div>
    </Modal>
  );
};

export default Loader;
