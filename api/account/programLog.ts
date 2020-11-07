import { API_BASE } from '../../redux/actionTypes';
import qs from 'qs';

const baseUrl = `${API_BASE}Account/ProgramLog`;

export const GetAllProgramLogStatsUrl = () => `${baseUrl}/Stat`;

export const GetProgramLogByIdUrl = (programLogId: number) => {
  if(programLogId) {
    return `${baseUrl}/${programLogId}`;
   // ?${qs.stringify({
  //   diaryUserId: userId
  // })}`;
  }
  else {
    return `${baseUrl}`;
  }
}

//TODO Update Program Log
export const CreateProgramLogFromScratchUrl = () => `${baseUrl}/Scratch`;

export const CreateProgramLogFromTemplateUrl = (templateProgramId: number) =>
  `${baseUrl}/Template/${templateProgramId}`;

export const DeleteProgramLogUrl = (programLogId: number) => `${baseUrl}/${programLogId}`;

export const GetAllProgramLogCalendarStatsQueryUrl = () => `${baseUrl}/Calendar`;
