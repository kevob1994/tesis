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
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
	firstLoad: boolean;
	setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>
}


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
	firstLoad,
	setFirstLoad
}) => {
  const { fundament, main_goal, competence, activity, onChange } = formCourse;
  const [errorSpecificGoals, setErrorSpecificGoals] = useState(false);
  const [errorBibliography, setErrorBibliography] = useState(false);
  const [errorThematicList, setErrorThematicList] = useState(false);

  const onFinish = (values: any) => {
    if (
      bibliographyList.length === 0 ||
      specificGoals.length === 0 ||
      thematicList.length === 0
    ) {
      setErrorSpecificGoals(specificGoals.length === 0);
      setErrorThematicList(thematicList.length === 0);
      setErrorBibliography(bibliographyList.length === 0);
      return;
    }
    nextStep();
  };

  useEffect(() => {
    if (firstLoad) {
      setErrorSpecificGoals(specificGoals.length === 0);
      setErrorThematicList(thematicList.length === 0);
      setErrorBibliography(bibliographyList.length === 0);
    } else {
      setFirstLoad(true);
    }
  }, [thematicList, specificGoals, bibliographyList]);

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
                label='Objetivo general'
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
                showError={errorThematicList}
              />
              <SpecificGoals
                formCourse={formCourse}
                specificGoals={specificGoals}
                setSpecificGoals={setSpecificGoals}
                showError={errorSpecificGoals}
              />
              <BibliographyList
                formCourse={formCourse}
                bibliographyList={bibliographyList}
                setBibliography={setBibliography}
                showError={errorBibliography}
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
