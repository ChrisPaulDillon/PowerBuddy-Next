import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}Public/Exercise`;

export const GetAllExercisesUrl = () => `${baseUrl}`;

export const GetExerciseByIdUrl = (exerciseId: number) => `${baseUrl}/${exerciseId}`;

export const GetAllExerciseMuscleGroupsUrl = () =>
  `${baseUrl}/ExerciseMuscleGroup`;
export const GetAllExerciseTypesUrl = () => `${baseUrl}/ExerciseType`;

export const GetAllRepSchemeTypeUrl = () => `${baseUrl}/RepSchemeType`;
