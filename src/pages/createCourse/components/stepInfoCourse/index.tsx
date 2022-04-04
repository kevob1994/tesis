import { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Image,
  Select,
} from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import './index.scss';
import { UploadOutlined } from '@ant-design/icons';
import { categoryClass, dateFormat } from '../../../../utils/const';
import { useForm } from '../../../../hooks/useForm';

const StepInfoCourse = () => {
  const {
    nameCourse,
    nameCourseShort,
    category,
    dateInit,
    dateEnd,
    description,
    onChange,
  } = useForm({
    nameCourse: '',
    nameCourseShort: '',
    category: '',
    dateInit: moment(new Date(), dateFormat),
    dateEnd: moment(new Date(), dateFormat),
    description: '',
  });
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl2, setImageUrl2] = useState<any>();
  const dispatch = useDispatch();

  // const HandleLogin = () => dispatch(login(email, password));

  const onFinish = (values: any) => {
    // HandleLogin();
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
      setFileList([file, ...fileList]);
      setImageUrl2(URL.createObjectURL(file));
      return false;
    },
    fileList,
    showUploadList: false,
  };

  return (
    <div className='content'>
      <div className='content-course-form-row '>
        <h1>Información del curso</h1>
        <Form
          name='basic'
          layout='vertical'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          requiredMark={false}
        >
          <Row gutter={50}>
            <Col span={12} flex={1}>
              <Form.Item
                label='Nombre completo del curso'
                name='nameCourse'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <Input
                  size='large'
                  value={nameCourse}
                  onChange={({ target }) =>
                    onChange(target.value, 'nameCourse')
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label='Nombre corto del curso'
                name='nameCourseShort'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <Input
                  size='large'
                  value={nameCourseShort}
                  onChange={({ target }) =>
                    onChange(target.value, 'nameCourseShort')
                  }
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label='Categoría del curso'
                name='category'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <Select
                  size='large'
                  value={category}
                  onChange={(value) => onChange(value, 'category')}
                >
                  {categoryClass.map((category) => (
                    <Select.Option key={category.id}>
                      {category.category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label='Fecha inicio del curso'
                name='dateInit'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <DatePicker
                  size='large'
                  placeholder='Seleccione una fecha'
                  value={dateInit}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label='Fecha fin del curso'
                name='dateEnd'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <DatePicker
                  size='large'
                  placeholder='Seleccione una fecha'
                  value={dateEnd}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label='Descripción'
                name='description'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <TextArea
                  size='large'
                  autoComplete='description'
                  value={description}
                  onChange={({ target }) =>
                    onChange(target.value, 'description')
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <div className='upload-image'>
            {imageUrl2 ? (
              <Image
                preview={false}
                src={imageUrl2}
                alt='avatar'
                width={200}
                height={200}
              />
            ) : (
              <Image
                preview={false}
                width={200}
                height={200}
                src='error'
                fallback='data:image/png;base64,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'
              />
            )}
            <Upload {...props}>
              <Button
                type='primary'
                shape='circle'
                icon={<UploadOutlined />}
                size='large'
              />
            </Upload>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StepInfoCourse;
