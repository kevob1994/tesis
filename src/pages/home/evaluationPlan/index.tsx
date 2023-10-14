import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { ITableEvaluations, RoleE, StoreI } from '../../../utils/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getListEvaluationsCourse } from '../../../actions/course';
import { ColumnProps } from 'antd/lib/table';
import LoaderSpin from 'components/LoaderSpin';

const columns: ColumnProps<ITableEvaluations>[] = [
  {
    title: 'Evaluación',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: 'Descripción',
    dataIndex: 'description',
    key: 'description',

  },
  {
    title: 'Tipo de evaluación',
    dataIndex: 'type',
    key: 'type',

  },
  {
    title: 'Fecha',
    dataIndex: 'date',
    key: 'date',
    render: (text, record, index) => {
      return <p>{text}</p>;
    },
  },
  {
    title: 'Porcentaje (%)',
    dataIndex: 'value',
    key: 'value',
  },
];

const EvaluationPlanPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: StoreI) => state.auth);
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
       <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Plan de Evaluación</h1>
        {user?.role === RoleE.TEACHER ? (
          <Button type='primary' onClick={() => {navigate(`/edit-course/${id}`)}} style={{ height: 40 }}>
            Editar
          </Button>
        ) : (
          <div></div>
        )}
      </div>
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
