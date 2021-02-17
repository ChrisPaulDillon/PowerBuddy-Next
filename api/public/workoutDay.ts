import { IWorkoutDay } from 'powerbuddy-shared';
import axios from "axios";
import { API_BASE } from "../../redux/actionTypes";
const baseUrl = `${API_BASE}Public/WorkoutDay`;

export const GetAllPublicWorkoutIds = () => `${baseUrl}/Id`;

export const GetAllPublicWorkoutIdsRequest = async () => {
    try {
      const response = await axios.get(GetAllPublicWorkoutIds());
      return response;
    } catch (err) {
      return err?.response?.data 
  }
}

const GetWorkoutDayByIdUrl = (workoutDayId: number) => {
  if(workoutDayId) {
      return `${baseUrl}/${workoutDayId}`;
  }
}


export const GetWorkoutDayByIdRequest = async (workoutDayId: number) => {
  try {
    const response = await axios.get(GetWorkoutDayByIdUrl(workoutDayId));
    return response;
  } catch (err) {
    return err?.response?.data 
  }
}