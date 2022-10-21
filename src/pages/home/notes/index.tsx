import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RoleE, StoreI } from 'utils/interfaces';
import { NotesStudent } from './NotesStudent';
import { NotesTeacher } from './NotesTeacher';

interface TaskListI {
  title: string;
  dataIndex: string;
  key: number;
  width: number;
}

const NotesPage: React.FC = () => {
  const { user } = useSelector((state: StoreI) => state.auth);
  return (
    <div>
      <h1>Notas</h1>
      {user?.role === RoleE.TEACHER ? <NotesTeacher /> :  <NotesStudent />}
    </div>
  );
};

export default NotesPage;
