import axios from "axios";
import { IErrorResponse } from "../util/IErrorResponse";
import { API_BASE } from "../../redux/actionTypes";

const baseUrl = `${API_BASE}Public/Email`;

export const SendEmailConfirmationUrl = (userId: string) =>
  `${baseUrl}/Send/Confirm/${userId}`;

export const SendEmailConfirmationRequest = async (userId: string) => {
    try {
        const response = await axios.post(SendEmailConfirmationUrl(userId));
        return response;
    }
    catch(err) {
        return err?.response?.data as IErrorResponse;
    }
}

export const SendPasswordResetUrl = (emailAddress: string) =>
  `${baseUrl}/Send/ResetPassword/${emailAddress}`;


export const SendPasswordResetEmailRequest = async (email: string) => {
    try {
        const response = await axios.post(SendPasswordResetUrl(email));
        return response;
    }
    catch(err) {
        return err?.response?.data as IErrorResponse;
    }
}