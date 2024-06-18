export interface IUser {
  alternate_email: string | null;
  alternate_phone: string | null;
  avatar: string | null;
  city: string | null;
  country: string;
  createdAt: string;
  email: string;
  full_name: string;
  googleId: string | null;
  id: number;
  is_verified: boolean;
  phone: string | null;
  secret_answer: string | null;
  secret_question: string | null;
  state: string | null;
  stripe_customer_id: string | null;
  updatedAt: string;
  zip_code: string | null;
}

export interface IUserData {
  user: IUser;
}

export interface IEditUser {
  role?: string;
  concierge?: string;
  status?: string;
}

export interface IConceirge {
  id: number;
  user: IUser;
}

export interface IConceirgeUsers {
  users: IUser[];
}
