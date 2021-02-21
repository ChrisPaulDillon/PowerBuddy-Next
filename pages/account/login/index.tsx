import { Flex, Link } from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginUserRequest } from '../../../api/account/auth';
import { EMAIL_NOT_CONFIRMED, INVALID_CREDENTIALS, USER_NOT_FOUND, ACCOUNT_LOCKOUT } from '../../../api/apiResponseCodes';
import { SendEmailConfirmationUrl } from '../../../api/public/email';
import { TextXs } from '../../../components/common/Texts';
import { useUserContext } from '../../../components/users/UserContext';
import useFireToast from '../../../hooks/useFireToast';
import { HOME_URL, REGISTER_URL } from '../../../InternalLinks';
import { handleAuthenticationTokens, decodeJwtToken } from '../../../util/axiosUtils';
import LoginForm from '../../../shared/account/LoginForm';

const Index: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const { SetValues } = useUserContext();

  const toast = useFireToast();

  const onSubmit = async ({ email, password }: any) => {
    setErrorMessage('');

    const user: IUser = {
      email: email,
      userName: email,
      password: password,
    };
    const response = await LoginUserRequest(user);
    if (response?.data) {
      toast.Success('Successfully Signed In');
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
    }
  };

  const { register, handleSubmit, formState } = useForm();

  const sendEmailConfirmation = async () => {
    try {
      toast.Success('Confirmation Email Sent Successfully. Please check your inbox');
      await axios.post(SendEmailConfirmationUrl(userId));
    } catch (error) {}
  };

  if (emailNotVerified)
    return (
      <Flex justify="center">
        <TextXs textAlign="center">
          Email Not Confirmed. You must confirm your email address before proceeding.{' '}
          <Link onClick={async () => sendEmailConfirmation()}>
            <TextXs color="blue.500">Send Again</TextXs>
          </Link>
        </TextXs>
      </Flex>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LoginForm
        register={register}
        errorMessage={errorMessage}
        loading={formState.isSubmitting}
        heading="Sign into your account"
        spanText="Don't have an account?"
        linkText="Register"
        linkUrl={REGISTER_URL}
      />
    </form>
  );
};

export default Index;
