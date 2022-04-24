import { Row, Col, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './index.scss';
import { useForm } from '../../../../hooks/useForm';
import { CourseFormI } from '../../../../utils/interfaces';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from '@ant-design/icons';

interface IStepCourseProgramProps {
  formCourse: CourseFormI;
  nextStep: () => void;
  prevStep: () => void;
  openModalCancel: () => void;
}

const StepCourseProgram = ({
  formCourse,
  nextStep,
  prevStep,
  openModalCancel,
}: IStepCourseProgramProps) => {
  const { program, onChange } = formCourse;
  // const HandleLogin = () => dispatch(login(email, password));

  const onFinish = (values: any) => nextStep();
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
                name='program'
                rules={[{ required: true, message: 'Campo requerido' }]}
								initialValue={program}
              >
                <TextArea
                  size='large'
                  autoComplete='program'
                  placeholder='Descripción de los temas que tendrá el curso'
                  value={program}
                  style={{ height: 300 }}
                  onChange={({ target }) =>
                    onChange(target.value, 'program')
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <div className='steps-action'>
            <Row justify='space-between'>
              <Button
                style={{ margin: '0 8px' }}
                icon={<CloseOutlined />}
                onClick={() => openModalCancel()}
              >
                Cancelar
              </Button>
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => prevStep()}
                icon={<ArrowLeftOutlined />}
              >
                Anterior
              </Button>

              <Button
                type='primary'
                htmlType='submit'
                icon={<ArrowRightOutlined />}
              >
                Siguiente
              </Button>
            </Row>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default StepCourseProgram;
