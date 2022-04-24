import { Button, message, Modal, Row, Steps } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { CourseFormI, ITableEvaluations } from '../../utils/interfaces';

const { Step } = Steps;

const initEvaluation: ITableEvaluations = {
  name: '',
  description: '',
  date: new Date(),
  value: '',
};

const CreateCoursePage = () => {
  let navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [fileList, setFileList] = useState<any[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [listEvaluations, setListEvaluations] = useState<ITableEvaluations[]>([
    initEvaluation,
  ]);
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
    full_name: '',
    short_name: '',
    category: '',
    date_begin: moment(new Date(), dateFormat),
    date_finish: moment(new Date(), dateFormat),
    description: '',
    program: '',
    photo: '',
  });

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
