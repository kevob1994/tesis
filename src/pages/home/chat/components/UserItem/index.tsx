import { Image } from 'antd';
import classNames from 'classnames';
import React from 'react';
import './index.scss';

interface UserItemI {
  select?: boolean;
}

export const UserItem = ({ select }: UserItemI) => {
  return (
    <div
      className={classNames('item-user-chat', {
        selected: select,
      })}
    >
      <Image
        preview={false}
        width={50}
        src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      />
      <div className='info-chat'>
        <p className='name'>Kevin Daniel Blanco Salas</p>
        <p className='last-msg'>
          Ultimo mensaje enviado por este usuario en el chat
        </p>
      </div>
      <p className='last-time'>24h</p>
    </div>
  );
};
