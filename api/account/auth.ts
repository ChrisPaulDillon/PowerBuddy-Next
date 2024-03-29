import axios from 'axios';
import { IUser } from 'powerbuddy-shared/lib';
import { IErrorResponse } from '../util/IErrorResponse';
import { IClaimsValues } from '../../components/users/UserContext';
import { API_BASE } from '../../redux/actionTypes';
import { decodeJwtToken, handleAuthenticationTokens } from '../../util/axiosUtils';

const baseUrl = `${API_BASE}Account/Auth`;

export const LoginWithFacebookUrl = () => `${baseUrl}/Login/Facebook`;

export const LoginUserUrl = () => `${baseUrl}/Login`;

export const RegisterUserUrl = () => `${baseUrl}/Register`;

export const LogoutUserUrl = (refreshToken: string) => `${baseUrl}/Logout/${refreshToken}`;

export const RefreshTokenUrl = () => `${baseUrl}/Refresh`;

export const UpdatePasswordUrl = () => 
`${baseUrl}/UpdatePassword`;

export const AcceptResetPasswordViaEmailUrl = (userId: string) => 
`${baseUrl}/Email/Accept/ResetPassword/Token/${userId}`;

export const AcceptEmailVerificationUrl = (userId: string) => 
`${baseUrl}/Email/Accept/ConfirmEmail/${userId}`;

export const AcceptSmsConfirmationUrl = () => 
`${baseUrl}/Sms/Accept/ConfirmSms`;



export const RefreshRequest = async (refreshToken: string): Promise<IClaimsValues> => {
    try {
      const response = await axios.post(RefreshTokenUrl(), {refreshToken : refreshToken});
      const claimsValues = decodeJwtToken(response.data.accessToken);
      handleAuthenticationTokens(response.data.accessToken, response.data.refreshToken);
      return claimsValues;
    } catch (err) {
      return err?.response?.data;
    }
  }
  
  export const LoginUserRequest = async (user: IUser) => {
      try {
        return await axios.post(LoginUserUrl(), user);
      } catch (err) {
        return err?.response?.data;
    }
  }
  
  export const RegisterUserRequest = async (user: IUser) => {
      try {
          return await axios.post(RegisterUserUrl(), user);
      } catch (err) {
          return err?.response?.data;
      }
  }
  
  export interface IChangePasswordBody {
    token: string;
    password: string;
  }
  
  export const ResetPasswordViaEmailRequest = async (userId: string, changePasswordBody: IChangePasswordBody ) => {
      try {
          const response = await axios.post(AcceptResetPasswordViaEmailUrl(userId), changePasswordBody);
          return response.data;
      }
      catch(err) {
          return err?.response?.data as IErrorResponse;
      }
  }