import React from 'react';
import { Image, Layout, Menu } from 'antd';
import logo from './../../assets/imgs/icon-light-background-primary.svg';
import './index.scss';

const { Header } = Layout;

const HeaderNav = () => {
  return (
    <Header className='header'>
        <div style={{ display: 'flex' }}>
          <Image preview={false} width={70} src={logo} />
          <p className='name-app'>Edujoint</p>
        </div>
        <div className='options-header'>
          <p>Materias</p>
          <p>Cerrar sesion</p>
        </div>
    </Header>
  );
};

export default HeaderNav;
