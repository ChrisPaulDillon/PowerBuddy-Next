import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IChangePasswordBody, ResetPasswordViaEmailRequest } from '../../../api/account/auth';
import { PageContent, PageHead } from '../../../components/layout/Page';
import useFireToast from '../../../hooks/useFireToast';
import { LOGIN_URL } from '../../../InternalLinks';
import ResetPasswordForm from '../../../shared/account/ResetPasswordForm';

const Index: NextPage = () => {
  const router = useRouter();
  const { token, userId } = router.query;

  const toast = useFireToast();

  const onSubmit = async ({ password }: any) => {
    const changePasswordBody: IChangePasswordBody = {
      token: token?.toString().replace(/\s+/g, '+'),
      password: password,
    };
    const response = await ResetPasswordViaEmailRequest(userId as string, changePasswordBody);
    if (response?.code) {
      toast.Error('Password not changed, token has expired');
    } else {
      toast.Success('Password Successfully Changed');
    }
  };

  const { register, handleSubmit, formState, errors } = useForm();

  return (
    <Box>
      <PageHead
        title="Reset Password"
        description="Reset your password for PowerBuddy"
        keywords={`Weightlifting Exercises, Powerlifting Exercises, Workout Diary, PowerBuddy, Weightlifting App, Strong App, Intensity App, Powerlifting Weightlifting Templates, Liftvault Workout Program Spreadsheets, Powerlifting Routine, Olympic Weightlifting Template`}
      />
      <PageContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ResetPasswordForm
            loading={formState.isSubmitting}
            heading="Reset your password"
            spanText="Already know your password?"
            linkText="Login"
            linkUrl={LOGIN_URL}
            register={register}
            errors={errors}
          />
        </form>
      </PageContent>
    </Box>
  );
};

export default Index;
