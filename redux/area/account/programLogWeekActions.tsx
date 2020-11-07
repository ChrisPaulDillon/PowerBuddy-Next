import axios from 'axios';
import { IProgramLogWeek } from '../../../interfaces/programLogs';
import { AddProgramLogWeekToLogUrl } from '../../../api/account/programLogWeek';
import { AxiosCall } from '../../util/authorization';

export interface IAddProgramLogWeekToLog extends AxiosCall {
  programLogId: number;
  AddWeek: (programLogWeek: IProgramLogWeek) => void;
}

export const addProgramLogWeekToLogAsync = async ({ programLogId, AddWeek, setError, setSuccess }: IAddProgramLogWeekToLog): Promise<void> => {
  try {
    const response = await axios.post(AddProgramLogWeekToLogUrl(programLogId));
    if (response.data != null) {
      AddWeek(response.data);
      setSuccess(true);
    }
  } catch (e) {
    setError(true);
  }
};
