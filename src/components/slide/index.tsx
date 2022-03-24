import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import './index.scss';
import { Link, useParams } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SlideNav = () => {
  const { id } = useParams();
	console.log(id)
  return (
    <Sider width={200} className='site-layout-background'>
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key='sub1' icon={<UserOutlined />} title='Contenido'>
          <Menu.Item key='1'>
            <Link to={`/home/${id}/course-program`}>Programa</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/home/evaluation-plan'>Plan de Evaluación</Link>
          </Menu.Item>

          <Menu.Item key='3'>
            <Link to='/home/calendar'>Calendario</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<LaptopOutlined />} title='Social'>
          <Menu.Item key='4' icon={<LaptopOutlined />}>
            <Link to='/chat'>Chat</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link to='/home/forum'>Foro</Link>
          </Menu.Item>
          <Menu.Item key='6'>
            <Link to='/live-classes'>Clase en vivo</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub3' icon={<NotificationOutlined />} title='Información'>
          <Menu.Item key='7'>
            <Link to='/library'>Biblioteca</Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link to='/tasks'>Entregas</Link>
          </Menu.Item>
          <Menu.Item key='9'>
            <Link to='/notes'>notas</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default SlideNav;
