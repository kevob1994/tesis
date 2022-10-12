import { FunctionComponent, useEffect, useState } from 'react';
import {
  ArrowLeftOutlined,
  CloseOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Button, Col, Image, Row, Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCourse, editCourse } from 'actions/course';
import {
  categoryClass,
  dateFormat,
  dateFormatTime,
} from 'utils/const';
import { CourseFormI, ITableEvaluations, StoreI } from 'utils/interfaces';
import './index.scss';

interface IStepEndConfirmProps {
  prevStep: () => void;
  openModalCancel: () => void;
  formCourse: CourseFormI;
  listEvaluations: ITableEvaluations[];
  fileList: any[];
}

const StepEndConfirm: FunctionComponent<IStepEndConfirmProps> = ({
  prevStep,
  openModalCancel,
  formCourse,
  listEvaluations,
  fileList,
}) => {
  const [imageUrl2, setImageUrl2] = useState<any>();
  const auth = useSelector((state: StoreI) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (fileList.length > 0) setImageUrl2(URL.createObjectURL(fileList[0]));
  }, [fileList]);

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
      title: 'Fecha',
      dataIndex: 'date',
      render: (text, record, index) => moment(text).format(dateFormatTime),
      key: 'date',
    },
    {
      title: 'Nota',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const saveCourse = () => {
    const { onChange, date_begin, date_finish, ...obj } = formCourse;
    const evaluations = listEvaluations.map((course) => ({
      ...course,
      date: moment(course.date).format('YYYY-MM-DD HH:MM:00'),
    }));

    if (auth.user?.id) {
      if (id) {
        dispatch(
          editCourse(
            {
              ...obj,
              date_begin: date_begin.format('YYYY/MM/DD'),
              date_finish: date_finish.format('YYYY/MM/DD'),
              evaluations: JSON.stringify(evaluations),
              user_id: auth.user.id,
            },
            Number(id)
          )
        );
      } else {
        dispatch(
          createCourse({
            ...obj,
            date_begin: date_begin.format('YYYY/MM/DD'),
            date_finish: date_finish.format('YYYY/MM/DD'),
            evaluations: JSON.stringify(evaluations),
            user_id: auth.user.id,
          })
        );
      }
    }
  };

  return (
    <div className='content'>
      <div className='steps-action' style={{ marginTop: 20 }}>
        <h1>Verificación de la información</h1>

        <Row gutter={50}>
          <Col span={6} flex={1}>
            <Image
              preview={false}
              src={imageUrl2 ? imageUrl2 : 'error'}
              alt='avatar'
              width={300}
              height={200}
              fallback='data:image/png;base64,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'
            />
            <div style={{ marginTop: 20, marginBottom: 40 }}>
              <p className='text-info'>
                Nombre completo del curso: <span>{formCourse.full_name}</span>
              </p>
              <p className='text-info'>
                Nombre corto del curso: <span>{formCourse.short_name}</span>
              </p>
              <p className='text-info'>
                Categoria:{' '}
                <span>
                  {
                    categoryClass.find(
                      (x) => x.id === Number(formCourse.category)
                    )?.category
                  }
                </span>
              </p>
              <p className='text-info'>
                Fecha inicio:{' '}
                <span>{formCourse.date_begin.format(dateFormat)}</span>
              </p>
              <p className='text-info'>
                Fecha fin:{' '}
                <span>{formCourse.date_finish.format(dateFormat)}</span>
              </p>
              <p className='text-info'>
                Descripción: <span>{formCourse.description}</span>
              </p>
            </div>
          </Col>
          <Col span={18} flex={1}>
            <div style={{ marginBottom: 40 }}>
              <h4>Programa de la materia</h4>
              <p className='text-program'>{formCourse.program}</p>
            </div>
            <div style={{ marginBottom: 40 }}>
              <h4>Plan de Evaluación</h4>
              <Table
                dataSource={listEvaluations}
                columns={columns}
                pagination={false}
              />
            </div>
          </Col>
        </Row>

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
            icon={<SaveOutlined />}
            onClick={() => saveCourse()}
          >
            Finalizar
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default StepEndConfirm;
