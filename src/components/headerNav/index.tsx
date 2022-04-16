import React from 'react';
import { Image, Layout, Menu } from 'antd';
import logo from './../../assets/imgs/icon-light-background-primary.svg';
import './index.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth/auth';

const { Header } = Layout;

interface IHeaderNav {
  showLinkCourses?: boolean;
}

const HeaderNav = ({ showLinkCourses = false }) => {
  const dispatch = useDispatch();

  const onHandlerLogout = () => dispatch(logout());

  return (
    <Header className='header'>
      <div style={{ display: 'flex' }}>
        <Image preview={false} width={70} src={logo} />
        <p className='name-app'>Edujoint</p>
      </div>
      <div className='options-header'>
        <Link to='/'>{showLinkCourses ? <p>Materias</p> : null}</Link>
        <p onClick={onHandlerLogout} className='btn-logout'>
          Cerrar sesion
        </p>
      </div>
    </Header>
  );
};

export default HeaderNav;
