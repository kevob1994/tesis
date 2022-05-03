import React from 'react';
import { Button, Col, Image, Row, Tooltip } from 'antd';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import { RoleE, StoreI } from '../../utils/interfaces';
import { useSelector } from 'react-redux';
import {
  DeleteOutlined,
  EditOutlined,
  ShareAltOutlined,
  UploadOutlined,
} from '@ant-design/icons';

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
  code: string;
}

interface ListElementsI {
  listItems: ItemI[];
  url: string;
  span?: number;
  shareElement?: (code: string) => void;
  textDelete: string;
  deleteItem?: (id: number) => void;
  editItem?: (id: number) => void;
}

const ListElements = ({
  listItems,
  url,
  span = 12,
  shareElement,
  textDelete,
  editItem,
  deleteItem,
}: ListElementsI) => {
  const auth = useSelector((state: StoreI) => state.auth);
  let navigate = useNavigate();

  const goItem = (id: string) => {
    navigate(url.replace('id', id), { replace: true });
  };

  const handlerShare = (code: string) => {
    if (shareElement) shareElement(code);
  };

  return (
    <Row gutter={40}>
      {listItems.length > 0 ? (
        listItems.map((item) => (
          <Col span={span} key={item.id}>
            <div
              className='content-list'
              onClick={(e) => {
                e.stopPropagation();
                goItem(item.id.toString());
              }}
            >
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
                    <div className='content-top'>
                      <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                      </div>
                      <div>
                        {shareElement && auth.user?.role === RoleE.TEACHER ? (
                          <Tooltip placement='bottom' title='Compartir código'>
                            <Button
                              type='primary'
                              shape='circle'
                              icon={<ShareAltOutlined />}
                              size='large'
                              onClick={(e) => {
                                handlerShare(item.code);
                                e.stopPropagation();
                              }}
                            />
                          </Tooltip>
                        ) : null}

                        {shareElement && auth.user?.role === RoleE.TEACHER ? (
                          <Tooltip placement='bottom' title='Editar'>
                            <Button
                              type='primary'
                              shape='circle'
                              icon={<EditOutlined />}
                              onClick={(e) => {
																if (editItem) editItem(item.id);
                                e.stopPropagation();
                              }}
                              size='large'
                            />
                          </Tooltip>
                        ) : null}
                        <Tooltip placement='bottom' title={textDelete}>
                          <Button
                            className='delete-btn'
                            shape='circle'
                            onClick={(e) => {
                              if (deleteItem) deleteItem(item.id);
                              e.stopPropagation();
                            }}
                            icon={<DeleteOutlined />}
                            size='large'
                          />
                        </Tooltip>
                      </div>
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
