import React, { useEffect, useState } from 'react';
import './index.scss';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Spin,
  Upload,
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ListElements, ModalStatus } from '../../../components';
import { useForm } from '../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { ForumParamsI, StoreI } from '../../../utils/interfaces';
import { UploadOutlined } from '@ant-design/icons';
import './index.scss';
import TextArea from 'antd/lib/input/TextArea';
import {
  createForum,
  editForum,
  getForums,
} from '../../../actions/course/course';
const { Search } = Input;

const onSearch = (value: any) => console.log(value);

const ForumRoomPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl2, setImageUrl2] = useState<any>();
  const [photo, setPhoto] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [forumEdit, setforumEdit] = useState<any>(null);

  const dispatch = useDispatch();
  const { loadingAction, forum, loading } = useSelector(
    (store: StoreI) => store.courses
  );

  useEffect(() => {
    if (id) loadForum(id);
  }, []);

  useEffect(() => {
    if (!visibleModal) {
      form.setFieldsValue({
        name: '',
        description: '',
      });
      setImageUrl2(null);
    }
  }, [visibleModal]);

  React.useEffect(() => {
    form.setFieldsValue({
      name: '',
      description: '',
    });
  }, []);

  useEffect(() => {
    if (!loadingAction) {
      setVisibleModal(false);
    }
  }, [loadingAction]);

  const loadForum = (id: string) => dispatch(getForums(id));

  const openModalCreate = () => {
    setforumEdit(null);
    setVisibleModal(true);
  };

  const onHandlerCreateForum = (params: ForumParamsI) =>
    dispatch(createForum(params));

  const onHandlerEditForum = (params: ForumParamsI, forum_id: number) =>
    dispatch(editForum(params, forum_id));

  const onFinish = (values: any) => {
    if (id)
      if (forumEdit)
        onHandlerEditForum(
          {
            name: values.name,
            description: values.description,
            photo,
            course_id: +id,
          },
          forumEdit.id
        );
      else
        onHandlerCreateForum({
          name: values.name,
          description: values.description,
          photo,
          course_id: +id,
        });
  };

  const props = {
    onRemove: (file: any) => {
      if (!file) return;
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setPhoto(reader && reader.result ? reader.result.toString() : '');
      };
      setFileList([file, ...fileList]);
      setImageUrl2(URL.createObjectURL(file));
      return false;
    },
    fileList,
    showUploadList: false,
  };

  const transformListForum = () => {
    return forum.map((forum) => ({
      id: forum.id,
      title: forum.name,
      description: forum.description,
      image: forum.photo,
      user: {
        name: `testing`,
        photo: null,
      },
    }));
  };

  const handlerEdit = (id: number) => {
    const themeForum = forum.find((x) => x.id === id);
    setforumEdit(themeForum);
    form.setFieldsValue({
      name: themeForum!.name,
      description: themeForum!.description,
    });
    setPhoto(themeForum!.photo || '');
    setImageUrl2(themeForum!.photo);
    setVisibleModal(true);
  };

  return (
    <>
      <ModalStatus />
      <Modal
        title='Nuevo tema de discusión'
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)}
        centered
        footer={null}
        forceRender
        destroyOnClose={true}
      >
        <Form
          name='basic'
          layout='vertical'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          form={form}
          requiredMark={false}
        >
          <div className='upload-image'>
            <Image
              preview={false}
              src={imageUrl2 ? imageUrl2 : 'error'}
              alt='avatar'
              width={200}
              height={200}
              fallback='data:image/png;base64,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'
            />
            <Upload {...props}>
              <Button
                type='primary'
                shape='circle'
                icon={<UploadOutlined />}
                size='large'
              />
            </Upload>
          </div>
          <Row gutter={50}>
            <Col span={24} flex={1}>
              <Form.Item
                label='Nombre del tema a tratar'
                name='name'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label='Decripción'
                name='description'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <TextArea size='large' autoComplete='description' />
              </Form.Item>
            </Col>
          </Row>

          <Row justify='space-between' style={{ marginTop: 20 }}>
            <Button key='back' onClick={() => setVisibleModal(false)}>
              Cancelar
            </Button>
            <Button
              key='submit'
              htmlType='submit'
              type='primary'
              loading={loadingAction}
            >
              {forumEdit ? 'Editar' : 'Crear'}
            </Button>
          </Row>
        </Form>
      </Modal>
      <div className='content-forum'>
        <div>
          <h1>Foro</h1>
          <Row align='middle' gutter={50}>
            <Col span={20}>
              <Search
                size='large'
                placeholder='input search text'
                onSearch={onSearch}
              />
            </Col>
            <Col span={4}>
              <Button
                size='large'
                type='primary'
                block
                onClick={openModalCreate}
              >
                Crear
              </Button>
            </Col>
          </Row>
        </div>

        {!loading ? (
          <Row align='middle' gutter={50} className="row-forum">
            <Col span={24}>
              <ListElements
                listItems={transformListForum()}
                url={`${location.pathname}/id`}
                editItem={handlerEdit}
                textEmpty='No existen temas de debates creados'
              />
            </Col>
          </Row>
        ) : (
          <div className='content-spiner'>
            <Spin />
          </div>
        )}
      </div>
    </>
  );
};

export default ForumRoomPage;
