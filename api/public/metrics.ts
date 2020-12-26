import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Public/Metric`;

export const GetLandingPageMetrics = () => `${baseUrl}/Landing`;