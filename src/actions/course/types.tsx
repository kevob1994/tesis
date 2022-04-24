import { CourseI, UserI } from '../../utils/interfaces';

export enum ActionTypesCourse {
  CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS',
  GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS',
  REQUEST_COURSE_FAIL = 'REQUEST_COURSE_FAIL',
  LOADING_COURSES = 'LOADING_COURSES',
}

interface IActionCourseCreate {
  type: ActionTypesCourse.CREATE_COURSE_SUCCESS;
  payload: CourseI[];
}

interface IActionCourseGet {
  type: ActionTypesCourse.GET_COURSE_SUCCESS;
  payload: CourseI[];
}

interface IActionCourseLoading {
  type: ActionTypesCourse.LOADING_COURSES;
}

export type TActionCourse =
  | IActionCourseCreate
  | IActionCourseGet
  | IActionCourseLoading;
