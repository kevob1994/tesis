import React from 'react';
import { Layout } from 'antd';
import './index.scss';
import { Outlet } from 'react-router-dom';
import { HeaderNav, SlideNav } from '../../components';

const HomePage = () => {
  return (
    <Layout className='content-home'>
      <HeaderNav showLinkCourses={true}/>
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
