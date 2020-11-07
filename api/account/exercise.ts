import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/Exercise`;

export const CreateExerciseUrl = () => `${baseUrl}`;
export const GetExerciseByIdUrl = (exerciseId: number) => `${baseUrl}/${exerciseId}`;
