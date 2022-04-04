import React, { createRef, useEffect, useRef } from 'react';
import { Button, Col, Image, Input, Row } from 'antd';
import { UserItem } from './components/UserItem';
import { SendOutlined } from '@ant-design/icons';

import './index.scss';

const ChatPage = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  };

  return (
    <div className='content-chat'>
      <h1>Chat</h1>
      <div className='flexbox-chat'>
        <div style={{ overflowY: 'scroll' }}>
          <UserItem select={true} />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
          <UserItem />
        </div>
        <div style={{ width: '100%', overflowY: 'scroll' }} id='chat-text'>
          {' '}
          <div className='header-chat'>
            {' '}
            <Row align='middle'>
              <Image
                preview={false}
                width={65}
                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              />{' '}
              <h2>Kevin Daniel Blanco Salas</h2>
            </Row>
          </div>
          <div className='msgs-chat'>
            <div className='text-received'>
              <p>Texto de prueba</p>
              <p className='hour'>08:00 pm</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <div className='text-send'>
                <p>Cuando es el parcial profe?</p>
                <p className='hour'>08:00 pm</p>
              </div>
            </div>
            <div className='text-received'>
              <p>Texto de prueba</p>
              <p className='hour'>08:00 pm</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <div className='text-send'>
                <p>Cuando es el parcial profe?</p>
                <p className='hour'>08:00 pm</p>
              </div>
            </div>
            <div className='text-received'>
              <p>Texto de prueba</p>
              <p className='hour'>08:00 pm</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <div className='text-send'>
                <p>Cuando es el parcial profe?</p>
                <p className='hour'>08:00 pm</p>
              </div>
            </div>
            <div className='text-received'>
              <p>Texto de prueba</p>
              <p className='hour'>08:00 pm</p>
            </div>
            {/* <div style={{ width: 20, height: 100 }}></div> */}
            <div ref={messagesEndRef} />
          </div>
          <div className='input-chat'>
            <Input size='large' autoComplete='username' />
            <Button type='primary' icon={<SendOutlined />} size='large'>
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
