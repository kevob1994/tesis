import React, { useEffect, useState } from 'react';
import {
  Table,
  Tag,
  Switch,
  Tooltip,
  Button,
  Row,
  Col,
  UploadProps,
  message,
  Upload,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ColumnProps } from 'antd/lib/table';
import {
  DownloadOutlined,
  EyeOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  AssignmentI,
  EvaluationsI,
  EvaluationStudentI,
  ITableEvaluations,
  StoreI,
} from '../../../../utils/interfaces';
import {
  getAssignments,
  getListEvaluationsCourse,
} from '../../../../actions/course';
import { TypeFiles } from '../../../../utils/const';
import { clientAxios, headerAuthToken } from '../../../../config/axios';
import './index.scss';

export const TableTeacher = () => {
  const [listEvaluations, setListEvaluations] = useState<EvaluationsI[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);
  const [showAssignments, setShowAssignments] = useState<boolean>(false);
  const [assignmentSelect, setAssignmentSelect] = useState<
    ITableEvaluations | undefined
  >(undefined);
  const { id } = useParams();
  const { evaluations, assignments, loadingAction } = useSelector(
    (state: StoreI) => state.courses
  );
  const dispatch = useDispatch();
  const loadEvaluations = (id: string) =>
    dispatch(getListEvaluationsCourse(id));
  const loadAssignments = (id: number) => dispatch(getAssignments(id));

  const props: UploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      const type = file.name
        .substr(file.name.lastIndexOf('.') + 1 - file.name.length)
        .toLowerCase();

      const isValidFormat =
        type === TypeFiles.TYPE_PDF ||
        type === TypeFiles.TYPE_WORD ||
        type === TypeFiles.TYPE_EXCEL ||
        type === TypeFiles.TYPE_IMG_PNG ||
        type === TypeFiles.TYPE_IMG_JPEG ||
        type === TypeFiles.TYPE_IMG_JPG;
      if (isValidFormat) {
        setFileList([file]);
      } else {
        message.error(
          `${file.name} debe tener formato pdf, word, excel, png, jpg o pjeg`
        );
      }

      return false;
    },
    fileList,
  };

  useEffect(() => {
    if (id) loadEvaluations(id);
  }, []);

  useEffect(() => {
    if (evaluations) setListEvaluations(evaluations);
  }, [evaluations]);

  useEffect(() => {
    if (assignments) console.log('assignments', assignments);
    setShowAssignments(true);
  }, [assignments]);

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
      console.log('response');
      console.log(response);
      const type = response.headers['content-type'];
      const blob = new Blob([response.data], { type: type });
      const link = document.createElement('a');
      link.setAttribute(
        'download',
        `${assignmentSelect!.name.toLocaleLowerCase()}-${
          student_name.toLocaleLowerCase()
        }`
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
      title: 'Estudiante',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        return `${record.users_name} ${record.users_lastname}`;
      },
    },
    {
      title: 'Entrega de evaluación',
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
          <div>
            {!showAssignments ? (
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
        </Col>
      </Row>
    </div>
  );
};
