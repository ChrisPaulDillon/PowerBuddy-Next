import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/ProgramLogExercise/`;

export const CreateProgramLogExerciseUrl = () => `${baseUrl}`;

export const UpdateProgramLogExerciseUrl = (programLogExerciseId: number) => `${baseUrl}${programLogExerciseId}`;

export const UpdateProgramLogExerciseNotesUrl = (programLogExerciseId: number, notes: string) =>
  `${baseUrl}Note/${programLogExerciseId}?notes=${notes}`;

export const DeleteProgramLogExerciseUrl = (programLogExerciseId: number) => `${baseUrl}${programLogExerciseId}`;
