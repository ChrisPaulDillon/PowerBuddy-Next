import { API_BASE } from '../../redux/actionTypes';

const baseUrl = `${API_BASE}Account/User/`;

export const LoginUserUrl = () => `${baseUrl}Login`;
export const RegisterUserUrl = () => `${baseUrl}Register`;
export const GetLoggedInUsersProfileUrl = () => `${baseUrl}Profile`;
export const CreateFirstVisitStatsUrl = () => `${baseUrl}FirstVisit`;
export const EditProfileUrl = () => `${baseUrl}Profile`;
