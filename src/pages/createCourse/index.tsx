import { Button, message, Modal, Row, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  StepCourseProgram,
  StepEndConfirm,
  StepEvaluationPlan,
  StepInfoCourse,
} from './components';

import {
  CalendarOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import './index.scss';
import moment from 'moment';
import { dateFormat } from '../../utils/const';
import { useForm } from '../../hooks/useForm';
import {
  CourseFormI,
  CourseI,
  ITableEvaluations,
  StoreI,
} from '../../utils/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { getListEvaluationsCourse } from '../../actions/course/course';
import { ModalStatus } from '../../components';
import { StatusModalE } from '../../hooks/useModalStatus';

const { Step } = Steps;

const initEvaluation: ITableEvaluations = {
  name: '',
  description: '',
  date: new Date(),
  value: '',
};

const CreateCoursePage = () => {
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [listEvaluations, setListEvaluations] = useState<ITableEvaluations[]>([
    initEvaluation,
  ]);

  const dispatch = useDispatch();
  const loadEvaluations = (id: string) =>
    dispatch(getListEvaluationsCourse(id));
  const { id } = useParams();
  let navigate = useNavigate();
  const courses = useSelector((state: StoreI) => state.courses);
  const { show, type, title, textBody } = useSelector(
    (state: StoreI) => state.alert
  );

  const courseInfo = (id: number) => {
    const course = courses.courses.find((course) => course.id === Number(id));
    if (course) {
      return {
        ...course,
        date_begin: new Date(course.date_begin),
        date_finish: new Date(course.date_finish),
      };
    }
    return {
      full_name: '',
      short_name: '',
      category: '',
      date_begin: new Date(),
      date_finish: new Date(),
      description: '',
      program: '',
      photo: '',
    };
  };

  const {
    full_name,
    short_name,
    category,
    date_begin,
    date_finish,
    description,
    photo,
    program,
    onChange,
  } = useForm({
    full_name: courseInfo(Number(id))?.full_name,
    short_name: courseInfo(Number(id))?.short_name,
    category: courseInfo(Number(id))?.category,
    date_begin: moment(courseInfo(Number(id))?.date_begin, dateFormat),
    date_finish: moment(courseInfo(Number(id))?.date_finish, dateFormat),
    description: courseInfo(Number(id))?.description,
    program: courseInfo(Number(id))?.program,
    photo: courseInfo(Number(id))?.photo,
  });

  useEffect(() => {
    if (id) loadEvaluations(id);
  }, []);

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
    program,
    onChange,
  };

  const openModalCancel = () => setVisibleModal(true);

  useEffect(() => {
    if (type === StatusModalE.SUCCESS && show) navigate('/', { replace: true });
  }, [show, type]);

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
          />
        );
      case 3:
        return (
          <StepEndConfirm
            prevStep={prev}
            openModalCancel={openModalCancel}
            formCourse={formCourse}
            listEvaluations={listEvaluations}
            fileList={fileList}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <ModalStatus />
      <Modal
        title='Creación de curso'
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => navigate('/', { replace: true })}
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
            title='Programa de la Materia'
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
