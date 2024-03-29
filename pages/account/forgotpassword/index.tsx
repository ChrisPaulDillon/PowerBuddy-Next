import { Link } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SendPasswordResetEmailRequest } from '../../../api/public/email';
import ForgotPasswordForm from '../../../shared/account/ForgotPasswordForm';
import { TextXs } from '../../../components/common/Texts';
import useFireToast from '../../../hooks/useFireToast';
import { LOGIN_URL } from '../../../InternalLinks';

const Index: NextPage = () => {
  const toast = useFireToast();

  const [pwResetSent, setPwResetSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const onSubmit = async ({ email }) => {
    await SendPasswordResetEmailRequest(email);
    toast.Success('If an account with the associated email exists, a reset password email has been sent');
    setPwResetSent(true);
    setEmail(email);
  };

  const { register, handleSubmit, formState } = useForm();

  if (pwResetSent)
    return (
      <TextXs textAlign="center" justifyContent="center">
        Password reset link successfully sent. Please check your inbox. Didn't receive an email?{' '}
        <Link onClick={async () => onSubmit({ email })}>
          <TextXs color="blue.500">Send Again</TextXs>
        </Link>
      </TextXs>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ForgotPasswordForm
        register={register}
        loading={formState.isSubmitting}
        heading="Reset your password"
        spanText="Already know your password?"
        linkText="Login"
        linkUrl={LOGIN_URL}
      />
    </form>
  );
};

export default Index;
