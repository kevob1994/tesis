import { Row, Col, Form, Button } from 'antd';
import './index.scss';
import { CourseFormI } from 'utils/interfaces';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { FunctionComponent, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  ContentState,
  convertToRaw,
  EditorState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { toast } from 'react-toastify';
import htmlToDraft from 'html-to-draftjs';

interface IStepCourseProgramProps {
  formCourse: CourseFormI;
  nextStep: () => void;
  prevStep: () => void;
  openModalCancel: () => void;
}

const initEditorState = (value: string | undefined): EditorState => {
  if (value) {
    const blocksFromHtml = htmlToDraft(value);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
  } else {
    return EditorState.createEmpty();
  }
};

const StepCourseProgram: FunctionComponent<IStepCourseProgramProps> = ({
  formCourse,
  nextStep,
  prevStep,
  openModalCancel,
}) => {
  const { onChange } = formCourse;
  const [editorValue, setEditorValue] = useState(
    initEditorState(formCourse.program)
  );

  const onEditorStateChange = (editorStateValue: EditorState) => {
    const newValue = draftToHtml(
      convertToRaw(editorStateValue.getCurrentContent())
    );

    if (editorStateValue.getCurrentContent().getPlainText().trim() === '') {
      onChange('', 'program');
    } else {
      onChange(newValue, 'program');
    }

    setEditorValue(editorStateValue);
  };

  const onFinish = (values: any) => {
		if(editorValue.getCurrentContent().getPlainText().trim() === ''){
			return toast.error(
        'La programa de la materia es un campo requerido'
      );
		}
		nextStep()};
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
              <Editor
                placeholder={'Detalle el contenido del curso'}
                editorState={editorValue}
                onEditorStateChange={onEditorStateChange}
                toolbar={{
									options: ['inline', 'blockType', 'fontSize', 'list', 'history', 'colorPicker'],
                  inline: {
                    inDropdown: true,
                    options: ['bold', 'italic', 'underline'],
                  },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  colorPicker: {
                    colors: [
                      '#ff7875',
                      '#f5222d',
                      '#a8071a',
                      '#ff9c6e',
                      '#fa541c',
                      '#ad2102',
                      '#ffc069',
                      '#fa8c16',
                      '#ad4e00',
                      '#ffd666',
                      '#faad14',
                      '#ad6800',
                      '#fff566',
                      '#fadb14',
                      '#ad8b00',
                      '#d3f261',
                      '#a0d911',
                      '#5b8c00',
                      '#95de64',
                      '#52c41a',
                      '#237804',
                      '#5cdbd3',
                      '#13c2c2',
                      '#006d75',
                      '#69c0ff',
                      '#1890ff',
                      '#0050b3',
                      '#85a5ff',
                      '#2f54eb',
                      '#10239e',
                      '#b37feb',
                      '#722ed1',
                      '#391085',
                      '#ff85c0',
                      '#eb2f96',
                      '#9e1068',
                      '#ffffff',
                      '#fafafa',
                      '#f5f5f5',
                      '#f0f0f0',
                      '#d9d9d9',
                      '#bfbfbf',
                      '#8c8c8c',
                      '#595959',
                      '#434343',
                      '#262626',
                      '#1f1f1f',
                      '#141414',
                      '#000000'
                    ],
                  },
                }}
              />
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
