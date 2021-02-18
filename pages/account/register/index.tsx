import { Flex, Link, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterUserRequest } from '../../../api/account/auth';
import { SendEmailConfirmationRequest } from '../../../api/public/email';
import NewRegisterForm from '../../../components/account/forms/NewRegisterForm';
import { TextXs } from '../../../components/common/Texts';
import { ToastSuccess } from '../../../components/shared/Toasts';
import { useUserContext } from '../../../components/users/UserContext';

const Index: NextPage = () => {
  const [] = useState<boolean>(false);
  const [errorMessage] = useState<string>('');
  const [] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const [] = React.useState(false);

  const [, setError] = useState<boolean>(false);
  const [signedUp, setSignedUp] = useState<boolean>(false);

  const toast = useToast();

  const onSubmit = async ({ email, username, password }: any) => {
    setError(false);
    const user: IUser = {
      email: email,
      userName: username,
      password: password,
    };
    const response = await RegisterUserRequest(user);
    if (response?.code) {
      setError(true);
    } else {
      setUserId(response.userId);
      toast(ToastSuccess('Success', 'Successfully Signed Up'));
      setSignedUp(true);
    }
  };

  const sendEmailConfirmation = async () => {
    await SendEmailConfirmationRequest(userId);
    toast(ToastSuccess('Success', 'Confirmation Email Sent Successfully. Please check your inbox'));
  };

  if (signedUp)
    return (
      <Flex justify="center">
        <TextXs textAlign="center">
          Check Your Inbox to Verify Your Account. Can't Find The Email?
          <Link onClick={async () => await sendEmailConfirmation()}>
            <TextXs color="blue.500">Send Again</TextXs>
          </Link>
        </TextXs>
      </Flex>
    );

  const { register, handleSubmit, formState } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NewRegisterForm register={register} errorMessage={errorMessage} loading={formState.isSubmitting} />
    </form>
  );
};

export default Index;
