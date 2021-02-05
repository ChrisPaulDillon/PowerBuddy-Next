import { IClaimsValues } from './../../../components/users/UserContext';
import { ResetPasswordViaEmailUrl, RefreshTokenUrl } from './../../../api/account/auth';
import axios from 'axios';
import { IUser } from 'powerbuddy-shared';
import { LoginUserUrl, RegisterUserUrl } from '../../../api/account/auth';
import { IErrorResponse } from '../IErrorResponse';
import { decodeJwtToken, handleAuthenticationTokens } from '../../../util/axiosUtils';

export const RefreshRequest = async (refreshToken: string, SetValues: (claimsValues: IClaimsValues) => void) => {
  try {
    const response = await axios.post(RefreshTokenUrl(), {refreshToken : refreshToken});
    const claimsValues = decodeJwtToken(response.data.accessToken);
    handleAuthenticationTokens(response.data.accessToken, response.data.refreshToken);
    console.log(claimsValues);
    
    SetValues(claimsValues);
    
    return response.data;
  } catch (err) {
    return err?.response?.data as IErrorResponse;
  };
}

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