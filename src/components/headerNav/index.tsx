import React, { FunctionComponent } from 'react';
import { Image, Layout } from 'antd';
import logo from 'assets/imgs/icon-light-background-primary.svg';
import './index.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'actions/auth';
import { StoreI } from 'utils/interfaces';

const { Header } = Layout;

interface IHeaderNav {
  showLinkCourses?: boolean;
}

const HeaderNav: FunctionComponent<IHeaderNav> = ({
  showLinkCourses = false,
}) => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: StoreI) => state.courses);
  const { id } = useParams();

  const course = courses.find((course) => course.id === Number(id));

  const onHandlerLogout = () => dispatch(logout());

  return (
    <Header className='header'>
      <div style={{ display: 'flex' }}>
        <Image preview={false} width={70} src={logo} />
        <p className='name-app'>Edujoint</p>
        {course ? (
          <p className='name-course'>
            {course.full_name} -{' '}
            <span>
              {course.user_name} {course.user_lastname}
            </span>
          </p>
        ) : null}
      </div>
      <div className='options-header'>
        <Link to='/'>
          <p>Cursos</p>{' '}
        </Link>
        <Link to='/edit-profile'>
          {' '}
          <p>Perfil</p>
        </Link>
        <p onClick={onHandlerLogout} className='btn-logout'>
          Cerrar sesion
        </p>
      </div>
    </Header>
  );
};

export default HeaderNav;
