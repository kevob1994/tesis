import { FunctionComponent } from 'react';
import { Image, Layout, Menu, Row } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import { StoreI } from 'utils/interfaces';
import { useSelector } from 'react-redux';
import './index.scss';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SlideNav: FunctionComponent = () => {
  const { user } = useSelector((state: StoreI) => state.auth);
  const { id } = useParams();
  console.log(id);
  return (
    <Sider width={200} className='site-layout-background'>
      <Menu
        mode='inline'
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu key='sub1' icon={<UserOutlined />} title='Contenido'>
          <Menu.Item key='1'>
            <Link to={`/home/${id}/course-program`}>Programa</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to={`/home/${id}/evaluation-plan`}>Plan de Evaluación</Link>
          </Menu.Item>

          <Menu.Item key='3'>
            <Link to={`/home/${id}/calendar`}>Calendario</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub2' icon={<LaptopOutlined />} title='Social'>
          <Menu.Item key='4' icon={<LaptopOutlined />}>
            <Link to={`/home/${id}/chat`}>Chat</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link to={`/home/${id}/forum`}>Foro</Link>
          </Menu.Item>
          <Menu.Item key='6'>
            <Link to={`/home/${id}/live-classes`}>Clase en vivo</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key='sub3' icon={<NotificationOutlined />} title='Información'>
          <Menu.Item key='7'>
            <Link to={`/home/${id}/library`}>Biblioteca</Link>
          </Menu.Item>
          <Menu.Item key='8'>
            <Link to={`/home/${id}/tasks`}>Entregas</Link>
          </Menu.Item>
          <Menu.Item key='9'>
            <Link to={`/home/${id}/notes`}>notas</Link>
          </Menu.Item>
        </SubMenu>
        <div className='slide-profile'>
          <Link to='/edit-profile'>
            <Row align='middle'>
              <Image
                preview={false}
                width={45}
                height={45}
                src={
                  user?.photo ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
              />
              <div style={{ marginLeft: 10 }}>
                <p className='name-user'>
                  {user?.name} {user?.lastname}
                </p>
                <p className='text-profile'>Perfil</p>
              </div>
            </Row>
          </Link>
        </div>
      </Menu>
    </Sider>
  );
};

export default SlideNav;
