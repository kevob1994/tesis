import { Button, Col, Input, Row } from 'antd';
import './index.scss';
import ListElements from '../../components/listElements';
import { Link } from 'react-router-dom';

const { Search } = Input;

const onSearch = (value: any) => console.log(value);

const ListCourses = () => {
  return (
    <div className='content-login'>
      <h1>Cursos</h1>
      <Row align='middle' gutter={50}>
        <Col span={20}>
          <Search
            size='large'
            placeholder='input search text'
            onSearch={onSearch}
          />
        </Col>
        <Col span={4}>
          <Link to='/create-course'>
            <Button size='large' type='primary' block>
              Crear
            </Button>
          </Link>
        </Col>

        <Col span={24}>
          <ListElements />
        </Col>
      </Row>
    </div>
  );
};

export default ListCourses;
