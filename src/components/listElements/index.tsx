import React from 'react';
import { Col, Image, Row } from 'antd';
import './index.scss';
import { Link } from 'react-router-dom';

const ListElements = () => {
  return (
    <Row gutter={40}>
      <Col span={12}>
        <Link to={`/home/${1}/course-program`}>
          <div className='content-list'>
            <div className='item-list'>
              <Row>
                <Image
                  width={300}
                  height={200}
                  src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                />
                <Row className='info-course'>
                  <div>
                    <h2>Nombre de la materia</h2>
                    <p>Descripcion</p>
                  </div>
                  <Row align='middle'>
                    <Image
                      width={50}
                      height={50}
                      src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    />
                    <p className='name-teacher'>Nombre del profesor</p>
                  </Row>
                </Row>
              </Row>
            </div>
          </div>
        </Link>
      </Col>
      <Col span={12}>
        <Link to={`/home/${2}/course-program`}>
        <div className='content-list'>
          <div className='item-list'>
            <Row>
              <Image
                width={300}
                height={200}
                src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
              />
              <Row className='info-course'>
                <div>
                  <h2>Nombre de la materia</h2>
                  <p>Descripcion</p>
                </div>
                <Row align='middle'>
                  <Image
                    width={50}
                    height={50}
                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                  />
                  <p className='name-teacher'>Nombre del profesor</p>
                </Row>
              </Row>
            </Row>
          </div>
        </div>
				</Link>
      </Col>
    </Row>
  );
};

export default ListElements;
