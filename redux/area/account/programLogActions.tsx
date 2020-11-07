import axios from 'axios';
import { IProgramLog } from '../../../interfaces/programLogs';
import { CreateProgramLogFromScratchUrl, CreateProgramLogFromTemplateUrl, DeleteProgramLogUrl } from '../../../api/account/programLog';
import { AxiosCall } from '../../util/authorization';
import { IProgramLogInputScratch } from '../../../components/programLog/interfaces';

export interface ICreateProgramLogFromTemplate extends AxiosCall {
  programLogToCreate: IProgramLog;
  templateProgramId: number;
  setMissingStats: any;
}

export const createProgramLogFromTemplate = async ({
  programLogToCreate,
  templateProgramId,
  setMissingStats,
  setError,
  setSuccess,
}: ICreateProgramLogFromTemplate): Promise<void> => {
  try {
    setError(false);
    const response = await axios.post(CreateProgramLogFromTemplateUrl(templateProgramId), programLogToCreate);
    if (response.data.length > 0) {
      setMissingStats(response.data);
    } else if (response.data != null) {
      setSuccess(true);
    }
  } catch (e) {
    setError(true);
  }
};

export interface IDeleteProgramLog extends AxiosCall {
  programLogId: number;
  DeleteLog: () => void;
}

export const deleteProgramLogAsync = async ({ programLogId, DeleteLog, setError, setSuccess }: IDeleteProgramLog): Promise<void> => {
  try {
    const response = await axios.delete(DeleteProgramLogUrl(programLogId));
    if (response.data) {
      setSuccess(true);
      DeleteLog();
    }
  } catch (error) {
    setError(true);
  }
};
