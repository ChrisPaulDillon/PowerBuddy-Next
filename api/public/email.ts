import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}Public/Email`;

export const SendPasswordResetUrl = (emailAddress: string) =>
  `${baseUrl}/ResetPassword/${emailAddress}`;

  export const SendEmailConfirmationUrl = (userId: string) =>
  `${baseUrl}/ConfirmEmail/${userId}`;