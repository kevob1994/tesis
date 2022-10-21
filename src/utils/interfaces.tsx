import { StatusModalE } from '../hooks/useModalStatus';

export enum GenderE {
  FEMININE = 'F',
  MALE = 'M',
}

export enum RoleE {
  STUDENT = '0',
  TEACHER = '1',
}

export interface UserI {
  name: string;
  lastname: string;
  email: string;
  birthday: Date;
  gender: GenderE;
  phone: string;
  biography: string;
  role: RoleE;
  photo: null | string;
  updated_at: Date;
  created_at: Date;
  id: number;
  email_verified_at: null | string;
}

export interface AuthReducerI {
  token: string | null;
  isAuthenticate: boolean | null;
  loading: boolean;
  user: null | UserI;
}

export interface StoreI {
  auth: AuthReducerI;
  courses: CourseReducerI;
  alert: AlertReducerI;
}

export interface UserRegisterFormI {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  birthday: string;
  gender: GenderE;
  biography: string;
  role: RoleE;
  photo: string;
}

export interface UserEditFormI {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password?: string;
  password_confirmation?: string;
  birthday: string;
  gender: GenderE;
  biography: string;
  role?: RoleE;
  photo: string;
}

export interface CourseFormI {
  full_name: string;
  short_name: string;
  category: string;
  date_begin: moment.Moment;
  date_finish: moment.Moment;
  description: string;
  photo: string;
  program: string;
  onChange: (
    value: string | Date | number | moment.Moment,
    field:
      | 'full_name'
      | 'short_name'
      | 'category'
      | 'date_begin'
      | 'date_finish'
      | 'description'
      | 'photo'
      | 'program'
  ) => void;
}
export interface ITableEvaluations {
  id?: number | null;
  name: string;
  description: string;
  date: Date;
  value: number | string;
}

export interface ITableEvaluationsStudent {
  id?: number | null;
  name: string;
  description: string;
  date: Date;
  value: number | string;
}

export interface CourseReducerI {
  courses: CourseI[];
  evaluations: EvaluationsI[];
  loading: boolean;
  loadingAction: boolean;
  listChat: ItemChatI[];
  forum: ForumI[];
  forumSelected: ForumI | null;
  comments: CommentI[];
  loadingComments: boolean;
  library: LibraryI[];
  assignments: AssignmentI[];
  evaluationsByStudent: EvaluationStudentI[];
  noteStudents: NotesStudentI[];
  notes: NoteI[];
}

export interface NoteI {
  evaluation_id: number;
  evaluation_name: string;
  grade: number;
}

export interface NotesStudentI {
  evaluation_id: number;
  evaluation_name: string;
  grade: {
    grade: number;
    grade_id: number;
    user_id: number;
    user_lastname: string;
    user_name: string;
  }[];
}
export interface EvaluationStudentI {
  evaluation_id: number;
  evaluation_name: string;
  upload: boolean;
  file_id?: number;
}

export interface ItemChatI {
  user_email: string;
  user_id: number;
  user_lastname: string;
  user_name: string;
  user_phone: string;
  user_photo: string;
  user_role: RoleE;
}

export interface CourseI extends CourseParamsI {
  created_at: string;
  id: number;
  updated_at: string;
  user_lastname: string;
  user_name: string;
  user_photo: string;
  code: string;
}
export interface EvaluationsI {
  id: number;
  course_id: number;
  created_at: Date;
  date: Date;
  description: string;
  name: string;
  updated_at: Date;
  value: string;
  available?: boolean;
}

export interface CourseParamsI {
  full_name: string;
  short_name: string;
  category: string;
  description: string;
  photo: string;
  program: string;
  date_begin: string;
  date_finish: string;
  evaluations?: string;
  user_id: number;
}

export interface ForumParamsI {
  name: string;
  description: string;
  course_id: number;
  photo: string;
}

export interface listItemsI {
  id: number;
  title: string;
  description: string;
  image: string | null;
  code?: string;
  user: {
    name: string;
    photo: string | null;
  };
}

enum TypeFileE {
  word = 'word',
  pdf = 'pdf',
  excel = 'excel',
  img = 'img',
}

export interface listFilesI {
  id: number;
  title: string;
  description: string;
  type: any;
  user_id: number;
}

export interface AlertReducerI {
  title: string;
  textBody: string;
  show: boolean;
  type: StatusModalE | null;
}

export interface ForumI {
  id: number;
  course_id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  photo: string | null;
  user_id: number;
  user_name: string;
  user_photo: string | null;
}

export interface CommentI {
  content: string;
  created_at: Date;
  forum_id: number;
  id: number;
  updated_at: Date;
  user_id: number;
  user_name: string;
  user_photo: string | null;
}

export interface LibraryThemeParamsI {
  title: string;
  description: string;
  file: any;
  course_id: string;
}

export interface EvaluationFileParamsI {
  file: any;
  id_evaluation: string;
}

export interface LibraryI {
  course_id: number;
  created_at: Date;
  description: string;
  extension: string;
  file: string;
  id: 2;
  title: string;
  updated_at: Date;
  user_id: number;
}

export interface AssignmentI {
  evaluation_id: number;
  evaluation_name: string;
  evaluation_value: number;
  grade: number;
  upload: number;
  users_id: number;
  users_lastname: string;
  users_name: string;
}
