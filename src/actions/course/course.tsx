import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { clientAxios, headerAuthToken } from '../../config/axios';
import {
  CommentI,
  CourseI,
  CourseParamsI,
  EvaluationsI,
  ForumI,
  ForumParamsI,
  LibraryThemeParamsI,
} from '../../utils/interfaces';
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
    await clientAxios.post<any>(
      `course/registercourse/${code}`,
      {},
      {
        headers: headerAuthToken(),
      }
    );
    dispatch({
      type: ActionTypesCourse.JOIN_COURSE,
    });
    const res = await clientAxios.get<CourseI[]>('course', {
      headers: headerAuthToken(),
    });

    dispatch({
      type: ActionTypesCourse.GET_COURSE_SUCCESS,
      payload: res.data,
    });
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
      payload: res.data[0],
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

export const createForum =
  (params: ForumParamsI) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypesCourse.LOADING_ACTION,
    });
    try {
      const response = await clientAxios.post<{ foro: ForumI }>(
        'forum',
        params,
        {
          headers: headerAuthToken(),
        }
      );
      dispatch({
        type: ActionTypesCourse.CREATE_FORUM_SUCCESS,
      });
      dispatch({
        type: ActionTypesAlert.SUCCESS_ALERT,
        payload: {
          title: 'Creación del nuevo tema de discusión',
          textBody:
            'El tema de discusión para el foro ha sido creado de forma exitosa',
        },
      });

      dispatch<any>(getForums(params.course_id.toString()));
    } catch (error: any) {
      dispatch({
        type: ActionTypesCourse.REQUEST_COURSE_FAIL,
      });
      dispatch({
        type: ActionTypesAlert.ERROR_ALERT,
        payload: {
          title: 'Creación del nuevo tema de discusión',
          textBody:
            'Ocurrio un error! Verifique la información e intente nuevamente',
        },
      });
    }
  };

export const getForums = (id: string) => async (dispatch: Dispatch) => {
  console.log('getForums');
  dispatch({
    type: ActionTypesCourse.LOADING_COURSES,
  });
  try {
    const res = await clientAxios.get<ForumI[]>(`course/${id}/forums`, {
      headers: headerAuthToken(),
    });
    console.log(res.data);

    dispatch({
      type: ActionTypesCourse.GET_FORUM_SUCCESS,
      payload: res.data,
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypesCourse.REQUEST_COURSE_FAIL,
    });
  }
};

export const editForum =
  (params: ForumParamsI, id: number) => async (dispatch: Dispatch) => {
    // debugger;
    dispatch({
      type: ActionTypesCourse.LOADING_ACTION,
    });
    try {
      const res = await clientAxios.put<ForumI>(`forum/${id}`, params, {
        headers: headerAuthToken(),
      });
      dispatch({
        type: ActionTypesCourse.EDIT_FORUM_SUCCESS,
      });
      dispatch({
        type: ActionTypesAlert.SUCCESS_ALERT,
        payload: {
          title: 'Edición del tema',
          textBody: 'El tema para discutir ha sido editado de forma exitosa',
        },
      });

      dispatch<any>(getForums(params.course_id.toString()));
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

export const newCommentForum =
  (content: string, forum_id: number) => async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypesCourse.LOADING_ACTION,
    });
    try {
      const res = await clientAxios.post<{ comment: CommentI }>(
        `comment`,
        { forum_id, content },
        {
          headers: headerAuthToken(),
        }
      );
      dispatch<any>(getCommentsForum(forum_id));

      dispatch({
        type: ActionTypesCourse.NEW_COMMENT_FORUM,
      });
    } catch (error: any) {
      console.log('error', error.response);
    }
  };

export const getCommentsForum =
  (forum_id: number) => async (dispatch: Dispatch) => {
    // debugger;
    dispatch({
      type: ActionTypesCourse.LOADING_COMMENTS,
    });
    try {
      const res = await clientAxios.get<CommentI[]>(
        `forum/${forum_id}/comments`,
        {
          headers: headerAuthToken(),
        }
      );
      // debugger;
      dispatch({
        type: ActionTypesCourse.GET_COMMENTS_FORUM,
        payload: res.data,
      });
    } catch (error: any) {
      console.log('error', error.response);
    }
  };

export const getForumInfo = (id: number) => async (dispatch: Dispatch) => {
  console.log('getForumInfo');
  dispatch({
    type: ActionTypesCourse.LOADING_COURSES,
  });
  try {
    const res = await clientAxios.get<any>(`forum/${id}`, {
      headers: headerAuthToken(),
    });
    const forum = res.data.foro[0];
    console.log(forum);
    dispatch({
      type: ActionTypesCourse.GET_INFO_FORUM,
      payload: {
        id: forum.id,
        course_id: forum.course_id,
        name: forum.name,
        description: forum.description,
        created_at: forum.created_at,
        updated_at: forum.updated_at,
        photo: forum.photo,
        user_id: forum.user_id,
        user_name: forum.user_name,
        user_photo: forum.user_photo,
      },
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypesCourse.REQUEST_COURSE_FAIL,
    });
  }
};

export const deleteForum = (id: number) => async (dispatch: Dispatch) => {
  // debugger;
  dispatch({
    type: ActionTypesCourse.LOADING_COURSES,
  });
  try {
    const res = await clientAxios.delete<any>(`forum/${id}`, {
      headers: headerAuthToken(),
    });
    if (res.status === 200) {
      dispatch({
        type: ActionTypesCourse.DELETE_FORUM_SUCCESS,
        payload: id,
      });
      dispatch({
        type: ActionTypesAlert.SUCCESS_ALERT,
        payload: {
          title: 'Eliminar tema de discusion',
          textBody: 'El tema de discusion ha sido eliminado de forma exitosa',
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

export const createLibraryTheme =
  (params: LibraryThemeParamsI) => async (dispatch: Dispatch) => {
    // debugger;
    dispatch({
      type: ActionTypesCourse.LOADING_COURSES,
    });
    try {
      const res = await clientAxios.post<any>(`files`, params, {
        headers: headerAuthToken(),
      });
      console.log(res);
      // if (res.status === 200) {
      //   dispatch({
      //     type: ActionTypesCourse.DELETE_FORUM_SUCCESS,
      //     payload: id,
      //   });
      //   dispatch({
      //     type: ActionTypesAlert.SUCCESS_ALERT,
      //     payload: {
      //       title: 'Eliminar tema de discusion',
      //       textBody: 'El tema de discusion ha sido eliminado de forma exitosa',
      //     },
      //   });
      // }
    } catch (error: any) {
      console.log('error', error.response);
      //   // const err = error.response.data.error;
      dispatch({
        type: ActionTypesCourse.REQUEST_COURSE_FAIL,
      });
    }
  };
