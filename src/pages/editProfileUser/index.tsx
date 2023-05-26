import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Image,
  Select,
  Modal,
  Spin,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import './index.scss';
import { SaveFilled, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { GenderE, StoreI } from '../../utils/interfaces';
import { dateFormat, genderList } from '../../utils/const';
import { useForm } from '../../hooks/useForm';
import { changePassword, editUser } from '../../actions/auth';
import { validatePassword } from '../../utils/validations';
import { HeaderNav } from '../../components';

const EditProfileUser = () => {
  const { user, isLoadingAction } = useSelector((store: StoreI) => store.auth);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {
    name,
    lastname,
    email,
    phone,
    birthday,
    gender,
    biography,
    photo,
    onChange,
  } = useForm({
    name: user?.name || '',
    lastname: user?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthday:
      moment(
        user?.birthday ? new Date(user?.birthday) : new Date(),
        dateFormat
      ) || moment(new Date(), dateFormat),
    gender:
      user?.gender.toUpperCase() === GenderE.MALE
        ? GenderE.MALE
        : GenderE.FEMININE,
    biography: user?.biography || '',
    photo: user?.photo || '',
  });

  const {
    new_password,
    confirmation_new_password,
    onChange: onChangePasswords,
  } = useForm({
    new_password: '',
    confirmation_new_password: '',
  });

  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl2, setImageUrl2] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) setImageUrl2(user.photo);
  }, []);

  const HandleEditProfile = () => {
    if (user)
      dispatch(
        editUser(
          {
            name,
            lastname,
            email,
            phone,
            birthday: birthday.format('YYYY/MM/DD'),
            gender,
            biography,
            photo,
          },
          user?.id
        )
      );
  };

  const HandleEditPassword = (new_password: string) => {
    dispatch(changePassword(new_password));
  };

  const onFinish = () => {
    HandleEditProfile();
  };

  const onFinishPassword = () => {
    HandleEditPassword(new_password);
  };

  const selectDate = (date: moment.Moment | null, field: 'birthday') => {
    if (date) onChange(date, field);
  };

  useEffect(() => {
    if (fileList.length > 0) setImageUrl2(URL.createObjectURL(fileList[0]));
  }, [fileList]);

  useEffect(() => {
    if (!isLoadingAction) setOpenModal(false);
  }, [isLoadingAction]);

  const props = {
    onRemove: (file: any) => {
      if (!file) return;
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        onChange(
          reader && reader.result ? reader.result.toString() : '',
          'photo'
        );
      };
      setFileList([file, ...fileList]);
      setImageUrl2(URL.createObjectURL(file));
      return false;
    },
    fileList,
    showUploadList: false,
  };

  return (
    <>
      <HeaderNav />
      <Modal
        title={`Cambiar contraseña`}
        visible={openModal}
        footer={null}
        centered
        destroyOnClose
        forceRender
        onCancel={() => {
          setOpenModal(false);
        }}
        width={400}
      >
        <div>
          <Form
            name='basic'
            layout='vertical'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinishPassword}
            autoComplete='off'
            requiredMark={false}
          >
            <Row gutter={50}>
              <Col span={24}>
                <Form.Item
                  label='Nueva contraseña'
                  name='new_password'
                  rules={[
                    { required: true, message: 'Campo requerido' },
                    {
                      validator: validatePassword,
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size='large'
                    autoComplete='new_password'
                    value={new_password}
                    onChange={({ target }) =>
                      onChangePasswords(target.value, 'new_password')
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label='Confirmar contraseña nueva'
                  name='confirmation_new_password'
                  dependencies={['confirmation_new_password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Campo requerido',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('new_password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Las contraseñas no coinciden')
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size='large'
                    autoComplete='confirmation_new_password'
                    value={confirmation_new_password}
                    onChange={({ target }) =>
                      onChangePasswords(
                        target.value,
                        'confirmation_new_password'
                      )
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
            <Button
              type='primary'
              htmlType='submit'
              loading={isLoadingAction}
              icon={<SaveFilled />}
              block
            >
              Guardar
            </Button>
          </Form>
        </div>
      </Modal>
      <div className='content-register'>
        <div className='content-register-row '>
          <h1>Perfil</h1>
          <Form
            name='basic'
            layout='vertical'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            requiredMark={false}
          >
            <Row gutter={50}>
              <Col span={6} flex={1}>
                <div className='upload-image'>
                  <Image
                    preview={false}
                    src={imageUrl2 ? imageUrl2 : 'error'}
                    alt='avatar'
                    width={200}
                    height={200}
                    fallback='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=='
                  />
                  <Upload {...props}>
                    <Button
                      type='primary'
                      shape='circle'
                      icon={<UploadOutlined />}
                      size='large'
                    />
                  </Upload>
                </div>
              </Col>
              <Col span={18} flex={1}>
                <Row gutter={50}>
                  <Col span={12} flex={1}>
                    <Form.Item
                      label='Nombre'
                      name='name'
                      rules={[{ required: true, message: 'Campo requerido' }]}
                      initialValue={name}
                    >
                      <Input
                        size='large'
                        value={name}
                        defaultValue={name}
                        onChange={({ target }) =>
                          onChange(target.value, 'name')
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label='Apellido'
                      name='lastname'
                      rules={[{ required: true, message: 'Campo requerido' }]}
                      initialValue={lastname}
                    >
                      <Input
                        size='large'
                        value={lastname}
                        defaultValue={lastname}
                        onChange={({ target }) =>
                          onChange(target.value, 'lastname')
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label='Correo'
                      name='email'
                      rules={[
                        {
                          type: 'email',
                          message: 'El correo es inválido',
                        },
                        { required: true, message: 'Campo requerido' },
                      ]}
                      initialValue={email}
                    >
                      <Input
                        size='large'
                        value={email}
                        defaultValue={email}
                        onChange={({ target }) =>
                          onChange(target.value, 'email')
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label='Teléfono'
                      name='phone'
                      rules={[{ required: true, message: 'Campo requerido' }]}
                      initialValue={phone}
                    >
                      <Input
                        size='large'
                        value={phone}
                        onChange={({ target }) =>
                          onChange(target.value, 'phone')
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label='Fecha de nacimiento'
                      name='birthday'
                      initialValue={birthday}
                    >
                      <DatePicker
                        size='large'
                        placeholder='Seleccione una fecha'
                        defaultValue={birthday}
                        value={birthday}
                        format={dateFormat}
                        onChange={(date) => selectDate(date, 'birthday')}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label='Sexo'
                      name='gender'
                      rules={[{ required: true, message: 'Campo requerido' }]}
                      initialValue={gender}
                    >
                      <Select
                        value={gender}
                        size='large'
                        onChange={(value) => {
                          onChange(value, 'gender');
                        }}
                        defaultValue={gender}
                      >
                        {genderList.map((gender) => (
                          <Select.Option key={gender.id}>
                            {gender.gender}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      label='Biografía'
                      name='biography'
                      rules={[{ required: true, message: 'Campo requerido' }]}
                      initialValue={biography}
                    >
                      <TextArea
                        size='large'
                        autoComplete='biography'
                        value={biography}
                        onChange={({ target }) =>
                          onChange(target.value, 'biography')
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Button
                    type='link'
                    style={{ marginLeft: 10 }}
                    size='large'
                    onClick={() => setOpenModal(true)}
                  >
                    Cambiar contraseña
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row justify='space-between'>
              <Button
                size='large'
                type='primary'
                ghost
                onClick={() => navigate(-1)}
              >
                Volver
              </Button>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  className='btn-login'
                  loading={isLoadingAction}
                  icon={<SaveFilled />}
                >
                  Guardar
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditProfileUser;
