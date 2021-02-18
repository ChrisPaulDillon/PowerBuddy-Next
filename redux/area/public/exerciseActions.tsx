import * as types from '../../actionTypes';
import axios from 'axios';
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IExercise, IExerciseMuscleGroup, IExerciseType } from 'powerbuddy-shared';
import { GetAllExerciseTypesUrl } from '../../../api/public/exercise';
import { GetAllExercisesUrl, GetAllExerciseMuscleGroupsUrl } from '../../../api/public/exercise';
import { IReduxState } from '../../initialState';

export interface ILoadExercisesAction {
  type: types.LOAD_EXERCISES;
  exercises: IExercise[];
}

export const loadExercises: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ILoadExercisesAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(GetAllExercisesUrl());
      dispatch({
        type: types.LOAD_EXERCISES,
        exercises: response.data,
      });
      localStorage.setItem('exercises', JSON.stringify(response.data));
    } catch (error) {}
  };
};

export interface ILoadExerciseMuscleGroupsAction {
  type: types.LOAD_EXERCISE_MUSCLE_GROUPS;
  exerciseMuscleGroups: IExerciseMuscleGroup[];
}

export const loadExerciseMuscleGroups: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ILoadExerciseMuscleGroupsAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(GetAllExerciseMuscleGroupsUrl());
      dispatch({
        type: types.LOAD_EXERCISE_MUSCLE_GROUPS,
        exerciseMuscleGroups: response.data,
      });
      localStorage.setItem('exerciseMuscleGroups', JSON.stringify(response.data));
    } catch (error) {}
  };
};

export interface ILoadExerciseTypesAction {
  type: types.LOAD_EXERCISE_TYPES;
  exerciseTypes: IExerciseType[];
}

export const loadExerciseTypes: ActionCreator<ThunkAction<Promise<any>, IReduxState, null, ILoadExerciseTypesAction>> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(GetAllExerciseTypesUrl());
      dispatch({
        exerciseTypes: response.data,
        type: types.LOAD_EXERCISE_TYPES,
      });
      localStorage.setItem('exerciseTypes', JSON.stringify(response.data));
    } catch (error) {}
  };
};
