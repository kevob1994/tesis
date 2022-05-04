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
  name: string;
  description: string;
  date: Date;
  value: number | string;
}

export interface CourseReducerI {
  courses: CourseI[];
  loading: boolean;
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

export interface listItemsI {
  id: number;
  title: string;
  description: string;
  image: string;
  code: string;
  user: {
    name: string;
    photo: string;
  };
}

export interface AlertReducerI {
  title: string;
  textBody: string;
  show: boolean;
  type: StatusModalE | null;
}
