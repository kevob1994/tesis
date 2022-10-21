import {
  AssignmentI,
  CourseI,
  EvaluationsI,
  ForumI,
  ItemChatI,
  LibraryI,
  NoteI,
  NotesStudentI,
} from 'utils/interfaces';

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
  GET_THEME_LIBRARY = 'GET_THEME_LIBRARY',
  CREATE_THEME_LIBRARY = 'CREATE_THEME_LIBRARY',
  DELETE_THEME_LIBRARY = 'DELETE_THEME_LIBRARY',
  GET_ASSIGNMENTS = 'GET_ASSIGNMENTS',
  LIST_EVALUATIONS_BY_STUDENT_SUCCESS = 'LIST_EVALUATIONS_BY_STUDENT_SUCCESS',
  UPLOAD_EVALUATION_FILE = 'UPLOAD_EVALUATION_FILE',
  GET_NOTES_ALL_STUDENTS = 'GET_NOTES_ALL_STUDENTS',
  GET_NOTES_BY_STUDENT = 'GET_NOTES_BY_STUDENT',
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

interface IActionCourseEvaluationsByStudent {
  type: ActionTypesCourse.LIST_EVALUATIONS_BY_STUDENT_SUCCESS;
  payload: any[];
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

interface IActionDeleteForumCourse {
  type: ActionTypesCourse.DELETE_FORUM_SUCCESS;
  payload: number;
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
interface IActionCreateTheme {
  type: ActionTypesCourse.CREATE_THEME_LIBRARY;
  payload: LibraryI;
}

interface IActionGetTheme {
  type: ActionTypesCourse.GET_THEME_LIBRARY;
  payload: LibraryI[];
}

interface IActionDeleteTheme {
  type: ActionTypesCourse.DELETE_THEME_LIBRARY;
  payload: number;
}

interface IActionRequestFail {
  type: ActionTypesCourse.REQUEST_COURSE_FAIL;
}

interface IActionGetAssignments {
  type: ActionTypesCourse.GET_ASSIGNMENTS;
  payload: AssignmentI[];
}

interface IUploadEvaluationFile {
  type: ActionTypesCourse.UPLOAD_EVALUATION_FILE;
  payload: any;
}

interface IGetNotesAllStudents {
  type: ActionTypesCourse.GET_NOTES_ALL_STUDENTS;
  payload: NotesStudentI[];
}

interface IGetNotesByStudent {
  type: ActionTypesCourse.GET_NOTES_BY_STUDENT;
  payload: NoteI[];
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
  | IActionDeleteForumCourse
  | IActionLoadComments
  | IActionCreateTheme
  | IActionGetTheme
  | IActionDeleteTheme
  | IActionRequestFail
  | IActionGetAssignments
  | IActionCourseEvaluationsByStudent
  | IUploadEvaluationFile
  | IGetNotesAllStudents
  | IGetNotesByStudent;
