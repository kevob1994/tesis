import React from 'react';
import { Col, Image, Row } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';
import { RoleE, StoreI } from '../../utils/interfaces';
import { useSelector } from 'react-redux';

interface UserI {
  name: string;
  photo: string;
}
interface ItemI {
  id: number;
  title: string;
  description: string;
  image: string | null;
  user: UserI;
}

interface ListElementsI {
  listItems: ItemI[];
  url: string;
  span?: number;
}

const ListElements = ({ listItems, url, span = 12 }: ListElementsI) => {
  const auth = useSelector((state: StoreI) => state.auth);

  return (
    <Row gutter={40}>
      {listItems.length > 0 ? (
        listItems.map((item) => (
          <Col span={span}>
            <Link to={url.replace('id', item.id.toString())}>
              <div className='content-list'>
                <div className='item-list'>
                  <Row>
                    {item?.image && (
                      <Image
                        preview={false}
                        width={300}
                        height={200}
                        src={item.image}
                      />
                    )}
                    <Row className='info-course'>
                      <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                      </div>
                      <Row align='middle'>
                        <Image
                          preview={false}
                          width={50}
                          height={50}
                          src={item.user.photo}
                        />
                        <p className='name-teacher'>{item.user.name}</p>
                      </Row>
                    </Row>
                  </Row>
                </div>
              </div>
            </Link>
          </Col>
        ))
      ) : auth.user?.role === RoleE.TEACHER ? (
        <p className='text-empty-list'>No tiene cursos creados</p>
      ) : (
        <p className='text-empty-list'>No se ha unido a ningun curso</p>
      )}
    </Row>
  );
};

export default ListElements;
