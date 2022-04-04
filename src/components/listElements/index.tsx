import React from 'react';
import { Col, Image, Row } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';

interface UserI {
  name: string;
  photo: string;
}
interface ItemI {
  id: number;
  title: string;
  description: string;
  image: string | null;
  file: string | null;
  user: UserI;
}

interface ListElementsI {
  listItems: ItemI[];
  url: string;
  span?: number;
}

const ListElements = ({ listItems, url, span = 12 }: ListElementsI) => {
  return (
    <Row gutter={40}>
      {listItems.map((item) => (
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
      ))}
    </Row>
  );
};

export default ListElements;
