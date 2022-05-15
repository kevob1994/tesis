import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Input, Row } from 'antd';
import { UserItem } from './components/UserItem';
import { SendOutlined } from '@ant-design/icons';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersCourse } from '../../../actions/course/course';
import { useParams } from 'react-router-dom';
import { clientAxios, headerAuthToken } from '../../../config/axios';
import { ItemChatI, StoreI } from '../../../utils/interfaces';
import Pusher from 'pusher-js';

const ChatPage = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [chatSelected, setChatSelected] = useState<ItemChatI | null>();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state: StoreI) => state.auth);
  const { listChat, loading } = useSelector((state: StoreI) => state.courses);
  const loadUsersCourse = (id: string) => dispatch(getUsersCourse(id));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) loadUsersCourse(id);
  }, []);

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

  const messageEventHandler = (message: any) => {
    console.log(message);
  };

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('2e799d955f3afe27994d', {
      cluster: 'us2',
    });

    if (!chatSelected) return;

    const channel = pusher.subscribe(`private_${chatSelected.user_id}_chat`);
    channel.bind('MessageSent', (data: any) => {
      alert(JSON.stringify(data));
    });

    return () => {
			console.log('UNSUBSCRIBE')
      channel.unsubscribe();
    };
  }, [chatSelected]);

  const selectChat = async (user: ItemChatI) => {
    setChatSelected(user);
    try {
      const res = await clientAxios.get<any[]>(
        `messages?to_id=${user.user_id}`,
        {
          headers: headerAuthToken(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const isSelected = (id: number) => id === chatSelected?.user_id;

  const sendMessage = async () => {
    console.log(message, chatSelected?.user_id);
    try {
      const res = await clientAxios.post<any[]>(
        `messages`,
        { to_id: chatSelected?.user_id, content: message },
        {
          headers: headerAuthToken(),
        }
      );
      console.log(res);
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const getMessage = (id: number, message: string) => {};

  return (
    <div className='content-chat'>
      <h1>Chat</h1>
      <div className='flexbox-chat'>
        <div style={{ overflowY: 'scroll' }}>
          {listChat
            .filter((chatUser) => chatUser.user_id !== user?.id)
            .map((chat) => (
              <UserItem
                select={isSelected(chat.user_id)}
                onClick={selectChat}
                info={chat}
              />
            ))}
        </div>
        <div style={{ width: '100%', overflowY: 'scroll' }} id='chat-text'>
          {' '}
          {chatSelected ? (
            <>
              <div className='header-chat'>
                {' '}
                <Row align='middle'>
                  <Image
                    preview={false}
                    width={65}
                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                  />{' '}
                  <h2>
                    {chatSelected.user_name} {chatSelected.user_lastname}
                  </h2>
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
                <Input
                  size='large'
                  autoComplete='message'
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <Button
                  type='primary'
                  icon={<SendOutlined />}
                  size='large'
                  onClick={sendMessage}
                >
                  Enviar
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
