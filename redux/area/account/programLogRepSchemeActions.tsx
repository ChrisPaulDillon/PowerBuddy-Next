import axios from 'axios';
import { IProgramLogRepScheme } from '../../../interfaces/programLogs';
import {
  UpdateProgramLogRepSchemeUrl,
  DeleteProgramLogRepSchemeUrl,
  CreateProgramLogRepSchemeCollectionUrl,
} from '../../../api/account/programLogRepScheme';
import { AxiosCall } from '../../util/authorization';

export interface IUpdateProgramLogRepScheme extends AxiosCall {
  programLogRepScheme: IProgramLogRepScheme;
  programLogDayId: number;
  EditRepScheme: any;
}

export const updateProgramLogRepSchemeAsync = async ({
  programLogRepScheme,
  programLogDayId,
  EditRepScheme,
  setError,
  setSuccess,
}: IUpdateProgramLogRepScheme): Promise<void> => {
  try {
    const response = await axios.put(UpdateProgramLogRepSchemeUrl(), programLogRepScheme);
    if (response.data != null) {
      EditRepScheme(programLogRepScheme, programLogDayId);
      setSuccess(true);
    }
  } catch (error) {
    setError(true);
  }
};

export interface ICreateProgramLogRepSchemeCollection extends AxiosCall {
  programLogRepSchemes: IProgramLogRepScheme[];
  programLogExerciseId?: number;
  programLogDayId?: number;
  AddRepSchemeCollectionToExercise: any;
}

export const createProgramLogRepSchemeCollectionAsync = async ({
  programLogRepSchemes,
  programLogExerciseId,
  programLogDayId,
  AddRepSchemeCollectionToExercise,
  setError,
  setSuccess,
}: ICreateProgramLogRepSchemeCollection): Promise<void> => {
  try {
    const response = await axios.post(CreateProgramLogRepSchemeCollectionUrl(), programLogRepSchemes);
    if (response.data != null) {
      setSuccess(true);
      AddRepSchemeCollectionToExercise(response.data, programLogExerciseId, programLogDayId);
    }
  } catch (error) {
    setError(true);
  }
};

export interface IDeleteProgramLogRepScheme extends AxiosCall {
  programLogDayId?: number;
  programLogExerciseId?: number;
  programLogRepSchemeId?: number;
  DeleteRepScheme: any;
}

export const deleteProgramLogRepSchemeAsync = async ({
  programLogDayId,
  programLogExerciseId,
  programLogRepSchemeId,
  DeleteRepScheme,
  setError,
  setSuccess,
}: IDeleteProgramLogRepScheme): Promise<void> => {
  try {
    const response = await axios.delete(DeleteProgramLogRepSchemeUrl(programLogRepSchemeId!));
    if (response.data != null) {
      DeleteRepScheme(programLogRepSchemeId, programLogExerciseId, programLogDayId);
      setSuccess(true);
    }
  } catch (error) {
    setError(true);
  }
};
