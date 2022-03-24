export interface UserI {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserLoginI {
  user: UserI;
  token: string;
}

export interface StoreI {
  auth: {
    token: string | null;
    isAuthenticate: boolean | null;
    loading: boolean;
    user: UserI | null;
  };
  alert: any;
}
