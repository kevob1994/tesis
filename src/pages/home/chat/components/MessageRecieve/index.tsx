import React from 'react';
import './index.scss';

interface UserItemI {
  text: string;
  hour: string;
}

export const MessageRecieve = ({ text, hour }: UserItemI) => {
  return (
    <div className='text-received'>
      <p>{text}</p>
      <p className='hour'>{hour}</p>
    </div>
  );
};
