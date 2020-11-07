import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}Public/System`;

export const GetAllGendersUrl = () => `${baseUrl}/Gender`;
export const GetAllMemberStatusUrl = () => `${baseUrl}/MemberStatus`;
