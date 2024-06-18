import { IUser } from "./user.interfaces";

export interface ILoginFormValues {
  email: string;
  password: string;
}

export interface IRegistrationFormValues {
  full_name: string;
  email: string;
  password: string;
}

export interface IForgotFormValues {
  email: string;
}
export interface IUpdateValues {
  status: number;
  message: string;
  user: IUser;
}


export interface HttpErrorResponse {
  message: string;
}
