import React, { useEffect, useState } from 'react';
import { Table, Tag, Switch, Tooltip, Button, Row, Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ColumnProps } from 'antd/lib/table';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import {
  AssignmentI,
  EvaluationsI,
  ITableEvaluations,
  StoreI,
} from '../../../../utils/interfaces';
import {
  getAssignments,
  getListEvaluationsCourse,
} from '../../../../actions/course';
import { clientAxios, headerAuthToken } from '../../../../config/axios';
import './index.scss';

export const TableTeacher = () => {
  const [listEvaluations, setListEvaluations] = useState<EvaluationsI[]>([]);
  const [assignmentSelect, setAssignmentSelect] = useState<
    ITableEvaluations | undefined
  >(undefined);
  const { id } = useParams();
  const { evaluations, assignments, loadingAction, loading } = useSelector(
    (state: StoreI) => state.courses
  );
  const dispatch = useDispatch();
  const loadEvaluations = (id: string) =>
    dispatch(getListEvaluationsCourse(id));
  const loadAssignments = (id: number) => dispatch(getAssignments(id));

  useEffect(() => {
    if (id) loadEvaluations(id);
  }, []);

  useEffect(() => {
    if (evaluations) setListEvaluations(evaluations);
  }, [evaluations]);

  const onChangeCheck = (checked: boolean, index: number) => {
    console.log(`switch to ${checked}`);

    setListEvaluations(
      listEvaluations.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            available: checked,
          };
        }
        return item;
      })
    );
  };

  const getFileToDownload = (evaluation_id: number, student_id: string) => {
    return clientAxios.get(
      `evaluation/${evaluation_id}/assignment?student_id=${student_id}`,
      {
        responseType: 'arraybuffer',
        headers: headerAuthToken(),
      }
    );
  };

  const downloadFile = (
    evaluation_id: number,
    student_id: string,
    student_name: string
  ) => {
    getFileToDownload(evaluation_id, student_id).then((response) => {
      const type = response.headers['content-type'];
      const blob = new Blob([response.data], { type: type });
      const link = document.createElement('a');
      link.setAttribute(
        'download',
        `${assignmentSelect!.name.toLocaleLowerCase()}-${student_name.toLocaleLowerCase()}`
      );
      link.href = window.URL.createObjectURL(blob);
      // link.download = 'file.xlsx';
      link.click();
    });
  };

  const columnsTeacher: ColumnProps<ITableEvaluations>[] = [
    {
      title: 'Evaluación',
      dataIndex: 'name',
      key: 'name',

      width: '20%',
    },
    {
      title: 'Habilitar entrega',
      dataIndex: 'available',
      key: 'available',
      render: (text, record, index) => {
        const available = !!text;
        return (
          <Switch
            defaultChecked={available}
            checked={available}
            onChange={() => onChangeCheck(!text, index)}
          />
        );
      },
      width: '20%',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record, index) => {
        return (
          <>
            <div>
              <Tooltip placement='bottom' title='Ver entregas'>
                <Button
                  type='primary'
                  shape='circle'
                  icon={<EyeOutlined />}
                  onClick={(e) => {
                    if (record && record.id) loadAssignments(record.id);
                    setAssignmentSelect(record);
                    e.stopPropagation();
                  }}
                  size='large'
                />
              </Tooltip>
            </div>
          </>
        );
      },
      width: '20%',
    },
  ];

  const columnsAssignments: ColumnProps<AssignmentI>[] = [
    {
      title: 'Estudiantes',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        return `${record.users_name} ${record.users_lastname}`;
      },
    },
    {
      title: assignmentSelect?.name,
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        if (record.upload)
          return (
            <Tooltip title='descargar'>
              <Button
                type='primary'
                shape='circle'
                icon={<DownloadOutlined />}
                onClick={(e) => {
                  downloadFile(
                    record.evaluation_id,
                    record.users_id.toString(),
                    `${record.users_name}-${record.users_lastname}`
                  );
                }}
                size='large'
              />
            </Tooltip>
          );
        return <Tag color='red'>Sin entregar</Tag>;
      },
      width: '40%',
    },
  ];

  return (
    <div>
      {loading ? (
        <div className='content-spiner'>
          <Spin />
        </div>
      ) : (
        <Row>
          <Col span={12} style={{ padding: '0px 10px' }}>
            <div>
              <Table
                pagination={false}
                columns={columnsTeacher}
                dataSource={listEvaluations.map((evaluation) => ({
                  ...evaluation,
                  key: evaluation.course_id,
                }))}
              />
            </div>
          </Col>

          <Col span={12} style={{ padding: '0px 10px' }}>
            {loadingAction ? (
              <div className='content-spiner'>
                <Spin />
              </div>
            ) : (
              <div>
                {!assignmentSelect ? (
                  <p style={{ textAlign: 'center' }}>
                    Debe seleccionar una evaluacion para ver las entregas
                  </p>
                ) : (
                  <>
                    <Table
                      pagination={false}
                      columns={columnsAssignments}
                      dataSource={assignments.map((assignment, index) => ({
                        ...assignment,
                        key: index,
                      }))}
                    />
                  </>
                )}
              </div>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};
