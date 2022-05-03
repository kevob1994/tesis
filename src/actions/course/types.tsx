import { CourseI, UserI } from '../../utils/interfaces';

export enum ActionTypesCourse {
  CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS',
  EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS',
  DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS',
  GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS',
  JOIN_COURSE = 'JOIN_COURSE',
  REQUEST_COURSE_FAIL = 'REQUEST_COURSE_FAIL',
  LIST_EVALUATIONS_SUCCESS = 'LIST_EVALUATIONS_SUCCESS',
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

interface IActionCourseJoin {
  type: ActionTypesCourse.JOIN_COURSE;
  payload: any;
}

interface IActionCourseEdit {
  type: ActionTypesCourse.EDIT_COURSE_SUCCESS;
  payload: CourseI[];
}

interface IActionCourseDelete {
  type: ActionTypesCourse.DELETE_COURSE_SUCCESS;
  payload: any;
}

interface IActionCourseEvaluations {
  type: ActionTypesCourse.LIST_EVALUATIONS_SUCCESS;
  payload: any;
}
interface IActionCourseLoading {
  type: ActionTypesCourse.LOADING_COURSES;
}

export type TActionCourse =
  | IActionCourseCreate
  | IActionCourseGet
  | IActionCourseJoin
  | IActionCourseEdit
  | IActionCourseDelete
  | IActionCourseLoading
  | IActionCourseEvaluations;
