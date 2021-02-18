import { Flex, Link, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterUserRequest } from '../../../api/account/auth';
import { EMAIL_OR_USERNAME_IN_USE } from '../../../api/apiResponseCodes';
import { SendEmailConfirmationRequest } from '../../../api/public/email';
import NewRegisterForm from '../../../components/account/forms/NewRegisterForm';
import { TextXs } from '../../../components/common/Texts';
import { ToastSuccess } from '../../../components/shared/Toasts';

const Index: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const [signedUp, setSignedUp] = useState<boolean>(false);

  const toast = useToast();

  const onSubmit = async ({ email, userName, password }: any) => {
    const user: IUser = {
      email: email,
      userName: userName,
      password: password,
    };
    const response = await RegisterUserRequest(user);

    if (response?.data) {
      setUserId(response.data.userId);
      toast(ToastSuccess('Success', 'Successfully Signed Up'));
      setSignedUp(true);
      return;
    }

    if (response?.code) {
      switch (response?.code) {
        case EMAIL_OR_USERNAME_IN_USE:
          setErrorMessage('The email or username is already in use');
          break;
      }
    }
  };

  const sendEmailConfirmation = async () => {
    await SendEmailConfirmationRequest(userId);
    toast(ToastSuccess('Success', 'Confirmation Email Sent Successfully. Please check your inbox'));
  };

  const { register, handleSubmit, formState } = useForm();

  if (signedUp)
    return (
      <Flex justify="center">
        <TextXs textAlign="center">
          Check Your Inbox to Verify Your Account. Can't Find The Email?
          <Link onClick={async () => sendEmailConfirmation()}>
            <TextXs color="blue.500">Send Again</TextXs>
          </Link>
        </TextXs>
      </Flex>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NewRegisterForm register={register} errorMessage={errorMessage} loading={formState.isSubmitting} />
    </form>
  );
};

export default Index;
