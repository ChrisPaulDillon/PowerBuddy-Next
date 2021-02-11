import axios from 'axios';
import { IWorkoutTemplate } from 'powerbuddy-shared/lib';
import { IErrorResponse } from '../util/IErrorResponse';
import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/WorkoutTemplate`;

export const CreateWorkoutTemplateUrl = () => `${baseUrl}`;

export const CreateWorkoutTemplateRequest = async (workoutTemplate: IWorkoutTemplate) => {
    try {
      const response = await axios.post(CreateWorkoutTemplateUrl(), workoutTemplate);
      return response.data;
    } catch (err) {
      return err?.response?.data as IErrorResponse;
  }
}