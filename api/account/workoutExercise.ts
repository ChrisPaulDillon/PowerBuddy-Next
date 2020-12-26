import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/WorkoutExercise`;

export const CreateWorkoutExerciseUrl = () => `${baseUrl}`;

export const DeleteWorkoutExerciseUrl = (workoutExerciseId: number) => `${baseUrl}/${workoutExerciseId}`;

export const UpdateWorkoutExerciseNoteUrl = (workoutExerciseId: number, notes: string) =>
  `${baseUrl}/Note/${workoutExerciseId}?notes=${notes}`;