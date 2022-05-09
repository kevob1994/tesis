import { ActionTypesCourse, TActionCourse } from '../actions/course/types';
import { CourseReducerI } from '../utils/interfaces';

const initialState: CourseReducerI = {
  courses: [],
  evaluations: [],
  loading: true,
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
      };
    case ActionTypesCourse.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
        loading: false,
      };
    case ActionTypesCourse.LOADING_COURSES:
      return {
        ...state,
        loading: true,
      };

			case ActionTypesCourse.LIST_EVALUATIONS_SUCCESS:
				return {
					...state,
					loading: true,
					evaluations: action.payload,
				};
    default:
      return state;
  }
};

export default courseReducer;
