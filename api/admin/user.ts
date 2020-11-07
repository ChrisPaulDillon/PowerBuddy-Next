import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}/Admin/User`;

export const GetAllAdminUsers = () => baseUrl;

export const BanUser = (userId: string) => `${baseUrl}/${userId}`;
