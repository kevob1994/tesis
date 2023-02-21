import {
  InboxOutlined,
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
  Spin,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import LoaderSpin from 'components/LoaderSpin';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  createLibraryTheme,
  deleteLibraryTheme,
  getLibraryTheme,
} from '../../../actions/course';
import { clientAxios, headerAuthToken } from '../../../config/axios';
import { TypeFiles } from '../../../utils/const';
import {
  LibraryThemeParamsI,
  listFilesI,
  StoreI,
} from '../../../utils/interfaces';
import { getImageFile } from '../../../utils/utils';
import ListFiles from './components/ListFiles';
import './index.scss';

const { Search } = Input;
const { Dragger } = Upload;

const LibraryPage = () => {
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl2, setImageUrl2] = useState<any>();
  const [FileEdit, setFileEdit] = useState<any>(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [librarySelect, setLibraryelect] = useState<listFilesI | null>(null);

  const { library, loadingAction, forum, loading } = useSelector(
    (store: StoreI) => store.courses
  );

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const removeLibrary = (id: number) => dispatch(deleteLibraryTheme(id));

  useEffect(() => {
    if (!loadingAction) setShow(false);
  }, [loadingAction]);

  const newThema = (params: LibraryThemeParamsI) =>
    dispatch(createLibraryTheme(params));

  const loadData = (id: string) => dispatch(getLibraryTheme(id));

  useEffect(() => {
    if (id) {
      loadData(id);
    }
  }, []);

  const openModalCreate = () => {
    setShow(true);
  };

  const handlerRemoveCourse = () => {
    if (librarySelect) removeLibrary(librarySelect.id);
    setOpenModalDelete(false);
  };

  const openModalRemoveTheme = (item: listFilesI) => {
    setLibraryelect(item);
    setOpenModalDelete(true);
  };

  const onFinish = (values: any) => {
    if (fileList[0] && id) {
      newThema({
        title: values.name,
        description: values.description,
        file: fileList[0],
        course_id: id,
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
      const type = file.name
        .substr(file.name.lastIndexOf('.') + 1 - file.name.length)
        .toLowerCase();

      const isValidFormat =
        type === TypeFiles.TYPE_PDF ||
        type === TypeFiles.TYPE_WORD ||
        type === TypeFiles.TYPE_EXCEL ||
        type === TypeFiles.TYPE_IMG_PNG ||
        type === TypeFiles.TYPE_IMG_JPEG ||
        type === TypeFiles.TYPE_IMG_JPG;
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

    return getImageFile(
      fileList[0].name
        .substr(fileList[0].name.lastIndexOf('.') + 1 - fileList[0].name.length)
        .toLowerCase()
    );
  };

  const getFileToDownload = (id_file: number, course_id: string) => {
    return clientAxios.get(`files/${id_file}?course_id=${course_id}`, {
      responseType: 'arraybuffer',
      headers: headerAuthToken(),
    });
  };

  const downloadFile = (id_file: number, name_file: string) => {
    if (id)
      getFileToDownload(id_file, id).then((response) => {
        const type = response.headers['content-type'];
        const blob = new Blob([response.data], { type: type });
        const link = document.createElement('a');
				link.setAttribute('download', name_file);
        link.href = window.URL.createObjectURL(blob);
        // link.download = 'file.xlsx';
        link.click();
      });
  };

  const transforListFiles = () => {
    return library.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.extension,
			user_id: item.user_id
    }));
  };

  return (
    <>
      <Modal
        title='Eliminar material de apoyo'
        visible={openModalDelete}
        onOk={() => handlerRemoveCourse()}
        onCancel={() => setOpenModalDelete(false)}
        okText='Eliminar'
        cancelText='Cancelar'
        centered
        closable={false}
        maskClosable={false}
      >
        <p>
          Seguro desea eliminar el material de apoyo {librarySelect?.title}?
        </p>
      </Modal>
      <Modal
        title={
          FileEdit ? 'Editar material de apoyo' : 'Nuevo material de apoyo'
        }
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
              loading={loadingAction}
            >
              {FileEdit ? 'Editar' : 'Crear'}
            </Button>
          </Row>
        </Form>
      </Modal>
      <div className='content-module'>
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
              <Button
                size='large'
                type='primary'
                block
                onClick={openModalCreate}
              >
                Crear
              </Button>
              {/* <Button size='large' type='primary' block onClick={downloadFile}>
                download
              </Button> */}
            </Col>
          </Row>
        </div>
        {!loading ? (
          <Row align='middle' gutter={50} className='row-forum'>
            <Col span={24}>
              <ListFiles
                listItems={transforListFiles()}
                deleteItem={openModalRemoveTheme}
                textEmpty='No hay archivos de descarga'
                handlerDownload={downloadFile}
              />
            </Col>
          </Row>
        ) : (
					<LoaderSpin />
        )}
      </div>
    </>
  );
};

export default LibraryPage;
