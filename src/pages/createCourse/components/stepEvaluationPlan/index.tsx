import { Button, DatePicker, Input, Row, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import React, { useState } from 'react';
import { dateFormat } from '../../../../utils/const';

interface ITableEvaluations {
  // id: string;
  // key: string;
  evaluation: string;
  description: string;
  date: Date;
  note: number;
}

const initEvaluation: ITableEvaluations = {
  evaluation: '',
  description: '',
  date: new Date(),
  note: 0,
};

const StepEvaluationPlan = () => {
  const [listEvaluations, setListEvaluations] = useState<ITableEvaluations[]>([
    initEvaluation,
  ]);

  const addEvaluation = () => {
    setListEvaluations([...listEvaluations, initEvaluation]);
  };

  const deleteEvaluation = () => {};

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

  const columns: ColumnProps<ITableEvaluations>[] = [
    {
      title: 'Evaluación',
      dataIndex: 'evaluation',
      key: 'evaluation',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('evaluation', index)} />
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('description', index)} />
      ),
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text, record, index) => {
        return (
          <DatePicker
            size='large'
            placeholder='Seleccione una fecha'
            value={moment(text, dateFormat)}
            format={dateFormat}
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
      dataIndex: 'note',
      key: 'note',
      render: (text, record, index) => (
        <Input value={text} onChange={onInputChange('goals', index)} />
      ),
    },
  ];
  return (
    <div className='content'>
      <div className='content-course-form-row '>
        <Row justify='space-between' align='middle'>
          <h1>Plan de Evaluación</h1>
          <Button type='primary' onClick={() => addEvaluation()}>
            Agregar Evaluación
          </Button>
        </Row>
        <Table
          dataSource={listEvaluations}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default StepEvaluationPlan;
