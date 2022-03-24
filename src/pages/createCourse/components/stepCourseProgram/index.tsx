import { Row, Col, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './index.scss';
import { useForm } from '../../../../hooks/useForm';

const StepCourseProgram = () => {
  const { courseProgram, onChange } = useForm({
    courseProgram: '',
  });

  // const HandleLogin = () => dispatch(login(email, password));

  const onFinish = (values: any) => {
    // HandleLogin();
  };
  return (
    <div className='content'>
      <div className='content-course-form-row '>
        <h1>Programa de la materia</h1>
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
            <Col span={24}>
              <Form.Item
                name='courseProgram'
                rules={[{ required: true, message: 'Campo requerido' }]}
              >
                <TextArea
                  size='large'
                  autoComplete='courseProgram'
                  placeholder='Descripción de los temas que tendrá el curso'
                  value={courseProgram}
                  style={{ height: 300 }}
                  onChange={({ target }) =>
                    onChange(target.value, 'courseProgram')
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default StepCourseProgram;
