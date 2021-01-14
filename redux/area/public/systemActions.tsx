import * as types from '../../actionTypes';
import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IQuote, IGender, IMemberStatus } from 'powerbuddy-shared';
import { GetAllQuotesUrl } from '../../../api/public/quote';
import { GetAllGendersUrl, GetAllMemberStatusUrl } from '../../../api/public/system';
import { IReduxState } from '../../initialState';

export interface ILoadQuotesAction {
  type: types.LOAD_QUOTES;
  quotes: IQuote[];
}

export const loadQuotes: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ILoadQuotesAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(GetAllQuotesUrl());
      if (response.data != null) {
        dispatch({
          quotes: response.data,
          type: types.LOAD_QUOTES,
        });
        localStorage.setItem('quotes', JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export interface IGetAllGendersAction {
  type: types.LOAD_GENDERS;
  genders: IGender[];
}

export const GetAllGenders: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, IGetAllGendersAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(GetAllGendersUrl());
      if (response.data) {
        dispatch({
          genders: response.data,
          type: types.LOAD_GENDERS,
        });
        localStorage.setItem('genders', JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export interface IGetAllMemberStatusAction {
  type: types.LOAD_MEMBER_STATUS;
  memberStatus: IMemberStatus[];
}

export const GetAllMemberStatus: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, IGetAllMemberStatusAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(GetAllMemberStatusUrl());
      if (response.data) {
        dispatch({
          memberStatus: response.data,
          type: types.LOAD_MEMBER_STATUS,
        });
        localStorage.setItem('memberStatus', JSON.stringify(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
