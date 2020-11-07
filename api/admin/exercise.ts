import { API_BASE } from '../../redux/actionTypes';

export const GetAllUnapprovedExercisesUrl = () => `${API_BASE}Admin/Exercise`;

export const UpdateExerciseAdminUrl = () => `${API_BASE}Admin/Exercise`;

export const ApproveExerciseUrl = (exerciseId: number) => `${API_BASE}Admin/Exercise/${exerciseId}`;
