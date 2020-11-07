import axios from 'axios';
import { IProgramLogExercise } from '../../../interfaces/programLogs';
import { UpdateProgramLogExerciseNotesUrl } from '../../../api/account/programLogExercise';
import { DeleteProgramLogExerciseUrl, CreateProgramLogExerciseUrl } from '../../../api/account/programLogExercise';
import { AxiosCall } from '../../util/authorization';
import { useToast } from '@chakra-ui/core';

export interface IDeleteProgramLogExercise extends AxiosCall {
  programLogExerciseId: number;
  programLogDayId: number;
  DeleteExercise: any;
}

export const deleteProgramLogExerciseAsync = async ({
  programLogExerciseId,
  programLogDayId,
  DeleteExercise,
  setError,
  setSuccess,
}: IDeleteProgramLogExercise): Promise<void> => {
  try {
    const response = await axios.delete(DeleteProgramLogExerciseUrl(programLogExerciseId));
    if (response.data) {
      setSuccess(true);
      DeleteExercise(programLogExerciseId, programLogDayId);
    }
  } catch (e) {
    console.log(e);
    setError(true);
  }
};

interface ICreateProgramLogExercise extends AxiosCall {
  programLogExercise: IProgramLogExercise;
  CreateExercise: any;
}

export const createProgramLogExerciseAsync = async ({
  programLogExercise,
  CreateExercise,
  setError,
  setSuccess,
}: ICreateProgramLogExercise): Promise<void> => {
  try {
    let result = await axios.post(CreateProgramLogExerciseUrl(), programLogExercise);
    CreateExercise(result!.data!);
    setSuccess(true);
  } catch (e) {
    setError(true);
  }
};

export interface IUpdateProgramLogExerciseNotes extends AxiosCall {
  programLogExerciseId: number;
  programLogDayId: number;
  notes: string;
  UpdateExerciseNotes: any;
}

export const updateProgramLogExerciseNotesAsync = async ({
  programLogExerciseId,
  programLogDayId,
  notes,
  UpdateExerciseNotes,
  setError,
  setSuccess,
}: IUpdateProgramLogExerciseNotes): Promise<void> => {
  try {
    await axios.put(UpdateProgramLogExerciseNotesUrl(programLogExerciseId!, notes));
    UpdateExerciseNotes(programLogExerciseId, programLogDayId, notes);
    setSuccess(true);
  } catch (e) {
    setError(true);
  }
};
