import React from 'react'

import { Layout, Menu } from 'antd';
import './index.scss'

const { Header } = Layout;

const HeaderNav = () => {
	return (
		<Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
          <Menu.Item key='1'>nav 1</Menu.Item>
          <Menu.Item key='2'>nav 2</Menu.Item>
          <Menu.Item key='3'>nav 3</Menu.Item>
        </Menu>
      </Header>
	)
}

export default HeaderNav