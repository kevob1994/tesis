import { getProgram } from 'actions/course';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StoreI } from '../../../utils/interfaces';
import './index.scss';

const CourseProgramPage = () => {
  const { program, loading } = useSelector((state: StoreI) => state.courses);
  const dispatch = useDispatch();
  const { id } = useParams();

  const loadProgram = (id: string) => dispatch(getProgram(id));

  useEffect(() => {
    if (id) loadProgram(id);
  }, [id]);

  return (
    <div>
      <h1>Programa de la materia</h1>
      {loading ? (
        <div className='content-spiner'>
          <Spin />
        </div>
      ) : (
        <p>{program}</p>
      )}
    </div>
  );
};

export default CourseProgramPage;
