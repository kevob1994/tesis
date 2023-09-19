import React, { useEffect } from 'react';
import { Table } from 'antd';
import { ITableEvaluations, StoreI } from '../../../utils/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListEvaluationsCourse } from '../../../actions/course';
import { ColumnProps } from 'antd/lib/table';
import LoaderSpin from 'components/LoaderSpin';

const columns: ColumnProps<ITableEvaluations>[] = [
  {
    title: 'Evaluación',
    dataIndex: 'name',
    key: 'name',

    width: '20%',
  },
  {
    title: 'Descripción',
    dataIndex: 'description',
    key: 'description',

    width: '40%',
  },
  {
    title: 'Tipo de evaluación',
    dataIndex: 'type',
    key: 'type',

    width: '20%',
  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
    render: (text, record, index) => {
      return <p>{text}</p>;
    },
    width: '20%',
  },
  {
    title: 'Nota',
    dataIndex: 'value',
    key: 'value',
    width: '20%',
  },
];

const EvaluationPlanPage = () => {
  const dispatch = useDispatch();
  const loadEvaluations = (id: string) =>
    dispatch(getListEvaluationsCourse(id));
  const { id } = useParams();
  const { evaluations, loading } = useSelector(
    (state: StoreI) => state.courses
  );

  useEffect(() => {
    if (id) loadEvaluations(id);
  }, []);

  return (
    <div>
      <h1>Plan de evaluación</h1>
      {loading ? (
        <LoaderSpin />
      ) : (
        <>
          <Table
            pagination={false}
            columns={columns}
            dataSource={evaluations.map((evaluation,) => ({
              ...evaluation,
              key: evaluation.id,
            }))}
          />
        </>
      )}
    </div>
  );
};

export default EvaluationPlanPage;
