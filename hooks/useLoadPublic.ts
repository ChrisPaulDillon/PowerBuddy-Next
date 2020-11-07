import { GetAllGenders, GetAllMemberStatus } from './../redux/area/public/systemActions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { IAppState } from '../redux/store';
import * as types from '../redux/actionTypes';
import * as publicTypes from '../redux/actionTypes';
import { loadQuotes } from '../redux/area/public/systemActions';
import { loadExerciseTypes } from '../redux/area/public/exerciseActions';
import { loadExercises, loadExerciseMuscleGroups } from '../redux/area/public/exerciseActions';

const useLoadPublic = () => {
  const { exercises } = useSelector((state: IAppState) => state.state);
  const { exerciseMuscleGroups } = useSelector((state: IAppState) => state.state);
  const { exerciseTypes } = useSelector((state: IAppState) => state.state);
  const { quotes } = useSelector((state: IAppState) => state.state);
  const { genders } = useSelector((state: IAppState) => state.state);
  const { memberStatus } = useSelector((state: IAppState) => state.state);
  const { repSchemeTypes } = useSelector((state: IAppState) => state.state);
  const { templateDifficulties } = useSelector((state: IAppState) => state.state);
  const { templates } = useSelector((state: IAppState) => state.state);

  const dispatcher = useDispatch();

  useEffect(() => {
    if (exercises.length === 0) {
      const exerciseLS = null; //localStorage.getItem("exercises");
      if (exerciseLS != null) {
        dispatcher({
          type: types.LOAD_EXERCISES,
          exercises: JSON.parse(exerciseLS),
        });
      } else {
        dispatcher(loadExercises());
      }
    }
  }, [exercises]);

  useEffect(() => {
    if (exerciseMuscleGroups.length === 0) {
      const exerciseMgLS = null; //localStorage.getItem("exerciseMuscleGroups");
      if (exerciseMgLS != null) {
        dispatcher({
          type: types.LOAD_EXERCISE_MUSCLE_GROUPS,
          exerciseMuscleGroups: JSON.parse(exerciseMgLS),
        });
      } else {
        dispatcher(loadExerciseMuscleGroups());
      }
    }
  }, [exerciseMuscleGroups]);

  useEffect(() => {
    if (exerciseTypes.length === 0) {
      const exerciseTypes = localStorage.getItem('exerciseTypes');
      if (exerciseTypes != null) {
        dispatcher({
          type: types.LOAD_EXERCISE_TYPES,
          exerciseTypes: JSON.parse(exerciseTypes),
        });
      } else {
        dispatcher(loadExerciseTypes());
      }
    }
  }, [exerciseTypes]);

  useEffect(() => {
    if (quotes.length === 0) {
      const quotes = localStorage.getItem('quotes');
      if (quotes != null) {
        dispatcher({
          type: publicTypes.LOAD_QUOTES,
          quotes: JSON.parse(quotes),
        });
      } else {
        dispatcher(loadQuotes());
      }
    }
  }, []);

  useEffect(() => {
    if (genders.length === 0) {
      const genders = localStorage.getItem('genders');
      if (genders != null) {
        dispatcher({
          type: publicTypes.LOAD_GENDERS,
          genders: JSON.parse(genders),
        });
      } else {
        dispatcher(GetAllGenders());
      }
    }
  }, []);

  useEffect(() => {
    if (memberStatus.length === 0) {
      const memberStatus = localStorage.getItem('memberStatus');
      if (memberStatus != null) {
        dispatcher({
          type: publicTypes.LOAD_MEMBER_STATUS,
          memberStatus: JSON.parse(memberStatus),
        });
      } else {
        dispatcher(GetAllMemberStatus());
      }
    }
  }, []);
};

export default useLoadPublic;
