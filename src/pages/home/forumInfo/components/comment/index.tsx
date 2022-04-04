import { Image, Row } from 'antd';
import React from 'react';
import './index.scss';

export const Comment = () => {
  return (
    <div className='content-comment'>
      <Row align='top'>
        <Image
          preview={false}
          style={{ borderRadius: '50%' }}
          width={50}
          height={50}
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        />
        <div className='info-user-comment'>
          <h3 className='name-teacher'>Kevin Blanco</h3>
          <p className='date-comment'>7/10/2021 10:00 am</p>
        </div>
      </Row>

      <p className='comment-text'>comentario sobre el tema a discutir</p>
    </div>
  );
};
