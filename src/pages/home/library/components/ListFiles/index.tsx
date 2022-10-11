import React from 'react';
import { Button, Col, Row, Tooltip } from 'antd';
import './index.scss';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { listFilesI, StoreI } from '../../../../../utils/interfaces';
import { getImageFile } from '../../../../../utils/utils';
import { useSelector } from 'react-redux';

interface ListFilesI {
  listItems: listFilesI[];
  span?: number;
  shareElement?: (code: string) => void;
  textDelete?: string;
  deleteItem?: (id: listFilesI) => void;
  editItem?: (id: number) => void;
  textEmpty: string;
  handlerDownload: (id: number, name_file: string) => void;
}

const ListFiles = ({
  listItems,
  span = 8,
  shareElement,
  textDelete,
  editItem,
  deleteItem,
  textEmpty,
  handlerDownload,
}: ListFilesI) => {
  const { user } = useSelector((state: StoreI) => state.auth);

  return (
    <Row gutter={40}>
      {listItems.length > 0 ? (
        listItems.map((item) => (
          <Col span={span} key={item.id}>
            <div className='content-list'>
              <div className='item-list'>
                <Row>
                  <div className='content-img-file'>
                    {getImageFile(item.type)}
                  </div>
                  <Row className='info-course'>
                    <div className='content-top'>
                      <div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                      </div>
                      <div>
                        {editItem && (
                          <Tooltip placement='bottom' title='Editar'>
                            <Button
                              type='primary'
                              shape='circle'
                              icon={<EditOutlined />}
                              onClick={(e) => {
                                editItem(item.id);
                                e.stopPropagation();
                              }}
                              size='large'
                            />
                          </Tooltip>
                        )}
                        {
                          <Tooltip placement='bottom' title='Descargar'>
                            <Button
                              type='primary'
                              shape='circle'
                              icon={<DownloadOutlined />}
                              onClick={(e) => {
                                handlerDownload(item.id, item.title);
                                e.stopPropagation();
                              }}
                              size='large'
                            />
                          </Tooltip>
                        }
                        {deleteItem && user?.id === item.user_id && (
                          <Tooltip placement='bottom' title='eliminar archivo'>
                            <Button
                              className='delete-btn'
                              shape='circle'
                              onClick={(e) => {
                                deleteItem(item);
                                e.stopPropagation();
                              }}
                              icon={<DeleteOutlined />}
                              size='large'
                            />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </Row>
                </Row>
              </div>
            </div>
          </Col>
        ))
      ) : (
        <p className='text-empty-list'>{textEmpty}</p>
      )}
    </Row>
  );
};

export default ListFiles;
