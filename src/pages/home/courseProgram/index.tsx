import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CourseI, StoreI } from '../../../utils/interfaces';
import './index.scss';

const CourseProgramPage = () => {
  const { courses } = useSelector((state: StoreI) => state.courses);
  const { id } = useParams();

  const course = courses.find((course) => course.id === Number(id));
  return (
    <div>
      <h1>Programa de la materia</h1>

      <p>{course?.program}</p>
    </div>
  );
};

export default CourseProgramPage;
