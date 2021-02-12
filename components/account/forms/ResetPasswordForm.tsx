import { useToast } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IChangePasswordBody, ResetPasswordViaEmailRequest } from '../../../api/account/auth';
import { FormControl, FormErrorMessage, FormLabel } from '../../../chakra/Forms';
import { validateInput } from '../../../util/formInputs';
import { FormButton } from '../../common/Buttons';
import { FormInput } from '../../common/Inputs';
import { FormLayoutFlex } from '../../layout/Flexes';
import { ToastError, ToastSuccess } from '../../shared/Toasts';

interface IResetPasswordFormProps {
  userId: string;
  token: string;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps> = ({ userId, token }) => {
  const toast = useToast();

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

  const { handleSubmit, formState, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.password}>
        <FormLayoutFlex>
          <FormLabel>Password</FormLabel>
          <FormInput name="password" ref={register({ validate: validateInput })} size="sm" type="password" />
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormControl isInvalid={errors.password2}>
        <FormLayoutFlex>
          <FormLabel>Confirm Password</FormLabel>
          <FormInput name="password2" ref={register({ validate: validateInput })} size="sm" type="password" />
          <FormErrorMessage>{errors.password2 && errors.password2.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormButton isLoading={formState.isSubmitting}>Comfirm</FormButton>
    </form>
  );
};

export default ResetPasswordForm;
