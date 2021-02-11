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

export const ResetPasswordViaEmailUrl = (userId: string) => 
`${baseUrl}/ResetPassword/Token/${userId}`;

export const UpdatePasswordUrl = () => 
`${baseUrl}/UpdatePassword`;

export const VerifyEmailUrl = (userId: string) => 
`${baseUrl}/VerifyEmail/${userId}`;

export const RequestSmsVerificationUrl = () => 
`${baseUrl}/Sms/RequestVerification`;

export const SendSmsVerificationUrl = () => 
`${baseUrl}/Sms/SendVerification`;



export const RefreshRequest = async (refreshToken: string, SetValues: (claimsValues: IClaimsValues) => void) => {
    try {
      const response = await axios.post(RefreshTokenUrl(), {refreshToken : refreshToken});
      const claimsValues = decodeJwtToken(response.data.accessToken);
      handleAuthenticationTokens(response.data.accessToken, response.data.refreshToken);
      SetValues(claimsValues);
      
      return response.data;
    } catch (err) {
      return err?.response?.data as IErrorResponse;
    }
  }
  
  export const LoginUserRequest = async (user: IUser) => {
      try {
        const response = await axios.post(LoginUserUrl(), user);
        return response.data;
      } catch (err) {
        return err?.response?.data as IErrorResponse;
    }
  }
  
  export const RegisterUserRequest = async (user: IUser) => {
      try {
          const response = await axios.post(RegisterUserUrl(), user);
          return response.data;
      } catch (err) {
          return err?.response?.data as IErrorResponse;
      }
  }
  
  export interface IChangePasswordBody {
    token: string;
    password: string;
  }
  
  export const ResetPasswordViaEmailRequest = async (userId: string, changePasswordBody: IChangePasswordBody ) => {
      try {
          const response = await axios.post(ResetPasswordViaEmailUrl(userId), changePasswordBody);
          return response.data;
      }
      catch(err) {
          return err?.response?.data as IErrorResponse;
      }
  }