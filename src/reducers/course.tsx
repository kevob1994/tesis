import { ActionTypesCourse, TActionCourse } from '../actions/course/types';
import { CourseReducerI } from '../utils/interfaces';

const initialState: CourseReducerI = {
  courses: [],
  loading: true,
};

const courseReducer = (state = initialState, action: TActionCourse) => {
  switch (action.type) {
    case ActionTypesCourse.CREATE_COURSE_SUCCESS:
    case ActionTypesCourse.GET_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case ActionTypesCourse.LOADING_COURSES:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default courseReducer;
