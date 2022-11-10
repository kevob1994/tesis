import { Spin } from 'antd';
import { FunctionComponent } from 'react';
import './index.scss';

const LoaderSpin: FunctionComponent = () => {
  return (
    <div className='content-spiner'>
      <Spin />
    </div>
  );
};

export default LoaderSpin;
