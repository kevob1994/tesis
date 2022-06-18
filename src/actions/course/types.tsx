import {
  CourseI,
  EvaluationsI,
  ForumI,
  ItemChatI,
  UserI,
} from '../../utils/interfaces';

export enum ActionTypesCourse {
  CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS',
  EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS',
  DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS',
  GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS',
  JOIN_COURSE = 'JOIN_COURSE',
  REQUEST_COURSE_FAIL = 'REQUEST_COURSE_FAIL',
  LIST_EVALUATIONS_SUCCESS = 'LIST_EVALUATIONS_SUCCESS',
  USERS_COURSE_SUCCESS = 'USERS_COURSE_SUCCESS',
  LOADING_COURSES = 'LOADING_COURSES',
  CREATE_FORUM_SUCCESS = 'CREATE_FORUM_SUCCESS',
  GET_FORUM_SUCCESS = 'GET_FORUM_SUCCESS',
  EDIT_FORUM_SUCCESS = 'EDIT_FORUM_SUCCESS',
  DELETE_FORUM_SUCCESS = 'DELETE_FORUM_SUCCESS',
  DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS',
  GET_COMMENTS_FORUM = 'GET_COMMENTS_FORUM',
  GET_INFO_FORUM = 'GET_INFO_FORUM',
  LOADING_ACTION = 'LOADING_ACTION',
  LOADING_COMMENTS = 'LOADING_COMMENTS',
  NEW_COMMENT_FORUM = 'NEW_COMMENT_FORUM',
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
  payload: number;
}

interface IActionCourseEvaluations {
  type: ActionTypesCourse.LIST_EVALUATIONS_SUCCESS;
  payload: EvaluationsI[];
}
interface IActionCourseUsers {
  type: ActionTypesCourse.USERS_COURSE_SUCCESS;
  payload: ItemChatI[];
}
interface IActionCourseLoading {
  type: ActionTypesCourse.LOADING_COURSES;
}

interface IActionCourseLoadingAction {
  type: ActionTypesCourse.LOADING_ACTION;
}

interface IActionCreateForumCourse {
  type: ActionTypesCourse.CREATE_FORUM_SUCCESS;
}

interface IActionEditForumCourse {
  type: ActionTypesCourse.EDIT_FORUM_SUCCESS;
}
interface IActionGetForumCourse {
  type: ActionTypesCourse.GET_FORUM_SUCCESS;
  payload: ForumI[];
}

interface IActionGetCommentsForum {
  type: ActionTypesCourse.GET_COMMENTS_FORUM;
  payload: ForumI[];
}

interface IActionGetInfoForum {
  type: ActionTypesCourse.GET_INFO_FORUM;
  payload: ForumI;
}

interface IActionNewCommentForum {
  type: ActionTypesCourse.NEW_COMMENT_FORUM;
  payload: ForumI;
}
interface IActionLoadComments {
  type: ActionTypesCourse.LOADING_COMMENTS;
}

export type TActionCourse =
  | IActionCourseCreate
  | IActionCourseGet
  | IActionCourseJoin
  | IActionCourseEdit
  | IActionCourseDelete
  | IActionCourseLoading
  | IActionCourseEvaluations
  | IActionCourseUsers
  | IActionGetForumCourse
  | IActionCourseLoadingAction
  | IActionCreateForumCourse
  | IActionGetCommentsForum
  | IActionGetInfoForum
  | IActionNewCommentForum
  | IActionEditForumCourse
  | IActionLoadComments;
