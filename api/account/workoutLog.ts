import { API_BASE } from '../../redux/actionTypes';
import qs from 'qs';

const baseUrl = `${API_BASE}Account/WorkoutLog`;

export const GetAllWorkoutLogStatsUrl = () => `${baseUrl}/Stat`;

export const GetWorkoutWeekUrl = () => `${baseUrl}/Week`;

export const GetWorkoutWeekWithDateUrl = (date: Date) => {
  console.log(date);
  
  if(date != null) {
    return `${baseUrl}/Week?date=${date}`;
  }
  else {
    return `${baseUrl}/Week`;
  }
}

export const GetWorkoutLogByIdUrl = (WorkoutLogId: number) => {
  if(WorkoutLogId) {
    return `${baseUrl}/${WorkoutLogId}`;
   // ?${qs.stringify({
  //   diaryUserId: userId
  // })}`;
  }
  else {
    return `${baseUrl}`;
  }
}

export const CreateWorkoutLogFromScratchUrl = () => `${baseUrl}/Scratch`;

export const CreateWorkoutLogFromTemplateUrl = (templateWorkoutId: number) =>
  `${baseUrl}/Template/${templateWorkoutId}`;

export const DeleteWorkoutLogUrl = (workoutLogId: number) => `${baseUrl}/${workoutLogId}`;

export const GetAllWorkoutLogCalendarStatsQueryUrl = () => `${baseUrl}/Calendar`;