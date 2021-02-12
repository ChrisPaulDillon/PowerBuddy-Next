import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}Public/Sms`;

export const SendSmsVerificationUrl = () =>
  `${baseUrl}/Send/Confirm`;

