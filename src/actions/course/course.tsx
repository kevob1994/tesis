import { Dispatch } from 'redux';

import { clientAxios, headerAuthToken } from '../../config/axios';
import { CourseI, CourseParamsI } from '../../utils/interfaces';
import { ActionTypesCourse } from './types';

export const createCourse =
  (params: CourseParamsI) => async (dispatch: Dispatch) => {
    // debugger;
    dispatch({
      type: ActionTypesCourse.LOADING_COURSES,
    });
    try {
      const res = await clientAxios.post<CourseI[]>('course', params, {
        headers: headerAuthToken(),
      });
      // debugger;
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

export const joinCourse = (code: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypesCourse.LOADING_COURSES,
  });
  try {
    const res = await clientAxios.post<any>(
      `course/registercourse/${code}`,
      {},
      {
        headers: headerAuthToken(),
      }
    );
    // dispatch({
    //   type: ActionTypesCourse.JOIN_COURSE,
    //   payload: res.data,
    // });
  } catch (error: any) {
    console.log('error', error.response);
    //   // const err = error.response.data.error;
    //   dispatch({
    //     type: ActionTypesCourse.REQUEST_COURSE_FAIL,
    //   });
  }
};

export const editCourse =
  (params: CourseParamsI, id: number) => async (dispatch: Dispatch) => {
    // debugger;
    dispatch({
      type: ActionTypesCourse.LOADING_COURSES,
    });
    try {
      const res = await clientAxios.put<CourseI[]>(`course/${id}`, params, {
        headers: headerAuthToken(),
      });
      // debugger;
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

export const deleteCourse = (id: number) => async (dispatch: Dispatch) => {
  // debugger;
  dispatch({
    type: ActionTypesCourse.LOADING_COURSES,
  });
  try {
    const res = await clientAxios.delete<any>(`course/${id}`, {
      headers: headerAuthToken(),
    });
    // debugger;
    console.log('res');
    console.log(res);
    dispatch({
      type: ActionTypesCourse.DELETE_COURSE_SUCCESS,
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

export const getListEvaluationsCourse =
  (id: string) => async (dispatch: Dispatch) => {
    // debugger;
    dispatch({
      type: ActionTypesCourse.LOADING_COURSES,
    });
    try {
      const res = await clientAxios.get<any[]>(`course/${id}/evaluations`, {
        headers: headerAuthToken(),
      });
      // debugger;
      console.log('res');
      console.log(res);
      dispatch({
        type: ActionTypesCourse.LIST_EVALUATIONS_SUCCESS,
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
