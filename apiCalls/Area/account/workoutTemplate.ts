import { CreateWorkoutTemplateUrl } from './../../../api/account/workoutTemplate';
import axios from "axios";
import { IErrorResponse } from "../IErrorResponse";
import { IWorkoutTemplate } from 'powerbuddy-shared';


export const CreateWorkoutTemplateRequest = async (workoutTemplate: IWorkoutTemplate) => {
    try {
      const response = await axios.post(CreateWorkoutTemplateUrl(), workoutTemplate);
      return response.data;
    } catch (err) {
      return err?.response?.data as IErrorResponse;
  }
}