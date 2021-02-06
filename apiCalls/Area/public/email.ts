import { SendEmailConfirmationUrl, SendPasswordResetUrl } from './../../../api/public/email';
import axios from "axios"
import { IErrorResponse } from '../IErrorResponse';

export const SendEmailConfirmationRequest = async (userId: string) => {
    try {
        const response = await axios.post(SendEmailConfirmationUrl(userId));
        return response;
    }
    catch(err) {
        return err?.response?.data as IErrorResponse;
    }
}

export const SendPasswordResetEmailRequest = async (email: string) => {
    try {
        const response = await axios.post(SendPasswordResetUrl(email));
        return response;
    }
    catch(err) {
        return err?.response?.data as IErrorResponse;
    }
}