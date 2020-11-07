import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/ProgramLogDay/`;

export const CreateProgramLogDayUrl = () => `${baseUrl}`;

export const DeleteProgramLogExerciseUrl = (programLogDayId: number) => `${baseUrl}${programLogDayId}`;

export const UpdateProgramLogDayUrl = (programLogDayId: number) => `${baseUrl}${programLogDayId}`;

export const UpdateProgramLogDayNotesUrl = (programLogDayId: number) =>
  `${baseUrl}Note/${programLogDayId}`;

export const DeleteProgramLogDayUrl = (programLogDayId: number) => `${baseUrl}${programLogDayId}`;
