import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';
import {
  editNotesByStudent,
  getNotesAllStudents,
  getNotesByStudent,
} from 'actions/course';
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

export const NotesStudent: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loadNotes = (id: string) => dispatch(getNotesByStudent(id));
  const { notes, loadingAction } = useSelector(
    (state: StoreI) => state.courses
  );
  useEffect(() => {
    if (id) loadNotes(id);
  }, []);

  const columnsData = (): ColumnsType<{ evaluation: string; note: number }> => {
    return [
      {
        title: 'Evaluaciones',
        dataIndex: `evaluation`,
        key: 0,
        width: '50%',
      },
      {
        title: 'Notas',
        dataIndex: `note`,
        key: 1,
        width: '50%',
      },
    ];
  };

  const BodyData = () => {
    if (notes.length > 0) {
      
			return notes.map(note => ({evaluation: note.evaluation_name, note: note.grade}))
    }
    return [];
  };

  return (
    <>
      <Table
        columns={columnsData()}
        dataSource={BodyData()}
        scroll={{ x: true }}
        pagination={false}
      />
    </>
  );
};
