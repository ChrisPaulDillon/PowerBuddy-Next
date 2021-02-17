import { useToast } from '@chakra-ui/react';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TiArrowBack } from 'react-icons/all';
import { RegisterUserRequest } from '../../../api/account/auth';
import { SendEmailConfirmationRequest } from '../../../api/public/email';
import { Button, FormControl, FormErrorMessage, FormLabel, InputGroup, InputRightElement, Link } from '../../../chakra/Forms';
import { Flex } from '../../../chakra/Layout';
import { validateEmailInput, validateInput, validatePassword } from '../../../util/formInputs';
import { FormButton } from '../../common/Buttons';
import TTIconButton from '../../common/IconButtons';
import { FormInput } from '../../common/Inputs';
import { TextXs, TextError } from '../../common/Texts';
import { FormLayoutFlex } from '../../layout/Flexes';
import { ToastSuccess } from '../../shared/Toasts';
import { LoginStateEnum } from '../factories/LoginFormFactory';

const RegisterForm = ({ setLoginState }: any) => {
  const [showPW, setShowPW] = React.useState(false);
  const handleClick = () => setShowPW(!showPW);

  const [error, setError] = useState<boolean>(false);
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const toast = useToast();

  const { register, handleSubmit, errors, formState } = useForm();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify="center">
        <TTIconButton Icon={TiArrowBack} onClick={() => setLoginState(LoginStateEnum.Login)} label="Return to Login" />
      </Flex>
      <FormControl isInvalid={errors.email}>
        <FormLayoutFlex>
          <FormLabel>Email</FormLabel>
          <FormInput name="email" ref={register({ validate: validateEmailInput })} placeholder="example@examplesite.com" />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormControl isInvalid={errors.username}>
        <FormLayoutFlex>
          <FormLabel>Username</FormLabel>
          <FormInput name="username" ref={register({ validate: validateInput })} placeholder="Username..." />
          <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLayoutFlex>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <FormInput
              pr="4.5rem"
              type={showPW ? 'text' : 'password'}
              placeholder="Enter password"
              name="password"
              ref={register({ validate: validatePassword })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {showPW ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <TextError textAlign="center" visibility={error ? 'visible' : 'hidden'}>
        Username or Email Already in use
      </TextError>
      <FormButton colorScheme="blue" isLoading={formState.isSubmitting}>
        Register
      </FormButton>
    </form>
  );
};

export default RegisterForm;
