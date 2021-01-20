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
    default:
      return state;
  }
};
