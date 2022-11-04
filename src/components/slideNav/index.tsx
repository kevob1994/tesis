import { FunctionComponent, useEffect, useState } from 'react';
import { Image, Layout, Menu, Row } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  MessageOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  ScheduleOutlined,
  VideoCameraOutlined,
  ShareAltOutlined,
  DatabaseOutlined,
  HddOutlined,
  CloudUploadOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Link, useLocation, useParams } from 'react-router-dom';
import { StoreI } from 'utils/interfaces';
import { useSelector } from 'react-redux';
import './index.scss';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SlideNav: FunctionComponent = () => {
  const { user } = useSelector((state: StoreI) => state.auth);
  const { id } = useParams();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [subKey, setSubKey] = useState<string[]>([]);
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    if (location && openKeys.length === 0 && subKey.length === 0) {
      switch (true) {
        case location.pathname.includes('course-program'):
          setOpenKeys(['sub1']);
          setSubKey(['1']);
          break;

        case location.pathname.includes('evaluation-plan'):
          setOpenKeys(['sub1']);
          setSubKey(['2']);
          break;

        case location.pathname.includes('calendar'):
          setOpenKeys(['sub1']);
          setSubKey(['3']);
          break;

        case location.pathname.includes('chat'):
          setOpenKeys(['sub2']);
          setSubKey(['4']);
          break;

        case location.pathname.includes('forum'):
          setOpenKeys(['sub2']);
          setSubKey(['5']);
          break;

        case location.pathname.includes('live-classes'):
          setOpenKeys(['sub2']);
          setSubKey(['6']);
          break;

        case location.pathname.includes('library'):
          setOpenKeys(['sub3']);
          setSubKey(['7']);
          break;

        case location.pathname.includes('tasks'):
          setOpenKeys(['sub3']);
          setSubKey(['8']);
          break;

        case location.pathname.includes('notes'):
          setOpenKeys(['sub3']);
          setSubKey(['9']);
          break;
        default:
          break;
      }
    }
  }, [location]);

  const handlerOpenKey = (key: string) => {
    if (openKeys.some((item) => item === key)) {
      setOpenKeys(openKeys.filter((item) => item !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };

  const handlerSubKey = (key: string) => {
    if (openKeys.some((item) => item === key)) {
      setSubKey([]);
    } else {
      setSubKey([key]);
    }
  };

  return (
    <Sider width={250} className='site-layout-background'>
      <Menu
        mode='inline'
        selectedKeys={subKey}
        style={{ height: '100%', borderRight: 0 }}
        openKeys={openKeys}
      >
        <SubMenu
          key='sub1'
          icon={<UserOutlined />}
          title='Contenido'
          onTitleClick={() => handlerOpenKey('sub1')}
        >
          <Menu.Item
            key='1'
            icon={<MenuFoldOutlined />}
            onClick={() => handlerSubKey('1')}
          >
            <Link to={`/home/${id}/course-program`}>Programa</Link>
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={<FileTextOutlined />}
            onClick={() => handlerSubKey('2')}
          >
            <Link to={`/home/${id}/evaluation-plan`}>Plan de Evaluación</Link>
          </Menu.Item>

          <Menu.Item
            key='3'
            icon={<ScheduleOutlined />}
            onClick={() => handlerSubKey('3')}
          >
            <Link to={`/home/${id}/calendar`}>Calendario</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub2'
          icon={<LaptopOutlined />}
          title='Social'
          onTitleClick={() => handlerOpenKey('sub2')}
        >
          <Menu.Item
            key='4'
            icon={<MessageOutlined />}
            onClick={() => handlerSubKey('4')}
          >
            <Link to={`/home/${id}/chat`}>Chat</Link>
          </Menu.Item>
          <Menu.Item
            key='5'
            icon={<ShareAltOutlined />}
            onClick={() => handlerSubKey('5')}
          >
            <Link to={`/home/${id}/forum`}>Foro</Link>
          </Menu.Item>
          <Menu.Item
            key='6'
            icon={<VideoCameraOutlined />}
            onClick={() => handlerSubKey('6')}
          >
            <Link to={`/home/${id}/live-classes`}>Clase en vivo</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key='sub3'
          icon={<NotificationOutlined />}
          title='Información'
          onTitleClick={() => handlerOpenKey('sub3')}
        >
          <Menu.Item
            key='7'
            icon={<HddOutlined />}
            onClick={() => handlerSubKey('7')}
          >
            <Link to={`/home/${id}/library`}>Biblioteca</Link>
          </Menu.Item>
          <Menu.Item
            key='8'
            icon={<CloudUploadOutlined />}
            onClick={() => handlerSubKey('8')}
          >
            <Link to={`/home/${id}/tasks`}>Entregas</Link>
          </Menu.Item>
          <Menu.Item
            key='9'
            icon={<StarOutlined />}
            onClick={() => handlerSubKey('9')}
          >
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
