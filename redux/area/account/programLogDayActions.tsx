import axios from 'axios';
import { IProgramLogDay } from '../../../interfaces/programLogs';
import { CreateProgramLogDayUrl, UpdateProgramLogDayUrl, UpdateProgramLogDayNotesUrl } from './../../../api/account/programLogDay';
import { AxiosCall } from '../../util/authorization';

export interface ICreateProgramLogDay extends AxiosCall {
  programLogDay: IProgramLogDay;
  AddDay: (programLogDay: IProgramLogDay) => void;
}

export const createProgramLogDay = async ({ programLogDay, AddDay, setError, setSuccess }: ICreateProgramLogDay): Promise<void> => {
  try {
    const response = await axios.post(CreateProgramLogDayUrl(), programLogDay);
    if (response.data) {
      setSuccess(true);
      AddDay(response.data);
    }
  } catch (e) {
    setError(true);
  }
};

export interface IUpdateProgramLogDay extends AxiosCall {
  programLogDay: IProgramLogDay;
  UpdateDay: (programLogDay: IProgramLogDay) => void;
  setPersonalBests: any;
}

export const updateProgramLogDayAsync = async ({
  programLogDay,
  UpdateDay,
  setPersonalBests,
  setError,
  setSuccess,
}: IUpdateProgramLogDay): Promise<void> => {
  try {
    programLogDay.completed = true;
    var response = await axios.put(UpdateProgramLogDayUrl(programLogDay.programLogDayId!), programLogDay);
    if (response.data != null) {
      setPersonalBests(response.data);
    }
    if (response.data) {
      UpdateDay(programLogDay);
      setSuccess(true);
    }
  } catch (e) {
    setError(true);
  }
};

export interface IUpdateProgramLogDayNotes extends AxiosCall {
  programLogDayId: number;
  notes: string;
  UpdateDayNotes: any;
}

export const updateProgramLogDayNotesAsync = async ({ programLogDayId, notes, setError, setSuccess }: IUpdateProgramLogDayNotes): Promise<void> => {
  try {
    await axios.put(UpdateProgramLogDayNotesUrl(programLogDayId!), notes);
    setSuccess(true);
  } catch (e) {
    setError(true);
  }
};
