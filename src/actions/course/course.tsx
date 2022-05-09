import { Dispatch } from 'redux';

import { clientAxios, headerAuthToken } from '../../config/axios';
import { CourseI, CourseParamsI, EvaluationsI } from '../../utils/interfaces';
import { ActionTypesAlert } from '../alert/types';
import { ActionTypesCourse } from './types';

export const createCourse =
  (params: CourseParamsI) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypesCourse.LOADING_COURSES,
    });
    try {
      const res = await clientAxios.post<CourseI[]>('course', params, {
        headers: headerAuthToken(),
      });
      dispatch({
        type: ActionTypesCourse.CREATE_COURSE_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: ActionTypesAlert.SUCCESS_ALERT,
        payload: {
          title: 'Creación de curso',
          textBody: 'El curso ha sido creado de forma exitosa',
        },
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypesCourse.REQUEST_COURSE_FAIL,
      });
      dispatch({
        type: ActionTypesAlert.ERROR_ALERT,
        payload: {
          title: 'Creación de curso',
          textBody:
            'Ocurrio un error! Verifique la información e intente nuevamente',
        },
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
    dispatch({
      type: ActionTypesCourse.REQUEST_COURSE_FAIL,
    });
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
        type: ActionTypesAlert.SUCCESS_ALERT,
        payload: {
          title: 'Edición de curso',
          textBody: 'El curso ha sido editado de forma exitosa',
        },
      });
    } catch (error: any) {
      console.log('error', error.response);
      //   // const err = error.response.data.error;
      dispatch({
        type: ActionTypesCourse.REQUEST_COURSE_FAIL,
      });
      dispatch({
        type: ActionTypesAlert.ERROR_ALERT,
        payload: {
          title: 'Creación de curso',
          textBody:
            'Ocurrio un error! Verifique la información e intente nuevamente',
        },
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
    if (res.status === 200) {
      dispatch({
        type: ActionTypesCourse.DELETE_COURSE_SUCCESS,
        payload: id,
      });
      dispatch({
        type: ActionTypesAlert.SUCCESS_ALERT,
        payload: {
          title: 'Eliminar curso',
          textBody: 'El curso ha sido eliminado de forma exitosa',
        },
      });
    }
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
    dispatch({
      type: ActionTypesCourse.LOADING_COURSES,
    });
    try {
      const res = await clientAxios.get<EvaluationsI[]>(
        `course/${id}/evaluations`,
        {
          headers: headerAuthToken(),
        }
      );
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

export const getUsersCourse = (id: string) => async (dispatch: Dispatch) => {
  // debugger;
  dispatch({
    type: ActionTypesCourse.LOADING_COURSES,
  });
  try {
    const res = await clientAxios.get<any[]>(`course/${id}/list`, {
      headers: headerAuthToken(),
    });
    dispatch({
      type: ActionTypesCourse.USERS_COURSE_SUCCESS,
      payload: res.data,
    });
  } catch (error: any) {
    console.log('error', error.response);
    //   // const err = error.response.data.error;
    dispatch({
      type: ActionTypesCourse.REQUEST_COURSE_FAIL,
    });
    dispatch({
      type: ActionTypesAlert.ERROR_ALERT,
      payload: {
        title: 'Creación de curso',
        textBody:
          'Ocurrio un error! Verifique la información e intente nuevamente',
      },
    });
  }
};
