import { Row, Col, Form, Button } from "antd";
import "./index.scss";
import {
  CourseFormI,
  IBibliography,
  ISpecificGoals,
  IThematic,
} from "utils/interfaces";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { toast } from "react-toastify";
import htmlToDraft from "html-to-draftjs";
import TextArea from "antd/lib/input/TextArea";
import { ThematicList } from "./components/ThematicList";
import { SpecificGoals } from "./components/SpecificGoals";
import { BibliographyList } from "./components/BibliographyList";

interface IStepCourseProgramProps {
  formCourse: CourseFormI;
  nextStep: () => void;
  prevStep: () => void;
  openModalCancel: () => void;
  thematicList: IThematic[];
  setThematicList: Dispatch<SetStateAction<any[]>>;
  specificGoals: ISpecificGoals[];
  setSpecificGoals: Dispatch<SetStateAction<any[]>>;
  bibliographyList: IBibliography[];
  setBibliography: Dispatch<SetStateAction<any[]>>;
}

const initEditorState = (value: string | undefined): EditorState => {
  if (value) {
    const blocksFromHtml = htmlToDraft(value);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
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
  thematicList,
  setThematicList,
  specificGoals,
  setSpecificGoals,
  bibliographyList,
  setBibliography,
}) => {
  const { fundament, main_goal, competence, activity, onChange } = formCourse;
  const [editorValue, setEditorValue] = useState(
    initEditorState(formCourse.program)
  );



  const onFinish = (values: any) => {
    nextStep();
  };
  return (
    <div className='content'>
      <div className='content-course-form-row '>
        <h1>Contenido de la materia</h1>
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
                label='Fundamentos'
                name='fundament'
                rules={[{ required: true, message: "Campo requerido" }]}
                initialValue={fundament}
              >
                <TextArea
                  size='large'
                  autoComplete='fundament'
                  value={fundament}
                  onChange={({ target }) => onChange(target.value, "fundament")}
                />
              </Form.Item>
              <Form.Item
                label='Objetivos'
                name='main_goal'
                rules={[{ required: true, message: "Campo requerido" }]}
                initialValue={main_goal}
              >
                <TextArea
                  size='large'
                  autoComplete='main_goal'
                  value={main_goal}
                  onChange={({ target }) => onChange(target.value, "main_goal")}
                />
              </Form.Item>{" "}
              <Form.Item
                label='Competencia'
                name='competence'
                rules={[{ required: true, message: "Campo requerido" }]}
                initialValue={competence}
              >
                <TextArea
                  size='large'
                  autoComplete='competence'
                  value={competence}
                  onChange={({ target }) =>
                    onChange(target.value, "competence")
                  }
                />
              </Form.Item>{" "}
              <Form.Item
                label='Tipos de actividades'
                name='activity'
                rules={[{ required: true, message: "Campo requerido" }]}
                initialValue={activity}
              >
                <TextArea
                  size='large'
                  autoComplete='activity'
                  value={activity}
                  onChange={({ target }) => onChange(target.value, "activity")}
                />
              </Form.Item>
              <ThematicList
                formCourse={formCourse}
                thematicList={thematicList}
                setThematicList={setThematicList}
              />
              <SpecificGoals
                formCourse={formCourse}
                specificGoals={specificGoals}
                setSpecificGoals={setSpecificGoals}
              />
              <BibliographyList
                formCourse={formCourse}
                bibliographyList={bibliographyList}
                setBibliography={setBibliography}
              />
            </Col>
          </Row>

          <div className='steps-action'>
            <Row justify='space-between'>
              <Button
                style={{ margin: "0 8px" }}
                icon={<CloseOutlined />}
                onClick={() => openModalCancel()}
              >
                Cancelar
              </Button>
              <Button
                style={{ margin: "0 8px" }}
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
