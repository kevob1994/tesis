import { Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  StepCourseProgram,
  StepEndConfirm,
  StepEvaluationPlan,
  StepInfoCourse,
} from "./components";

import {
  CalendarOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import "./index.scss";
import moment from "moment";
import { dateFormat } from "utils/const";
import { useForm } from "hooks/useForm";
import {
  IBibliography,
  ISpecificGoals,
  ITableEvaluations,
  IThematic,
  StatusModalE,
  StoreI,
} from "utils/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { getCourse, getListEvaluationsCourse } from "actions/course";
import { closeModal } from "actions/alert";

const { Step } = Steps;

const CreateCoursePage = () => {
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [thematicList, setThematicList] = useState<IThematic[]>([]);
  const [specificGoals, setSpecificGoals] = useState<ISpecificGoals[]>([]);
  const [bibliographyList, setBibliography] = useState<IBibliography[]>([]);
  const [listEvaluations, setListEvaluations] = useState<ITableEvaluations[]>(
    []
  );

  const dispatch = useDispatch();
  const loadEvaluations = (id: string) =>
    dispatch(getListEvaluationsCourse(id));

  const getCourseData = (id: string) => dispatch(getCourse(id));

  const closeAlert = () => dispatch(closeModal());

  const { id } = useParams();
  let navigate = useNavigate();
  const { courses, evaluations, infoCourse } = useSelector(
    (state: StoreI) => state.courses
  );
  const { show, type } = useSelector((state: StoreI) => state.alert);

  const {
    full_name,
    short_name,
    category,
    date_begin,
    date_finish,
    description,
    photo,
    fundament,
    main_goal,
    competence,
    activity,
    onChange,
    updateForm,
  } = useForm({
    full_name: "",
    short_name: "",
    category: "",
    date_begin: moment(new Date(), dateFormat),
    date_finish: moment(new Date(), dateFormat).add(1, "day"),
    description: "",
    photo: "",
    fundament: "",
    main_goal: "",
    competence: "",
    activity: "",
  });

  useEffect(() => {
    if (id) {
      getCourseData(id);
      loadEvaluations(id);
    }
  }, []);

  useEffect(() => {
    if (evaluations.length > 0 && id) {
      setListEvaluations(
        evaluations.map((evaluations) => ({
          id: evaluations.id,
          name: evaluations.name,
          description: evaluations.description,
          date: new Date(evaluations.date),
          value: evaluations.value,
        }))
      );
    } else {
      setListEvaluations([
        {
          name: "",
          description: "",
          date: date_begin?.toDate(),
          value: "",
        },
      ]);
    }
  }, [evaluations]);

  useEffect(() => {
    if (infoCourse) {
      console.log(infoCourse.course.date_begin);
      console.log(infoCourse.course.date_finish);
      updateForm({
        full_name: infoCourse.course.full_name,
        short_name: infoCourse.course.short_name,
        category: infoCourse.course.category,
        date_begin: moment(new Date(infoCourse.course.date_begin), dateFormat),
        date_finish: moment(
          new Date(infoCourse.course.date_finish),
          dateFormat
        ).add(1, "day"),
        description: infoCourse.course.description,
        photo: infoCourse.course.photo,
        fundament: infoCourse.infocourse.fundament,
        main_goal: infoCourse.infocourse.main_goal,
        competence: infoCourse.infocourse.competence,
        activity: infoCourse.infocourse.activity,
      });

      setSpecificGoals(infoCourse.specific_goals);
      setBibliography(
        infoCourse.bibliographies.map((bibliography) => ({
					id: bibliography.id,
          author: bibliography.author,
          name: bibliography.name,
          editorial: bibliography.editorial,
          year: Number(bibliography.year),
        }))
      );
      setThematicList(infoCourse.thematiccontents);
    }
  }, [infoCourse]);

  useEffect(() => {
    if (type === StatusModalE.SUCCESS && show) {
      navigate("/", { replace: true });
      closeAlert();
    }
  }, [show, type]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const formCourse = {
    full_name,
    short_name,
    category,
    date_begin,
    date_finish,
    description,
    photo,
    fundament,
    main_goal,
    competence,
    activity,
    onChange,
  };

  const openModalCancel = () => setVisibleModal(true);

  const StepsComponents = () => {
    switch (current) {
      case 0:
        return (
          <StepInfoCourse
            formCourse={formCourse}
            nextStep={next}
            openModalCancel={openModalCancel}
            fileList={fileList}
            setFileList={setFileList}
          />
        );
      case 1:
        return (
          <StepCourseProgram
            formCourse={formCourse}
            nextStep={next}
            prevStep={prev}
            openModalCancel={openModalCancel}
            thematicList={thematicList}
            setThematicList={setThematicList}
            specificGoals={specificGoals}
            setSpecificGoals={setSpecificGoals}
            bibliographyList={bibliographyList}
            setBibliography={setBibliography}
          />
        );
      case 2:
        return (
          <StepEvaluationPlan
            nextStep={next}
            prevStep={prev}
            listEvaluations={listEvaluations}
            setListEvaluations={setListEvaluations}
            openModalCancel={openModalCancel}
            formCourse={formCourse}
          />
        );
      case 3:
        return (
          <StepEndConfirm
            prevStep={prev}
            openModalCancel={openModalCancel}
            formCourse={formCourse}
            listEvaluations={listEvaluations}
            thematicList={thematicList}
            specificGoals={specificGoals}
            bibliographyList={bibliographyList}
            fileList={fileList}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <Modal
        title='Creación de curso'
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => navigate("/", { replace: true })}
        okText='No'
        cancelText='Si'
        centered
        closable={false}
        maskClosable={false}
      >
        <p>Se perderán todos los cambios. ¿Está seguro que desea cancelar?</p>
      </Modal>
      <div className='content-create-course'>
        <Steps current={current}>
          <Step key='step1' title='Información' icon={<ProfileOutlined />} />
          <Step
            key='step2'
            title='Contenido de la materia'
            icon={<ReadOutlined />}
          />
          <Step
            key='step3'
            title='Plan de Evaluación'
            icon={<CalendarOutlined />}
          />
          <Step key='step4' title='Finalizar' icon={<CheckCircleOutlined />} />
        </Steps>

        {StepsComponents()}
      </div>
    </>
  );
};

export default CreateCoursePage;
