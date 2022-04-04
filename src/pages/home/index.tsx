import React from 'react';
import { Layout } from 'antd';
import './index.scss';
import HeaderNav from '../../components/header';
import SlideNav from '../../components/slide';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
  return (
    <Layout className='content-home'>
      <HeaderNav />
      <Layout>
        <SlideNav />
        <div style={{ padding: '30px 20px 30px 30px', width: '100%' }}>
          <div className='content-nav'>
            <Outlet />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default HomePage;
