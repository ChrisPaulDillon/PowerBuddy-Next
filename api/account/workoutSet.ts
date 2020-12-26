import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/WorkoutSet`;

export const CreateWorkoutSetCollectionUrl = () => `${baseUrl}/Collection`;

export const UpdateWorkoutSetUrl = (workoutDayId: number) => `${baseUrl}/${workoutDayId}`;

export const DeleteWorkoutSetUrl = (workoutSetId: number) => `${baseUrl}/${workoutSetId}`;