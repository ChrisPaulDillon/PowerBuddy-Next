import { Box, Flex, useToast } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IChangePasswordBody, ResetPasswordViaEmailRequest } from '../../../apiCalls/Area/account/auth';
import { PbPrimaryButton } from '../../common/Buttons';
import { FormInput } from '../../common/Inputs';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { ToastError, ToastSuccess } from '../../shared/Toasts';

interface IChangePasswordFormProps {
  userId: string;
  token: string;
}

const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({ userId, token }) => {
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
          <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
            Comfirm
          </PbPrimaryButton>
        </CenterColumnFlex>
      </CenterColumnFlex>
    </form>
  );
};

export default ChangePasswordForm;
