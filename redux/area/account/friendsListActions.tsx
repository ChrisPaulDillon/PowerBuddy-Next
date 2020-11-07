import * as types from '../../actionTypes';
import axios from 'axios';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IFriendsListAssoc, IFriendRequest } from '../../../interfaces/users';
import { GetUserFriendsListUrl, GetUserFriendRequestsUrl } from '../../../api/account/friendsList';
import { API_BASE } from '../../actionTypes';
import { IReduxState } from '../../initialState';

export interface ISendFriendRequestAction {
  type: types.REQUEST_FRIEND;
  pendingFriendRequest: boolean;
}

export const sendFriendRequest: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ISendFriendRequestAction>> = (
  friendUserId: string,
  setLoading,
  setError,
  setSuccess
) => {
  return async (dispatch: Dispatch) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}Account/FriendsList/Request/${friendUserId}`);
      if (response.data) {
        dispatch({
          type: types.REQUEST_FRIEND,
          pendingFriendRequest: true,
        });
        setSuccess(true);
      }
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
};

export interface ILoadUserFriendsListAction {
  type: types.LOAD_FRIENDS_LIST;
  userFriendsList: IFriendsListAssoc[];
}

export const loadUserFriendsList: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ILoadUserFriendsListAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(GetUserFriendsListUrl());
      dispatch({
        type: types.LOAD_FRIENDS_LIST,
        userFriendsList: response.data,
      });
    } catch (error) {}
  };
};

export interface IGetUserFriendRequestsAction {
  type: types.GET_USER_FRIENDS_LIST;
  userFriendRequests: IFriendRequest[];
}

export const getUserFriendRequests: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, IGetUserFriendRequestsAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(GetUserFriendRequestsUrl());
      dispatch({
        type: types.GET_USER_FRIENDS_LIST,
        userFriendRequests: response.data,
      });
    } catch (error) {}
  };
};
