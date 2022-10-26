import { Button, Col, Form, Input, Modal, Row, Spin } from 'antd';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderNav, ListElements, ModalStatus } from '../../components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse, getCourses, joinCourse } from '../../actions/course';
import { listItemsI, RoleE, StoreI } from '../../utils/interfaces';
import { useForm } from '../../hooks/useForm';

const { Search } = Input;

const onSearch = (value: any) => console.log(value);

const ListCourses = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [openModalShareCode, setOpenModalShareCode] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [courseSelected, setCourseSelected] = useState<listItemsI>();
  const [codeCourse, setCodeCourse] = useState('');
  const dispatch = useDispatch();
  const loadCourses = () => dispatch(getCourses());
  const removeCourse = (id: number) => dispatch(deleteCourse(id));
  const joinWithCourse = (code: string) => dispatch(joinCourse(code));
  const { courses, loading: loadingCourse } = useSelector(
    (state: StoreI) => state.courses
  );
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
    setOpenModalShareCode(true);
  };

  const handleCancel = () => {
    resetValues();
  };

  const resetValues = () => {
    onChange('', 'code');
    form.resetFields();
    setCodeCourse('');
    setOpenModalShareCode(false);
  };

  const onFinish = (values: any) => {
    joinWithCourse(code);
    resetValues();
  };

  const openModalRemoveCourse = (item: listItemsI) => {
    setCourseSelected(item);
    setOpenModalDelete(true);
    // ;
  };

  const handlerRemoveCourse = () => {
    if (courseSelected) removeCourse(courseSelected.id);
    setOpenModalDelete(false);
  };

  const handlerEdit = (id: number) => {
    navigate(`edit-course/${id}`);
  };

  const transformListCourse = () => {
    return courses.map((course) => ({
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
      <ModalStatus />
      <Modal
        title='Eliminar curso'
        visible={openModalDelete}
        onOk={() => handlerRemoveCourse()}
        onCancel={() => setOpenModalDelete(false)}
        okText='Eliminar'
        cancelText='Cancelar'
        centered
        closable={false}
        maskClosable={false}
      >
        <p>Seguro desea eliminar el curso {courseSelected?.title}?</p>
      </Modal>

      <Modal
        destroyOnClose={true}
        visible={openModalShareCode}
        title={
          role === RoleE.TEACHER ? 'Código del curso' : 'Unirse a un curso'
        }
        afterClose={handleCancel}
				onCancel={resetValues}
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
              >
                <Input
                  size='large'
                  value={code}
                  defaultValue={code}
                  onChange={({ target }) => onChange(target.value, 'code')}
                />
              </Form.Item>
              <Row justify='space-between' style={{ marginTop: 20 }}>
                <Button key='back' onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button key='submit' htmlType='submit' type='primary'>
                  Unirse
                </Button>
              </Row>
            </Form>
          </div>
        )}
      </Modal>

      <div className='content-list-courses'>
        {!loadingCourse ? (
          <Row align='middle' gutter={50}>
            <Col span={20}>
              <h1>Cursos</h1>
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
                  onClick={() => setOpenModalShareCode(true)}
                >
                  Unirse
                </Button>
              )}
            </Col>

            <Col span={24}>
              <ListElements
                listItems={transformListCourse()}
                deleteItem={openModalRemoveCourse}
                editItem={
                  auth.user?.role === RoleE.TEACHER ? handlerEdit : undefined
                }
                shareElement={showModal}
                url='/home/id/course-program'
                textDelete={
                  role === RoleE.TEACHER ? 'Eliminar' : 'Salir del curso'
                }
                textEmpty={
                  role === RoleE.TEACHER
                    ? 'No tiene cursos creados'
                    : 'No se ha unido a ningun curso'
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
