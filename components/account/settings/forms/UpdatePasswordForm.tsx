import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdatePasswordUrl } from '../../../../api/account/auth';
import { FormControl, FormErrorMessage, FormLabel } from '../../../../chakra/Forms';
import { INVALID_CREDENTIALS } from '../../../../api/apiResponseCodes';
import { validateInput } from '../../../../util/formInputs';
import { FormButton } from '../../../common/Buttons';
import { FormInput } from '../../../common/Inputs';
import { TextSm } from '../../../common/Texts';
import { FormLayoutFlex } from '../../../layout/Flexes';
import useFireToast from '../../../../hooks/useFireToast';

interface IUpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
}

const UpdatePasswordForm = () => {
  const toast = useFireToast();

  const [error, setError] = useState<boolean>(false);

  const { handleSubmit, formState, register, errors, reset } = useForm();

  const onSubmit = async ({ oldPassword, password1, password2 }: any) => {
    if (password1 !== password2) {
      setError(true);
      return;
    }
    setError(false);

    const passwordInput: IUpdatePasswordInput = {
      oldPassword: oldPassword,
      newPassword: password1,
    };

    try {
      const response = await axios.put(UpdatePasswordUrl(), passwordInput);
      if (response && response.data) {
        toast.Success('Successfully Changed Password');
      }
    } catch (err) {
      const errorCode = err?.response?.data;
      switch (errorCode?.code) {
        case INVALID_CREDENTIALS:
          toast.Error('You have incorrectly entered your current password');
          break;
        default:
          toast.Error('Password Could Not Be Updated');
          break;
      }
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.oldPassword}>
        <FormLayoutFlex>
          <FormLabel>Current Password</FormLabel>
          <FormInput name="oldPassword" ref={register({ validate: validateInput })} size="sm" type="password" />
          <FormErrorMessage>{errors.oldPassword && errors.oldPassword.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormControl isInvalid={errors.password1}>
        <FormLayoutFlex>
          <FormLabel>New Password</FormLabel>
          <FormInput name="password1" ref={register({ validate: validateInput })} size="sm" type="password" />
          <FormErrorMessage>{errors.password1 && errors.password1.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormControl isInvalid={errors.password2}>
        <FormLayoutFlex>
          <FormLabel>Confirm Password</FormLabel>
          <FormInput name="password2" ref={register({ validate: validateInput })} size="sm" type="password" />
          <FormErrorMessage>{errors.password2 && errors.password2.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      {error && <TextSm color="red.500">Passwords do not match</TextSm>}
      <FormButton isLoading={formState.isSubmitting}>Update</FormButton>
    </form>
  );
};

export default UpdatePasswordForm;
