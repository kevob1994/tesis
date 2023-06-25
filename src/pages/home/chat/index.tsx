import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Image, Input, Row } from 'antd';
import { UserItem } from './components/UserItem';
import { SendOutlined } from '@ant-design/icons';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersCourse } from '../../../actions/course';
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
      setListMessage([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='content-chat'>
      <h1>Chat</h1>
      <div className='flexbox-chat'>
        <div style={{ overflowY: 'auto', overflowX: 'hidden', borderRight: '2px solid #99999929' }}>
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
										src={chatSelected?.user_photo || 'error'}
										fallback='data:image/png;base64,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'
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
                      <MessageSend
                        text={message.content}
                        hour={moment(message.created_at).format(dateFormatTime)}
                      />
                    );
                  }
                  return (
                    <MessageRecieve
                      text={message.content}
                      hour={moment(message.created_at).format(dateFormatTime)}
                    />
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
