import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAccountBox } from 'react-icons/md';
import { TiArrowBack } from 'react-icons/ti';
import { SendPasswordResetEmailRequest } from '../../../api/public/email';
import { FormControl, FormErrorMessage, FormLabel, Link } from '../../../chakra/Forms';
import { Flex } from '../../../chakra/Layout';
import { validateEmailInput } from '../../../util/formInputs';
import { FormButton } from '../../common/Buttons';
import TTIconButton from '../../common/IconButtons';
import { FormInput } from '../../common/Inputs';
import { TextXs } from '../../common/Texts';
import { FormLayoutFlex } from '../../layout/Flexes';
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
      <Flex justify="center">
        <TTIconButton Icon={TiArrowBack} onClick={() => setLoginState(LoginStateEnum.Login)} label="Return to Login" />
      </Flex>
      <FormControl isInvalid={errors.email}>
        <FormLayoutFlex>
          <FormLabel>Email Address</FormLabel>
          <FormInput
            name="email"
            ref={register({ validate: validateEmailInput })}
            placeholder="example@examplesite.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormButton leftIcon={<MdAccountBox />} isLoading={formState.isSubmitting}>
        Submit
      </FormButton>
    </form>
  );
};

export default SendPasswordResetForm;
