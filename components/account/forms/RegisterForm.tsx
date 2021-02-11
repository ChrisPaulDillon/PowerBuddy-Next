import { Flex, FormControl, FormErrorMessage, InputGroup, InputRightElement, Link, useToast } from '@chakra-ui/react';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAccountBox, TiArrowBack } from 'react-icons/all';
import { RegisterUserRequest } from '../../../api/account/auth';
import { SendEmailConfirmationRequest } from '../../../api/public/email';
import { Button } from '../../../chakra/Buttons';
import { Box } from '../../../chakra/Layout';
import { validateEmailInput, validateInput, validatePassword } from '../../../util/formInputs';
import { PrimaryButton } from '../../common/Buttons';
import TTIconButton from '../../common/IconButtons';
import { FormInput } from '../../common/Inputs';
import { TextXs, TextError } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
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
      <CenterColumnFlex>
        <TTIconButton Icon={TiArrowBack} onClick={() => setLoginState(LoginStateEnum.Login)} label="Return to Login" />
        <Box p="2">
          <FormControl isInvalid={errors.email}>
            <Box p="1">
              <TextXs>Email</TextXs>
              <FormInput name="email" ref={register({ validate: validateEmailInput })} placeholder="example@examplesite.com" />
            </Box>
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.username}>
            <Box p="1">
              <TextXs>Username</TextXs>
              <FormInput name="username" ref={register({ validate: validateInput })} placeholder="Username..." />
            </Box>
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>
          <Box p="1">
            <FormControl isInvalid={errors.password}>
              <TextXs>Password</TextXs>
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
            </FormControl>
          </Box>
          <TextError textAlign="center" visibility={error ? 'visible' : 'hidden'}>
            Username or Email Already in use
          </TextError>
          <Flex mt="3" justifyContent="center">
            <PrimaryButton type="submit" leftIcon={<MdAccountBox />} loading={formState.isSubmitting}>
              Register
            </PrimaryButton>
          </Flex>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default RegisterForm;
