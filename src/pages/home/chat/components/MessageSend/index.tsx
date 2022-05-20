import React from 'react';
import './index.scss';

interface UserItemI {
  text: string;
  hour: string;
}

export const MessageSend = ({ text, hour }: UserItemI) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <div className='text-send'>
        <p>{text}</p>
        <p className='hour'>{hour}</p>
      </div>
    </div>
  );
};
