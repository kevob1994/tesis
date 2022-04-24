import { Button, Col, Input, Row, Spin } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';
import { HeaderNav, ListElements } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../actions/course/course';
import { RoleE, StoreI } from '../../utils/interfaces';

const { Search } = Input;

const onSearch = (value: any) => console.log(value);

const list = [
  {
    id: 1,
    title: 'Nombre del tema',
    description: 'Descripcion del tema',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    file: null,
    user: {
      name: 'Nombre del usuario',
      photo:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  },
  {
    id: 2,
    title: 'Nombre del tema',
    description: 'Descripcion del tema',
    image:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    file: null,
    user: {
      name: 'Nombre del usuario',
      photo:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  },
];

const ListCourses = () => {
  const dispatch = useDispatch();
  const loadCourses = () => dispatch(getCourses());
  const courses = useSelector((state: StoreI) => state.courses);
  const auth = useSelector((state: StoreI) => state.auth);

  useEffect(() => {
    loadCourses();
  }, []);

  const transformListCourse = () => {
    return courses.courses.map((course) => ({
      id: course.id,
      title: course.full_name,
      description: course.description,
      image: course.photo,
      user: {
        name: 'Nombre del usuario',
        photo:
          'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    }));
  };

  return (
    <>
      <HeaderNav />

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
              {auth.user?.role === RoleE.TEACHER ? (
                <Link to='/create-course'>
                  <Button size='large' type='primary' block>
                    Crear
                  </Button>
                </Link>
              ) : (
                <Button size='large' type='primary' block>
                  Unirse
                </Button>
              )}
            </Col>

            <Col span={24}>
              <ListElements listItems={[]} url='/home/id/course-program' />
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
