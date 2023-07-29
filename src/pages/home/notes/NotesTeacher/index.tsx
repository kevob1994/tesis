import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import { editNotesByStudent, getNotesAllStudents } from 'actions/course';
import { useParams } from 'react-router-dom';
import { StoreI } from 'utils/interfaces';
import Tooltip from 'antd/es/tooltip';
import { EditOutlined, SaveFilled } from '@ant-design/icons';
import './index.scss';

interface TaskListI {
  title: string;
  dataIndex: string;
  key: number;
  width: number;
}

export const NotesTeacher: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loadNotes = (id: string) => dispatch(getNotesAllStudents(id));
  const editNotes = (course_id: string, params: string) =>
    dispatch(editNotesByStudent(course_id, params));
  const [studenSelected, setStudenSelected] = useState<any>(undefined);
  const [openModal, setOpenModal] = useState<any>(false);
  const [taskList, setTaskList] = useState<TaskListI[] | undefined>(undefined);
  const { noteStudents, loadingAction } = useSelector(
    (state: StoreI) => state.courses
  );
  useEffect(() => {
    if (id) loadNotes(id);
  }, []);

  useEffect(() => {
    if (noteStudents)
      setTaskList(
        noteStudents.map(({ evaluation_name, evaluation_id }, index) => ({
          title: evaluation_name,
          dataIndex: `${evaluation_id}_evaluation`,
          key: index + 1,
          width: 100,
        }))
      );
  }, [noteStudents]);

  const columnsData = (): ColumnsType<any> => {
    return [
      {
        title: 'Estudiantes',
        dataIndex: `name_student`,
        key: 0,
        width: 100,
      },
      ...(taskList ? taskList : []),
      {
        title: 'Acciones',
        dataIndex: `action`,
        key: noteStudents.length + 1,
        width: 100,
        render: (text, record, index) => (
          <div
            onClick={() => {
              setStudenSelected(record);
              setOpenModal(true);
            }}
          >
            {' '}
            <Tooltip
              placement='bottom'
              title='Modificar nota del estudiante'
            >
              <Button
                type='primary'
                shape='circle'
                icon={<EditOutlined />}
                size='large'
              />
            </Tooltip>
          </div>
        ),
      },
    ];
  };

  const BodyData = () => {
    if (noteStudents.length > 0) {
      const objStudent: any = noteStudents[0].grade.map(
        ({ user_name, user_lastname, user_id }) => ({
          name_student: `${user_name} ${user_lastname}`,
          id: user_id,
        })
      );

      return objStudent.map((student: any) => {
        const objects: any = {};
        let notes_grades: any = [];
        for (var i = 0; i < noteStudents.length; i++) {
          objects[`${noteStudents[i].evaluation_id}_evaluation`] = noteStudents[
            i
          ].grade.find((grades) => grades.user_id === student.id)!.grade;

          notes_grades.push({
            id_note: noteStudents[i].evaluation_id,
            id_grade: noteStudents[i].grade.find(
              (grades) => grades.user_id === student.id
            )!.grade_id,
          });
        }

        return { ...student, ...objects, notes_grades };
      });
    }
    return [];
  };

  return (
    <>
      <Modal
        title={`Editar notas - Estudiante: ${studenSelected?.name_student}`}
        visible={openModal}
        footer={null}
        centered
        destroyOnClose
        forceRender
        onCancel={() => {
          setOpenModal(false);
          setStudenSelected(undefined);
        }}
        width={400}
      >
        <div>
          {taskList &&
            studenSelected &&
            taskList.length > 0 &&
            taskList?.map((task) => (
              <Row style={{ marginBottom: 15 }}>
                <Col span={18}>
                  <p className='text-form'>{task.title}</p>
                </Col>
                <Col span={6}>
                  <Input
                    size='large'
                    width={50}
                    value={studenSelected[task.dataIndex]}
                    type='number'
                    name={task.dataIndex}
                    required
                    max={100}
                    min={0}
                    onChange={(e) => {
                      if (Number(e.target.value) > 100) {
                        setStudenSelected({
                          ...studenSelected,
                          [e.target.name]: 100,
                        });
                      } else if (Number(e.target.value) < 0) {
                        setStudenSelected({
                          ...studenSelected,
                          [e.target.name]: 0,
                        });
                      } else {
                        setStudenSelected({
                          ...studenSelected,
                          [e.target.name]: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </Col>
              </Row>
            ))}
          <Button
            type='primary'
            icon={<SaveFilled />}
            block
            onClick={() => {
              let params = [];

              for (var i = 0; i < studenSelected.notes_grades.length; i++) {
                const obj = {
                  id: studenSelected.notes_grades[i].id_grade,
                  grade:
                    studenSelected[
                      `${studenSelected.notes_grades[i].id_note}_evaluation`
                    ],
                };

                params.push(obj);
              }
              if (id) editNotes(id, JSON.stringify(params));
              setOpenModal(false);
            }}
          >
            Guardar
          </Button>
        </div>
      </Modal>
      <Table
        columns={columnsData()}
        dataSource={BodyData()}
        scroll={{ x: true }}
        pagination={false}
      />
    </>
  );
};
