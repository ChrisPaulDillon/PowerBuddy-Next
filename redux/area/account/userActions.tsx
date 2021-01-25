import * as types from '../../actionTypes';
import axios from 'axios';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { CreateFirstVisitStatsUrl } from '../../../api/account/user';
import { IReduxState } from '../../initialState';
export interface ICreateFirstVisitStatsAction {
  type: types.CREATE_FIRST_VISIT_STATS;
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
