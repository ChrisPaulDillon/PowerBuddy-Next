import { ResetPasswordViaEmailUrl } from './../../../api/account/auth';
import axios from 'axios';
import { IUser } from 'powerbuddy-shared';
import { LoginUserUrl, RegisterUserUrl } from '../../../api/account/auth';
import { IErrorResponse } from '../IErrorResponse';


export const LoginUserRequest = async (user: IUser) => {
    try {
      const response = await axios.post(LoginUserUrl(), user);
      return response.data;
    } catch (err) {
      return err?.response?.data as IErrorResponse;
  };
}

export const RegisterUserRequest = async (user: IUser) => {
    try {
        const response = await axios.post(RegisterUserUrl(), user);
        return response.data;
    } catch (err) {
        return err?.response?.data as IErrorResponse;
  };
}

export interface IChangePasswordBody {
  token: string;
  password: string;
}

export const ResetPasswordViaEmailRequest = async (userId: string, changePasswordBody: IChangePasswordBody ) => {
    try {
        const response = await axios.post(ResetPasswordViaEmailUrl(userId as string), changePasswordBody);
        return response.data;
    }
    catch(err) {
        return err?.response?.data as IErrorResponse;
    }
}