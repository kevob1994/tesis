import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { validatePassword } from '../../utils/validations';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/auth/auth';

import './index.scss';
import { StoreI } from '../../utils/interfaces';
import { Loader } from '../../components';

const LoginPage = () => {
  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const auth = useSelector((state: StoreI) => state.auth);

  const HandleLogin = () => dispatch(login({ email, password }));

  const onFinish = () => {
    HandleLogin();
  };

  if (auth.isAuthenticate) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Loader visible={auth.loading} />
      {!auth.loading ? (
        <div className='content-login'>
          <Row className='content-login-row'>
            <Col span={9} className='content-form' flex={1}>
              <h1>Inicio de sesión</h1>
              <Form
                name='basic'
                layout='vertical'
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 24 }}
                requiredMark={false}
                onFinish={onFinish}
                autoComplete='off'
              >
                <Form.Item
                  label='Correo'
                  name='email'
                  rules={[
                    {
                      type: 'email',
                      message: 'El correo es invalido',
                    },
                    { required: true, message: 'Ingrese su correo' },
                  ]}
                >
                  <Input
                    size='large'
                    autoComplete='username'
                    value={email}
                    onChange={({ target }) => onChange(target.value, 'email')}
                  />
                </Form.Item>

                <Form.Item
                  label='Contraseña'
                  name='password'
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    {
                      validator: validatePassword,
                    },
                  ]}
                >
                  <Input.Password
                    size='large'
                    autoComplete='new-password'
                    value={password}
                    onChange={({ target }) =>
                      onChange(target.value, 'password')
                    }
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    block
                    className='btn-login'
                  >
                    Iniciar sesion
                  </Button>
                </Form.Item>
                <Row justify='space-between'>
                  <Link to='/register'>
                    <Button size='large' type='link' block>
                      Registrarse
                    </Button>
                  </Link>

                  <Link to='/register'>
                    <Button size='large' type='link' block>
                      Recuperar contraseña
                    </Button>
                  </Link>
                </Row>
              </Form>
            </Col>
            <Col
              span={15}
              style={{ background: '#C4C4C4' }}
              className='content-slide'
            >
              {/* <div>col-12</div> */}
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default LoginPage;
