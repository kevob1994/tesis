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
}


export interface AuthReducerI {
  token: string | null;
  isAuthenticate: boolean | null;
  loading: boolean;
  user: null | UserI;
}

export interface StoreI {
  auth: AuthReducerI;
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
