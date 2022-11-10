import React from 'react';
import { RoleE, StoreI } from '../../../utils/interfaces';
import { useSelector } from 'react-redux';
import { TableStudent, TableTeacher } from './components';

const TasksPage = () => {
  const { user } = useSelector((state: StoreI) => state.auth);

  return (
    <div>
      <h1>Entregas</h1>
      {user?.role === RoleE.TEACHER ? <TableTeacher /> : <TableStudent />}
    </div>
  );
};

export default TasksPage;
