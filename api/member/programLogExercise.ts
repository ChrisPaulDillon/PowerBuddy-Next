import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}Member/ProgramLogExercise/`;

export const UpdateProgramLogExerciseMemberUrl = (
  programLogExerciseId: number
) => `${baseUrl}${programLogExerciseId}`;
