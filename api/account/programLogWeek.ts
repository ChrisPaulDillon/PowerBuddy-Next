import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/ProgramLogWeek/`;

export const AddProgramLogWeekToLogUrl = (programLogId: number) => `${baseUrl}${programLogId}`;

export const GetProgramLogWeekByWeekNo = (programLogId: number, weekNo: number) => `${baseUrl}${programLogId}?weekNo=${weekNo}`;
