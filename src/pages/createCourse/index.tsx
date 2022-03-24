import { Button, message, Row, Steps } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StepCourseProgram,
  StepEndConfirm,
  StepEvaluationPlan,
  StepInfoCourse,
} from './components';
import './index.scss';

const { Step } = Steps;

const StepsComponents = (step: number) => {
  switch (step) {
    case 0:
      return <StepInfoCourse />;
      break;
    case 1:
      return <StepCourseProgram />;
      break;
    case 2:
      return <StepEvaluationPlan />;
      break;
    case 3:
      return <StepEndConfirm />;
      break;

    default:
      break;
  }
};

const CreateCoursePage = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className='content-create-course'>
      <Steps current={current}>
        <Step key='step1' title='step1' />
        <Step key='step2' title='step2' />
        <Step key='step3' title='step3' />
        <Step key='step4' title='step4' />
      </Steps>

      {StepsComponents(current)}

      <div className='steps-action'>
        <Row justify='space-between'>
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Anterior
            </Button>
          )}
          {current === 0 && (
            <Link to='/'>
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Cancelar
              </Button>
            </Link>
          )}
          {current < 3 && (
            <Button type='primary' onClick={() => next()}>
              Siguiente
            </Button>
          )}
          {current === 3 && (
            <Button
              type='primary'
              onClick={() => message.success('Processing complete!')}
            >
              Finalizar
            </Button>
          )}
        </Row>
      </div>
    </div>
  );
};

export default CreateCoursePage;
