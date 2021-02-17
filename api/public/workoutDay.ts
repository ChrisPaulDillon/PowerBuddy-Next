import axios, { AxiosResponse } from "axios";
import { API_BASE } from "../../redux/actionTypes";
import { IAPIResponse } from "../util/ApiResponse";
import { IErrorResponse } from "../util/IErrorResponse";

const baseUrl = `${API_BASE}Public/WorkoutDay`;

export const GetAllPublicWorkoutIds = () => `${baseUrl}/Id`;

export const GetAllPublicWorkoutIdsRequest = async () : Promise<AxiosResponse<IAPIResponse<number[]>> | IErrorResponse> => {
    try {
      const response = await axios.get<IAPIResponse<Array<number>>>(GetAllPublicWorkoutIds());
      return response;
    } catch (err) {
      return err?.response?.data as IErrorResponse;
  }
}