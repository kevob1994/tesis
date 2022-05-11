import { Image } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { ItemChatI } from '../../../../../utils/interfaces';
import './index.scss';

interface UserItemI {
  select?: boolean;
  info: ItemChatI;
  onClick: (id: ItemChatI) => void;
}

export const UserItem = ({
  select,
  info,
  onClick: handlerClick,
}: UserItemI) => {
  return (
    <div
      className={classNames('item-user-chat', {
        selected: select,
      })}
      onClick={() => handlerClick(info)}
    >
      <Image
        preview={false}
        width={50}
        src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      />
      <div className='info-chat'>
        <p className='name'>{info.user_name} {info.user_lastname}</p>
        <p className='last-msg'>
          Ultimo mensaje enviado por este usuario en el chat
        </p>
      </div>
      <p className='last-time'>24h</p>
    </div>
  );
};
