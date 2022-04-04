import { SendOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Col, Image, Input, Row } from 'antd';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Comment } from './components/comment';
import './index.scss';

const ForumInfoPage = () => {
  const { pathname } = useLocation();
  return (
    <div className='forum-container'>
      <Link to={pathname.substring(0, pathname.length - 2)}>
        <Button
          type='text'
          icon={<LeftOutlined />}
          size='large'
          style={{ width: 'fit-content' }}
        >
          Regresar
        </Button>
      </Link>
      <Row gutter={40}>
        <Col span={24}>
          <div className='content-forum-info'>
            <div className='info'>
              <Row>
                <Image
                  preview={false}
                  width={350}
                  height={200}
                  src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                />
                <Row className='info-course'>
                  <div>
                    <h2>Nombre del tema</h2>
                    <p className='description-forum'>Descripcion del tema</p>
                  </div>
                  <Row align='middle'>
                    <Image
                      preview={false}
                      width={50}
                      height={50}
                      src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    />
                    <h3 className='name-teacher'>Kevin Blanco</h3>
                    <div className='ellipse'></div>
                    <p className='date'>Creado el 7/10/2021</p>
                  </Row>
                </Row>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <div
        style={{
          padding: 20,
          overflowY: 'scroll',
          height: '100%',
          paddingBottom: 0,
        }}
      >
        <Comment />

        <Comment />

        <Comment />
        <div className='input-chat'>
          <Input size='large' autoComplete='username' />
          <Button type='primary' icon={<SendOutlined />} size='large'>
            Comentar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForumInfoPage;
