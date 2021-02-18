import { Flex, Link, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginUserRequest } from '../../../api/account/auth';
import { EMAIL_NOT_CONFIRMED, INVALID_CREDENTIALS, USER_NOT_FOUND, ACCOUNT_LOCKOUT } from '../../../api/apiResponseCodes';
import { SendEmailConfirmationUrl } from '../../../api/public/email';
import NewLoginForm from '../../../components/account/forms/NewLoginForm';
import { TextXs } from '../../../components/common/Texts';
import { ToastSuccess } from '../../../components/shared/Toasts';
import { useUserContext } from '../../../components/users/UserContext';
import { HOME_URL } from '../../../InternalLinks';
import { handleAuthenticationTokens, decodeJwtToken } from '../../../util/axiosUtils';

const Index: NextPage = () => {
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const { SetValues } = useUserContext();

  const toast = useToast();

  const onSubmit = async ({ email, password }: any) => {
    setErrorMessage('');

    const user: IUser = {
      email: email,
      userName: email,
      password: password,
    };
    setShowError(false);
    const response = await LoginUserRequest(user);
    if (response?.data) {
      toast(ToastSuccess('Success', 'Successfully Signed In'));
      handleAuthenticationTokens(response.data.accessToken, response.data.refreshToken);
      const claimsValues = decodeJwtToken(response.data.accessToken);
      SetValues(claimsValues);
      router.push(HOME_URL);
      return;
    }

    if (response?.code) {
      switch (response?.code) {
        case EMAIL_NOT_CONFIRMED:
          setEmailNotVerified(true);
          setUserId(response?.message);
          break;
        case INVALID_CREDENTIALS:
          setErrorMessage('Invalid Username/Email or Password');
          break;
        case USER_NOT_FOUND:
          setErrorMessage('No User found with the associated Username or Email');
          break;
        case ACCOUNT_LOCKOUT:
          setErrorMessage('Too many login attempts. Please wait 10 minutes before proceeding');
          break;
      }
      setShowError(true);
    }
  };

  const { register, handleSubmit, errors, formState } = useForm();

  const sendEmailConfirmation = async () => {
    try {
      toast(ToastSuccess('Success', 'Confirmation Email Sent Successfully. Please check your inbox'));
      await axios.post(SendEmailConfirmationUrl(userId));
    } catch (error) {}
  };

  if (emailNotVerified)
    return (
      <Flex justify="center">
        <TextXs textAlign="center">
          Email Not Confirmed. You must confirm your email address before proceeding.{' '}
          <Link onClick={async () => await sendEmailConfirmation()}>
            <TextXs color="blue.500">Send Again</TextXs>
          </Link>
        </TextXs>
      </Flex>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NewLoginForm register={register} errorMessage={errorMessage} loading={formState.isSubmitting} />
    </form>
  );
};

export default Index;
