import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleTwoTone,
  CloseOutlined,
} from '@ant-design/icons';
import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Table,
} from 'antd';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import { dateFormatTime } from 'utils/const';
import { ITableEvaluations } from 'utils/interfaces';
import './index.scss';

interface IStepEvaluationPlanProps {
  prevStep: () => void;
  nextStep: () => void;
  listEvaluations: ITableEvaluations[];
  setListEvaluations: Dispatch<SetStateAction<ITableEvaluations[]>>;
  openModalCancel: () => void;
}

const StepEvaluationPlan: FunctionComponent<IStepEvaluationPlanProps> = ({
  prevStep,
  nextStep,
  openModalCancel,
  listEvaluations,
  setListEvaluations,
}) => {
  const [form] = Form.useForm();
  const [emptyForm, setEmptyForm] = useState(false);

  const addEvaluation = () => {
    setListEvaluations([
      ...listEvaluations,
      {
        name: '',
        description: '',
        date: new Date(),
        value: '',
      },
    ]);
  };

  const deleteEvaluation = (i: number) => {
    setListEvaluations(
      listEvaluations.filter((evaluation, index) => i !== index)
    );
  };

  const onInputChange =
    (key: string, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newData: any = [...listEvaluations];
      newData[index][key] = e.target.value;
      setListEvaluations(newData);
    };

  const dateChange = (
    key: string,
    index: number,
    value?: string | undefined
  ) => {
    const newData: any = [...listEvaluations];
    newData[index][key] = value ? value : new Date();
    setListEvaluations(newData);
  };

  const noteChange = (
    key: string,
    index: number,
    value?: string | undefined | number
  ) => {
    const newData: any = [...listEvaluations];
    newData[index][key] = value ? value : '';
    setListEvaluations(newData);
  };

  const columns: ColumnProps<ITableEvaluations>[] = [
    {
      title: 'Evaluación',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('name', index)} />
      ),
      width: '20%',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('description', index)} />
      ),
      width: '45%',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text, record, index) => {
        return (
          <DatePicker
            showTime
            size='large'
            placeholder='Seleccione una fecha'
            value={moment(text, dateFormatTime)}
            format={dateFormatTime}
            onChange={(e) => {
              dateChange('date', index, e?.format());
            }}
            onPanelChange={() => {}}
          />
        );
      },
    },
    {
      title: 'Nota',
      dataIndex: 'value',
      key: 'value',
      render: (text, record, index) => (
        <InputNumber
          value={text}
          defaultValue={text}
          onChange={(value) => noteChange('value', index, value)}
          type='number'
          min='0'
          step='0'
        />
      ),
      width: '5%',
    },
    {
      title: 'Eliminar',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record, index) => (
        <CloseCircleTwoTone
          twoToneColor='#E2222E'
          className='close-btn'
          onClick={() => deleteEvaluation(index)}
        />
      ),
      width: '1%',
    },
  ];

  const submitNext = () => {
    if (validateEvaluationPlanEmpty()) return setEmptyForm(true);
    setEmptyForm(false);
    nextStep();
  };

  const validateEvaluationPlanEmpty = () => {
    console.log('listEvaluations');
    console.log(listEvaluations);
    const list = listEvaluations
      .map(({ date, description, name, value }: ITableEvaluations) => ({
        date,
        description,
        name,
        value,
      }))
      .filter((evaluation) =>
        Object.values(evaluation).some(
          (x) => x === null || x.toString().trim() === '' || x === 0
        )
      );

    return list.length > 0;
  };
  return (
    <div className='content'>
      <div className='content-course-form-row '>
        <Row justify='space-between' align='middle'>
          <h1>Plan de Evaluación</h1>
          <Button type='primary' onClick={() => addEvaluation()}>
            Agregar Evaluación
          </Button>
        </Row>
        {emptyForm ? (
          <Alert description='Todos los campos son requeridos' type='error' />
        ) : null}
        <Form form={form} component={false}>
          <Table
            dataSource={listEvaluations}
            columns={columns}
            pagination={false}
          />

          <div className='steps-action' style={{ marginTop: 20 }}>
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
                onClick={() => submitNext()}
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

export default StepEvaluationPlan;
