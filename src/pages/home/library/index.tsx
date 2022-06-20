import {
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  InboxOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  message,
  Input,
  Modal,
  Row,
  Upload,
  UploadProps,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createLibraryTheme } from '../../../actions/course/course';
import { LibraryThemeParamsI, StoreI } from '../../../utils/interfaces';
import './index.scss';

const { Search } = Input;
const { Dragger } = Upload;

const TYPE_PDF = 'application/pdf';
const TYPE_WORD =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const TYPE_EXCEL =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const TYPE_EXCEL_2 = 'application/vnd.ms-excel';
const TYPE_EXCEL_3 = 'application/vnd.ms-excel.sheet.binary.macroEnabled.12';
const TYPE_IMG_PNG = 'image/png';
const TYPE_IMG_JPEG = 'image/jpeg';

const LibraryPage = () => {
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState('');
  const { id } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl2, setImageUrl2] = useState<any>();
  const onSearch = (value: any) => console.log(value);
  const [FileEdit, setFileEdit] = useState<any>(null);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const { loadingAction, forum, loading } = useSelector(
    (store: StoreI) => store.courses
  );

  const newThema = (params: LibraryThemeParamsI) =>
    dispatch(createLibraryTheme(params));

  const openModalCreate = () => {
    setShow(true);
  };

  const onFinish = (values: any) => {
    if (fileList[0] && id) {
      newThema({
        title: values.name,
        description: values.description,
        file: fileList[0],
        course_id: +id,
      });
    } else {
      setError(true);
    }
  };

  const props: UploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      const isValidFormat =
        file.type === TYPE_PDF ||
        file.type === TYPE_WORD ||
        file.type === TYPE_EXCEL ||
        file.type === TYPE_EXCEL_2 ||
        file.type === TYPE_EXCEL_3 ||
        file.type === TYPE_IMG_PNG ||
        file.type === TYPE_IMG_JPEG;
      if (isValidFormat) {
				setError(false);
        setFileList([file]);
      } else {
        message.error(
          `${file.name} debe tener formato pdf, word, excel, png, jpg o pjeg`
        );
      }

      return false;
    },
    fileList,
  };

  const typeIcon = () => {
    if (!fileList[0]) {
      return <InboxOutlined style={{ marginBottom: 10 }} />;
    }
    switch (fileList[0].type) {
      case TYPE_PDF:
        return (
          <FilePdfOutlined style={{ color: '#ff5722', marginBottom: 10 }} />
        );
      case TYPE_WORD:
        return (
          <FileWordOutlined style={{ color: '#1553b6', marginBottom: 10 }} />
        );
      case TYPE_EXCEL:
      case TYPE_EXCEL_2:
      case TYPE_EXCEL_3:
        return (
          <FileExcelOutlined style={{ color: '#107c42', marginBottom: 10 }} />
        );
      case TYPE_IMG_PNG:
      case TYPE_IMG_JPEG:
        return (
          <FileImageOutlined style={{ color: 'black', marginBottom: 10 }} />
        );
      default:
        return <InboxOutlined style={{ marginBottom: 10 }} />;
    }
  };

  return (
    <>
      {' '}
      <Modal
        title='Nuevo tema de discusión'
        visible={show}
        onOk={() => setShow(false)}
        onCancel={() => setShow(false)}
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
          <div style={{ marginBottom: 30 }}>
            <Dragger
              {...props}
              showUploadList={false}
              style={{ borderColor: error ? 'red' : '' }}
            >
              <p className='ant-upload-drag-icon'>{typeIcon()}</p>
              {fileList.length > 0 && <p>{fileList[0].name}</p>}
              <p className='ant-upload-text'>
                Haga clic o arrastre el archivo a esta área para cargarlo
              </p>
              <p className='ant-upload-hint'>
                Solo permite la carga de archivos PDF, Word y Excel
              </p>
            </Dragger>
          </div>
          <Row gutter={50}>
            <Col span={24} flex={1}>
              <Form.Item
                label='Título del tema a tratar'
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
            <Button key='back' onClick={() => setShow(false)}>
              Cancelar
            </Button>
            <Button
              key='submit'
              htmlType='submit'
              type='primary'
              // loading={loadingAction}
            >
              {FileEdit ? 'Editar' : 'Crear'}
            </Button>
          </Row>
        </Form>
      </Modal>
      <div>
        <h1>Biblioteca</h1>
        <Row align='middle' gutter={50}>
          <Col span={20}>
            <Search
              size='large'
              placeholder='input search text'
              onSearch={onSearch}
            />
          </Col>
          <Col span={4}>
            <Button size='large' type='primary' block onClick={openModalCreate}>
              Crear
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LibraryPage;
