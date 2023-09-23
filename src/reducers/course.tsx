import { ActionTypesCourse, TActionCourse } from "../actions/course/types";
import { CourseReducerI } from "../utils/interfaces";

const initialState: CourseReducerI = {
  courses: [],
  evaluations: [],
  evaluationsByStudent: [],
  loading: true,
  loadingAction: false,
  listChat: [],
  forum: [],
  forumSelected: null,
  comments: [],
  loadingComments: false,
  library: [],
  assignments: [],
  noteStudents: [],
  notes: [],
  program: "",
  infoCourse: undefined,
};

const courseReducer = (state = initialState, action: TActionCourse) => {
  switch (action.type) {
    case ActionTypesCourse.CREATE_COURSE_SUCCESS:
      return {
        ...state,
      };
    case ActionTypesCourse.GET_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        loading: false,
        loadingAction: false,
				infoCourse: undefined
      };
    case ActionTypesCourse.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
        loading: false,
        loadingAction: false,
      };
    case ActionTypesCourse.USERS_COURSE_SUCCESS:
      return {
        ...state,
        listChat: action.payload,
        loading: false,
        loadingAction: false,
      };
    case ActionTypesCourse.LIST_EVALUATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        evaluations: action.payload,
      };
    case ActionTypesCourse.LIST_EVALUATIONS_BY_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        evaluationsByStudent: action.payload,
      };
    case ActionTypesCourse.GET_FORUM_SUCCESS:
      return {
        ...state,
        forum: action.payload,
        loading: false,
        loadingAction: false,
        loadingComments: false,
        forumSelected: null,
        comments: [],
      };
    case ActionTypesCourse.CREATE_FORUM_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        loadingComments: false,
      };
    case ActionTypesCourse.EDIT_FORUM_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        loadingComments: false,
      };
    case ActionTypesCourse.GET_COMMENTS_FORUM:
      return {
        ...state,
        forum: action.payload,
        comments: [...action.payload],
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.NEW_COMMENT_FORUM:
      return {
        ...state,
        forum: action.payload,
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.GET_INFO_FORUM:
      return {
        ...state,
        forumSelected: action.payload,
        loadingAction: false,
        loading: false,
      };

    case ActionTypesCourse.DELETE_FORUM_SUCCESS:
      return {
        ...state,
        forum: [...state.forum.filter((theme) => theme.id !== action.payload)],
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.CREATE_THEME_LIBRARY:
      return {
        ...state,
        library: [...state.library, action.payload],
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.GET_THEME_LIBRARY:
      return {
        ...state,
        library: [...action.payload],
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.DELETE_THEME_LIBRARY:
      return {
        ...state,
        library: [
          ...state.library.filter((theme) => theme.id !== action.payload),
        ],
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.GET_PROGRAM:
      return {
        ...state,
        program: action.payload,
        loadingAction: false,
        loading: false,
      };
    case ActionTypesCourse.LOADING_COURSES:
      return {
        ...state,
        loading: true,
      };
    case ActionTypesCourse.LOADING_COMMENTS:
      return {
        ...state,
        loadingComments: true,
      };
    case ActionTypesCourse.LOADING_ACTION:
      return {
        ...state,
        loadingAction: true,
      };
    case ActionTypesCourse.REQUEST_COURSE_FAIL:
      return {
        ...state,
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload,
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.GET_NOTES_ALL_STUDENTS:
      return {
        ...state,
        noteStudents: action.payload,
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };
    case ActionTypesCourse.GET_NOTES_BY_STUDENT:
      return {
        ...state,
        notes: action.payload,
        loadingAction: false,
        loading: false,
        loadingComments: false,
      };

    case ActionTypesCourse.GET_INFO_COURSE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        infoCourse: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
