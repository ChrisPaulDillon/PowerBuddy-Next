import * as types from './actionTypes';
import * as publicTypes from './actionTypes';
import { initialState, IReduxState } from './initialState';
import { Reducer } from 'redux';
import { ReduxActions } from './reduxTypes';

export const reduxReducer: Reducer<IReduxState, ReduxActions> = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_EXERCISES: {
      return {
        ...state,
        exercises: [...action.exercises],
      };
    }
    case types.LOAD_EXERCISE_MUSCLE_GROUPS: {
      return {
        ...state,
        exerciseMuscleGroups: action.exerciseMuscleGroups,
      };
    }
    case types.LOAD_EXERCISE_TYPES: {
      return {
        ...state,
        exerciseTypes: action.exerciseTypes,
      };
    }
    case publicTypes.LOAD_QUOTES: {
      return {
        ...state,
        quotes: action.quotes,
      };
    }
    case publicTypes.LOAD_GENDERS: {
      return {
        ...state,
        genders: action.genders,
      };
    }
    case publicTypes.LOAD_MEMBER_STATUS: {
      return {
        ...state,
        memberStatus: action.memberStatus,
      };
    }
    case types.LOGIN_USER: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      };
    }
    case types.LOAD_USER_PROFILE: {
      return {
        ...state,
        user: action.user,
        isAuthenticated: action.isAuthenticated,
      };
    }
    case types.CREATE_FIRST_VISIT_STATS: {
      return {
        ...state, //TODO UPDATE LIFTING STATS
        user: { ...state.user, firstVisit: true },
      };
    }
    case types.LOAD_ACCOUNT_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.notifications,
      };
    }
    case types.LOAD_FRIENDS_LIST: {
      return {
        ...state,
        userFriendsList: action.userFriendsList,
      };
    }
    case types.REQUEST_FRIEND: {
      return {
        ...state, //FIX
        publicUser: { ...state.user, pendingFriendRequest: true },
      };
    }
    case types.GET_USER_FRIENDS_LIST: {
      return {
        ...state,
        userFriendRequests: action.userFriendRequests,
      };
    }
    default:
      return state;
  }
};
