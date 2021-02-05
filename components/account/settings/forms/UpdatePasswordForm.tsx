import { Box, FormControl, FormErrorMessage, useToast } from '@chakra-ui/core';
import axios from 'axios';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdatePasswordUrl } from '../../../../api/account/auth';
import { INVALID_CREDENTIALS } from '../../../../responseCodes';
import { validateInput } from '../../../../util/formInputs';
import { PbPrimaryButton } from '../../../common/Buttons';
import { FormInput } from '../../../common/Inputs';
import { PbStack } from '../../../common/Stacks';
import { TextSm, TextXs } from '../../../common/Texts';
import { CenterColumnFlex } from '../../../layout/Flexes';
import { ToastError, ToastSuccess } from '../../../shared/Toasts';

interface IUpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
}

interface IProps {
  user: IUser;
}

const UpdatePasswordForm: React.FC<IProps> = ({ user }) => {
  const toast = useToast();

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
        toast(ToastSuccess('Success', 'Successfully Changed Password'));
      }
    } catch (err) {
      const errorCode = err?.response?.data;
      switch (errorCode?.code) {
        case INVALID_CREDENTIALS:
          toast(ToastError('Error', 'You have incorrectly entered your current password'));
          break;
        default:
          toast(ToastError('Error', 'Password Could Not Be Updated'));
          break;
      }
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex mt="4">
        <Box m="1">
          <FormControl isInvalid={errors.oldPassword}>
            <PbStack>
              <TextXs pt="3" pr="1" minW="110px">
                Current Password
              </TextXs>
              <FormInput name="oldPassword" ref={register({ validate: validateInput })} size="sm" type="password" />
            </PbStack>
            <FormErrorMessage>{errors.oldPassword && errors.oldPassword.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box m="1" pt={3}>
          <FormControl isInvalid={errors.password1}>
            <PbStack>
              <TextXs pt="3" pr="1" minW="110px">
                New Password
              </TextXs>
              <FormInput name="password1" ref={register({ validate: validateInput })} size="sm" type="password" />
            </PbStack>
            <FormErrorMessage>{errors.password1 && errors.password1.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box m="1">
          <FormControl isInvalid={errors.password2}>
            <PbStack>
              <TextXs pt="3" pr="1" minW="110px">
                Confirm Password
              </TextXs>
              <FormInput name="password2" ref={register({ validate: validateInput })} size="sm" type="password" />
            </PbStack>
            <FormErrorMessage>{errors.password2 && errors.password2.message}</FormErrorMessage>
          </FormControl>
        </Box>
        {error && <TextSm color="red.500">Passwords do not match</TextSm>}
        <CenterColumnFlex mt="4">
          <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
            Update
          </PbPrimaryButton>
        </CenterColumnFlex>
      </CenterColumnFlex>
    </form>
  );
};

export default UpdatePasswordForm;
