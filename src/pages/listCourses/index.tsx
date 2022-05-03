import { Button, Col, Form, Input, Modal, Row, Spin } from 'antd';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderNav, ListElements } from '../../components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCourse,
  getCourses,
  joinCourse,
} from '../../actions/course/course';
import { RoleE, StoreI } from '../../utils/interfaces';
import { useForm } from '../../hooks/useForm';

const { Search } = Input;

const onSearch = (value: any) => console.log(value);

const ListCourses = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [codeCourse, setCodeCourse] = useState('');
  const dispatch = useDispatch();
  const loadCourses = () => dispatch(getCourses());
  const removeCourse = (id: number) => dispatch(deleteCourse(id));
  const joinWithCourse = (code: string) => dispatch(joinCourse(code));
  const courses = useSelector((state: StoreI) => state.courses);
  const auth = useSelector((state: StoreI) => state.auth);
  const { code, onChange } = useForm({
    code: '',
  });

  const role = auth.user?.role;

  useEffect(() => {
    loadCourses();
  }, []);

  const showModal = (code: string) => {
    setCodeCourse(code);
    setOpenModal(true);
  };

  const handleCancel = () => {
    resetValues();
  };

  const resetValues = () => {
    onChange('', 'code');
    form.resetFields();
    setCodeCourse('');
    setOpenModal(false);
  };

  const onFinish = (values: any) => {
    joinWithCourse(code);
    resetValues();
  };

  const handlerRemoveCourse = (id: number) => {
    removeCourse(id);
  };

  const handlerEdit = (id: number) => {
    navigate(`edit-course/${id}`);
  };

  const transformListCourse = () => {
    return courses.courses.map((course) => ({
      id: course.id,
      title: course.full_name,
      description: course.description,
      image: course.photo,
      code: course.code,
      user: {
        name: `${course.user_name} ${course.user_lastname}`,
        photo: course.user_photo,
      },
    }));
  };

  return (
    <>
      <HeaderNav />
      {/* <Modal
        title='Eliminar curso'
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => navigate('/', { replace: true })}
        okText='No'
        cancelText='Si'
        centered
        closable={false}
        maskClosable={false}
      >
        <p>Se perderán todos los cambios. ¿Está seguro que desea cancelar?</p>
      </Modal> */}
      <Modal
        destroyOnClose={true}
        visible={openModal}
        title={
          role === RoleE.TEACHER ? 'Código del curso' : 'Unirse a un curso'
        }
        afterClose={handleCancel}
        footer={null}
        centered
        forceRender
      >
        {role === RoleE.TEACHER ? (
          <div>
            <p>El código del curso es:</p>
            {codeCourse}
            <Row justify='space-between' style={{ marginTop: 20 }}>
              <Button type='primary' onClick={handleCancel}>
                Aceptar
              </Button>
            </Row>
          </div>
        ) : (
          <div>
            <p>Ingrese el código del curso al que se desea unir:</p>
            <Form
              name='basic'
              layout='vertical'
              onFinish={onFinish}
              autoComplete='off'
              requiredMark={false}
              form={form}
            >
              <Form.Item
                name='code'
                rules={[{ required: true, message: 'Campo requerido' }]}
                // initialValue={code}
              >
                <Input
                  size='large'
                  // value={code}
                  // defaultValue={code}
                  onChange={({ target }) => onChange(target.value, 'code')}
                />
              </Form.Item>
              <Row justify='space-between' style={{ marginTop: 20 }}>
                <Button key='back' onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button
                  key='submit'
                  htmlType='submit'
                  type='primary'
                  // loading={loading}
                  // onClick={handleOk}
                >
                  Unirse
                </Button>
              </Row>
            </Form>
          </div>
        )}
      </Modal>
      <div className='content-list-courses'>
        <h1>Cursos</h1>
        {!courses.loading ? (
          <Row align='middle' gutter={50}>
            <Col span={20}>
              <Search
                size='large'
                placeholder='input search text'
                onSearch={onSearch}
              />
            </Col>
            <Col span={4}>
              {role === RoleE.TEACHER ? (
                <Link to='/create-course'>
                  <Button size='large' type='primary' block>
                    Crear
                  </Button>
                </Link>
              ) : (
                <Button
                  size='large'
                  type='primary'
                  block
                  onClick={() => setOpenModal(true)}
                >
                  Unirse
                </Button>
              )}
            </Col>

            <Col span={24}>
              <ListElements
                listItems={transformListCourse()}
                deleteItem={handlerRemoveCourse}
                editItem={handlerEdit}
                shareElement={showModal}
                url='/home/id/course-program'
                textDelete={
                  role === RoleE.TEACHER ? 'Eliminar' : 'Salir del curso'
                }
              />
            </Col>
          </Row>
        ) : (
          <div className='content-spiner'>
            <Spin />
          </div>
        )}
      </div>
    </>
  );
};

export default ListCourses;
