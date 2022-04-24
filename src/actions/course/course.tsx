import { Dispatch } from 'redux';

import { clientAxios, headerAuthToken } from '../../config/axios';
import { CourseI, CourseParamsI } from '../../utils/interfaces';
import { ActionTypesCourse } from './types';

export const createCourse =
  (params: CourseParamsI) => async (dispatch: Dispatch) => {
    debugger;
    dispatch({
      type: ActionTypesCourse.LOADING_COURSES,
    });
    try {
      const res = await clientAxios.post<CourseI[]>('course', params, {
        headers: headerAuthToken(),
      });
      debugger;
      console.log('res');
      console.log(res);
      dispatch({
        type: ActionTypesCourse.CREATE_COURSE_SUCCESS,
        payload: res.data,
      });
    } catch (error: any) {
      console.log('error', error.response);
      //   // const err = error.response.data.error;
      dispatch({
        type: ActionTypesCourse.REQUEST_COURSE_FAIL,
      });
    }
  };

export const getCourses = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypesCourse.LOADING_COURSES,
  });
  try {
    const res = await clientAxios.get<CourseI[]>('course', {
      headers: headerAuthToken(),
    });
    console.log('res');
    console.log(res);
    dispatch({
      type: ActionTypesCourse.GET_COURSE_SUCCESS,
      payload: res.data,
    });
  } catch (error: any) {
    //   console.log('error', error.response);
    //   // const err = error.response.data.error;
    //   dispatch({
    //     type: ActionTypesCourse.REQUEST_COURSE_FAIL,
    //   });
  }
};
