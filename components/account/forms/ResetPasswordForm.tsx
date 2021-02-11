import { useToast } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IChangePasswordBody, ResetPasswordViaEmailRequest } from '../../../api/account/auth';
import { Box, Flex } from '../../../chakra/Layout';
import { PrimaryButton } from '../../common/Buttons';
import { FormInput } from '../../common/Inputs';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { ToastError, ToastSuccess } from '../../shared/Toasts';

interface IResetPasswordFormProps {
  userId: string;
  token: string;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps> = ({ userId, token }) => {
  const toast = useToast();
  const { handleSubmit, formState, register } = useForm();

  const onSubmit = async ({ password }: any) => {
    const changePasswordBody: IChangePasswordBody = {
      token: token.replace(/\s+/g, '+'),
      password: password,
    };
    const response = await ResetPasswordViaEmailRequest(userId, changePasswordBody);
    if (response?.code) {
      toast(ToastError('Error', 'Password not changed, token has expired'));
    } else {
      toast(ToastSuccess('Success', 'Password Successfully Changed'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex mt={2}>
        <Box m="1">
          <Flex flexDir="column">
            <TextXs pt="3">Password</TextXs>
            <FormInput name="password" ref={register} size="sm" type="password" />
          </Flex>
        </Box>
        <Box m="1">
          <Flex flexDir="column">
            <TextXs pt="3">Confirm Password</TextXs>
            <FormInput name="password2" ref={register} size="sm" type="password" />
          </Flex>
        </Box>
        <CenterColumnFlex pt={4}>
          <PrimaryButton type="submit" loading={formState.isSubmitting}>
            Comfirm
          </PrimaryButton>
        </CenterColumnFlex>
      </CenterColumnFlex>
    </form>
  );
};

export default ResetPasswordForm;
