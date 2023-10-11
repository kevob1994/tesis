import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Modal } from "antd";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { validatePassword } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";

import "./index.scss";
import { StoreI } from "../../utils/interfaces";
import { clientAxios } from "config/axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { email, password, onChange } = useForm({
    email: "",
    password: "",
  });
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: StoreI) => state.auth);
  const { emailReset, onChange: onChangeEmail } = useForm({
    emailReset: "",
  });
  const HandleLogin = () => dispatch(login({ email, password }));

  const onFinish = () => {
    HandleLogin();
  };

  const resetPassword = async () => {
    try {
      const res = await clientAxios.get<any>(`recovery?email=${emailReset}`);
      resetValues();
      toast.success("Se envio un mail al correo introducido");
    } catch (error) {
      toast.success(
        "Ocurrio un error al recuperar la contraseña, intente nuevamente"
      );
    }
  };

  if (auth.isAuthenticate) {
    return <Navigate to='/' />;
  }

  const handleCancel = () => {
    setOpenModal(false);
  };
  const resetValues = () => {
    onChangeEmail("", "emailReset");
    form.resetFields();
    setOpenModal(false);
  };
  return (
    <>
      <Modal
        destroyOnClose={true}
        visible={openModal}
        title='Recuperar contraseña'
        afterClose={handleCancel}
        onCancel={resetValues}
        footer={null}
        centered
        forceRender
      >
        <div>
          <p>Ingrese el email para la recuperación de contraseña:</p>
          <Form
            name='basic'
            layout='vertical'
            onFinish={resetPassword}
            autoComplete='off'
            requiredMark={false}
            form={form}
          >
            <Form.Item
              name='email'
              rules={[
                {
                  type: "email",
                  message: "El correo es inválido",
                },
                { required: true, message: "Campo requerido" },
              ]}
            >
              <Input
                size='large'
                value={emailReset}
                defaultValue={emailReset}
                onChange={({ target }) =>
                  onChangeEmail(target.value, "emailReset")
                }
              />
            </Form.Item>
            <Row justify='space-between' style={{ marginTop: 20 }}>
              <Button key='back' onClick={handleCancel}>
                Cancelar
              </Button>
              <Button key='submit' htmlType='submit' type='primary'>
                Recuperar
              </Button>
            </Row>
          </Form>
        </div>
      </Modal>
      <div className='content-login'>
        <Row className='content-login-row'>
          <Col
            xs={24}
            sm={24}
            md={0}
            lg={9}
            xl={9}
            xxl={9}
            className='content-form'
            flex={1}
          >
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
                    type: "email",
                    message: "El correo es inválido",
                  },
                  { required: true, message: "Ingrese su correo" },
                ]}
              >
                <Input
                  size='large'
                  autoComplete='username'
                  value={email}
                  onChange={({ target }) => onChange(target.value, "email")}
                />
              </Form.Item>

              <Form.Item
                label='Contraseña'
                name='password'
                rules={[
                  { required: true, message: "Ingrese su contraseña" },
                  // {
                  //   validator: validatePassword,
                  // },
                ]}
              >
                <Input.Password
                  size='large'
                  autoComplete='new-password'
                  value={password}
                  onChange={({ target }) => onChange(target.value, "password")}
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
                <div>
                  <Button
                    size='large'
                    type='link'
                    block
                    onClick={() => setOpenModal(true)}
                  >
                    Recuperar contraseña
                  </Button>
                </div>
              </Row>
            </Form>
          </Col>
          <Col
            xs={0}
            sm={0}
            md={0}
            lg={15}
            xl={15}
            xxl={15}
            style={{ background: "#C4C4C4" }}
            className='content-slide'
          >
            {/* <div>col-12</div> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
