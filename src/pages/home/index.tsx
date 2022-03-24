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
        <Layout style={{ padding: '30px 20px 30px 30px', overflowY: 'scroll' }}>
          <div className='content-nav'>
            <Outlet />
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HomePage;
