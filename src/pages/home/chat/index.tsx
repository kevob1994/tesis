import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Image, Input, Row } from 'antd';
import { UserItem } from './components/UserItem';
import { SendOutlined } from '@ant-design/icons';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersCourse } from '../../../actions/course/course';
import { useParams } from 'react-router-dom';
import { clientAxios, headerAuthToken } from '../../../config/axios';
import { ItemChatI, StoreI, UserI } from '../../../utils/interfaces';
import Pusher, { Channel } from 'pusher-js';
import { MessageRecieve } from './components/MessageRecieve';
import { MessageSend } from './components/MessageSend';
import moment from 'moment';
import { dateFormatTime } from '../../../utils/const';

interface MessageI {
  content: string;
  created_at: string;
  from_id: number;
  id: number;
  state: string;
  to_id: number;
  updated_at: string;
  user_id: number;
  chat_id?: string;
}

const ChatPage = () => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [chatSelected, setChatSelected] = useState<ItemChatI | null>();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state: StoreI) => state.auth);
  const { listChat, loading } = useSelector((state: StoreI) => state.courses);
  const loadUsersCourse = (id: string) => dispatch(getUsersCourse(id));
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState('');
  const [listMessage, setListMessage] = useState<MessageI[]>([]);

  const handleMessageSent = useCallback(
    (data: { user: UserI; message: MessageI }) => {
      setListMessage((prevState) => [...prevState, data.message]);
    },
    []
  );

  useEffect(() => {
    if (id) loadUsersCourse(id);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [listMessage]);

  useEffect(() => {
    Pusher.logToConsole = true;
    if (!user) return;
    const pusher = new Pusher('2e799d955f3afe27994d', {
      cluster: 'us2',
      authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
      auth: {
        params: user.id,
        headers: headerAuthToken(),
      },
    });
    if (!chatSelected) return;

    let channel: Channel;

    clientAxios
      .post<any>(
        `chat`,
        { to_user: chatSelected?.user_id },
        {
          headers: headerAuthToken(),
        }
      )
      .then((response: any) => {
        setChatId(response.data.code);
        channel = pusher.subscribe(`private-${response.data.code}-chat`);
        channel.bind('MessageSent', handleMessageSent);
      });

    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [chatSelected]);

  useEffect(() => {
    if (chatId !== '') getMessages();
  }, [chatId]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  };

  const selectChat = async (user: ItemChatI) => {
    setChatSelected(user);
  };

  const isSelected = (id: number) => id === chatSelected?.user_id;

  const sendMessage = async () => {
    try {
      await clientAxios.post<any[]>(
        `messages`,
        { chat_id: chatId, content: message },
        {
          headers: headerAuthToken(),
        }
      );
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    try {
      const response = await clientAxios.get<any>(
        `messages?chat_id=${chatId}`,
        {
          headers: headerAuthToken(),
        }
      );
      console.log(response);
      setListMessage([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

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
                {listMessage.map((message) => {
                  if (message.from_id === user?.id) {
                    return (
                      <MessageSend text={message.content} hour={moment(message.created_at).format(dateFormatTime)} />
                    );
                  }
                  return (
                    <MessageRecieve text={message.content} hour={moment(message.created_at).format(dateFormatTime)} />
                  );
                })}

                <div ref={messagesEndRef} style={{ marginTop: 100 }} />
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
