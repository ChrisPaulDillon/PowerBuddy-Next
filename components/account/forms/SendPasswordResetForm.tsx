import { Box, Flex, FormControl, FormErrorMessage, Link, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAccountBox } from 'react-icons/md';
import { TiArrowBack } from 'react-icons/ti';
import { SendPasswordResetEmailRequest } from '../../../apiCalls/Area/public/email';
import { validateEmailInput } from '../../../util/formInputs';
import { PbPrimaryButton } from '../../common/Buttons';
import PbIconButton from '../../common/IconButtons';
import { FormInput } from '../../common/Inputs';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { ToastSuccess } from '../../shared/Toasts';
import { LoginStateEnum } from '../factories/LoginFormFactory';

const SendPasswordResetForm = ({ onClose, setLoginState }) => {
  const toast = useToast();
  const { register, handleSubmit, errors, formState } = useForm();

  const [pwResetSent, setPwResetSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const onSubmit = async () => {
    await SendPasswordResetEmailRequest(email);
    toast(ToastSuccess('Success', 'If an account with the associated email exists, a reset password email has been sent'));
    setPwResetSent(true);
    onClose();
  };

  if (pwResetSent)
    return (
      <Flex>
        <TextXs textAlign="center">
          Password reset link successfully sent. Please check your inbox. Didn't receive an email?{' '}
          <Link onClick={async () => await onSubmit()}>
            <TextXs color="blue.500">Send Again</TextXs>
          </Link>
        </TextXs>
      </Flex>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex>
        <PbIconButton Icon={TiArrowBack} onClick={() => setLoginState(LoginStateEnum.Login)} label="Return to Login" />
        <Box p="2">
          <FormControl isInvalid={errors.email}>
            <Box p="1">
              <TextXs>Email Address</TextXs>
              <FormInput
                name="email"
                ref={register({ validate: validateEmailInput })}
                placeholder="example@examplesite.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Flex mt="3" justifyContent="center">
          <PbPrimaryButton type="submit" leftIcon={<MdAccountBox />} loading={formState.isSubmitting}>
            Submit
          </PbPrimaryButton>
        </Flex>
      </CenterColumnFlex>
    </form>
  );
};

export default SendPasswordResetForm;
