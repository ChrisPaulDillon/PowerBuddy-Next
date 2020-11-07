import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}Public/Quote`;

export const GetAllQuotesUrl = () => `${baseUrl}`;
