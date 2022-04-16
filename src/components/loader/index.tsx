import { Modal, Spin } from 'antd';
import './index.scss';

interface ILoaderProps {
  visible: boolean;
}

const Loader = ({ visible }: ILoaderProps) => {
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
