import { API_BASE } from '../../redux/actionTypes';
import qs from 'qs';

const baseUrl = `${API_BASE}Account/WorkoutDay`;

export const GetWorkoutDayByIdUrl = (workoutDayId: number) => `${baseUrl}/${workoutDayId}`;

export const CreateWorkoutDayUrl = () => `${baseUrl}`;

export const GetWorkoutDayIdByDateUrl = () => `${baseUrl}/Today`;

export const UpdateWorkoutNoteUrl = (workoutDayId: number, notes: string) =>
`${baseUrl}/Note/${workoutDayId}?notes=${notes}`;

export const UpdateWorkoutUrl = (workoutDayId: number) =>
`${baseUrl}/${workoutDayId}`;