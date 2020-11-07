import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Public/LiftingStats`;

export const GetLiftFeedByUserName = (userName: string) => `${baseUrl}/${userName}`;
