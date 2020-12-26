import * as types from '../../actionTypes';
import axios from 'axios';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser, INotificationInteraction } from '../../../interfaces/users';
import { setAuthorizationToken } from '../../util/authorization';
import { LoginUserUrl, GetLoggedInUsersProfileUrl, CreateFirstVisitStatsUrl, RegisterUserUrl } from '../../../api/account/user';
import { API_BASE } from '../../actionTypes';
import { IReduxState } from '../../initialState';

export interface IRegisterUserAction {
  type: types.REGISTER_USER;
  user: IUser;
  isAuthenticated: boolean;
}

export const RegisterUser: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ILoginUserAction>> = (
  user: IUser,
  setLoading: any,
  setError: any,
  setSuccess: any,
  setIsSignUp: any
) => {
  return async (dispatch: Dispatch) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(RegisterUserUrl(), user);
      if (response.data != null) {
        localStorage.setItem('token', response.data.token);
        setAuthorizationToken(response.data.token);
        dispatch({
          type: types.REGISTER_USER,
          user: response.data.user,
          isAuthenticated: true,
        });
        setSuccess(true);
        setIsSignUp(false);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
};

export interface ILoginUserAction {
  type: types.LOGIN_USER;
  user: IUser;
  isAuthenticated: boolean;
}

export const LoginUser: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ILoginUserAction>> = (
  user: IUser,
  setLoading: any,
  setError: any
) => {
  return async (dispatch: Dispatch) => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post(LoginUserUrl(), user);
      if (response.data != null) {
        localStorage.setItem('token', response.data.token);
        setAuthorizationToken(response.data.token);
        dispatch({
          type: types.LOGIN_USER,
          user: response.data.user,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
};

export interface IDeauthenticateUserAction {
  type: types.DESTROY_SESSION;
}

export const deauthenticateUser: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, IDeauthenticateUserAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      localStorage.removeItem('token');
      setAuthorizationToken(null);
      dispatch({
        type: types.DESTROY_SESSION,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export interface ILoadUserProfileActions {
  type: types.LOAD_USER_PROFILE;
  user: IUser;
  isAuthenticated: boolean;
}

export const loadUserProfile: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ILoadUserProfileActions>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      const response = await axios.get(GetLoggedInUsersProfileUrl());
      dispatch({
        type: types.LOAD_USER_PROFILE,
        user: response.data,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export interface ICreateFirstVisitStatsAction {
  type: types.CREATE_FIRST_VISIT_STATS;
  notifications: INotificationInteraction[];
}

export const CreateFirstVisitStats: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ICreateFirstVisitStatsAction>> = (
  data,
  setLoading,
  setError,
  setSuccess
) => {
  return async (dispatch: Dispatch) => {
    try {
      setLoading(true);
      const response = await axios.post(CreateFirstVisitStatsUrl(), data);
      if (response.data != null) {
        dispatch({
          type: types.CREATE_FIRST_VISIT_STATS,
          //notifications: response.data,
        });
        setSuccess(true);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
};
