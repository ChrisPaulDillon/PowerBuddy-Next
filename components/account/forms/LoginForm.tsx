import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, Button, Flex, Box, InputGroup, InputRightElement, useToast, Link } from '@chakra-ui/core';
import { FormInput } from '../../common/Inputs';
import { CenterColumnFlex, CenterRowFlex } from '../../layout/Flexes';
import { useDispatch } from 'react-redux';
import { TextError, TextXs } from '../../common/Texts';
import { PbPrimaryButton } from '../../common/Buttons';
import { MdAccountBox } from 'react-icons/md';
import { validateInput } from '../../../util/formInputs';
import { validatePassword } from '../../../util/formInputs';
import { LoginUserUrl } from '../../../api/account/user';
import axios from 'axios';
import { setAuthorizationToken } from '../../../redux/util/authorization';
import { LOGIN_USER } from '../../../redux/actionTypes';
import { IUser } from 'powerbuddy-shared';
import { LoginStateEnum } from '../factories/LoginFormFactory';
import { SendEmailConfirmationUrl } from '../../../api/public/email';
import { ImGrin2 } from 'react-icons/im';

const LoginForm = ({ onClose, setLoginState }: any) => {
  const [showPW, setShowPW] = React.useState(false);
  const [error, setError] = useState<boolean>(false);
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const dispatcher = useDispatch();
  const toast = useToast();

  const { register, handleSubmit, errors, formState } = useForm();

  const handleClick = () => setShowPW(!showPW);

  const onSubmit = async ({ email, password }: any) => {
    const user: IUser = {
      email: email,
      userName: email,
      password: password,
    };
    try {
      const response = await axios.post(LoginUserUrl(), user);
      toast({
        title: 'Success',
        description: 'Successfully Signed In',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      localStorage.setItem('token', response.data.token);
      setAuthorizationToken(response.data.token);
      dispatcher({
        type: LOGIN_USER,
        user: response.data.user,
        isAuthenticated: true,
      });
      onClose();
    } catch (err) {
      const errorCode = err?.response?.data;
      console.log(errorCode);

      if (errorCode?.code == 'EmailNotConfirmedException') {
        setEmailNotVerified(true);
        setUserId(errorCode?.message);
      } else {
        setError(true);
      }
    }
  };

  const sendEmailConfirmation = async () => {
    try {
      const response = await axios.post(SendEmailConfirmationUrl(userId! as string));
      toast({
        title: 'Success',
        description: 'Confirmation Email Sent Successfully. Please check your inbox',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {}
  };

  if (emailNotVerified)
    return (
      <Flex>
        <TextXs textAlign="center">
          Email Not Confirmed. You must confirm your email address before proceeding.{' '}
          <Link onClick={async () => await sendEmailConfirmation()}>
            <TextXs color="blue.500">Send Again</TextXs>
          </Link>
        </TextXs>
      </Flex>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex>
        <Box p="2">
          <FormControl isInvalid={errors.email}>
            <Box p="1">
              <TextXs>Email or Username</TextXs>
              <FormInput name="email" ref={register({ validate: validateInput })} placeholder="example@examplesite.com" />
            </Box>
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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
          <TextError textAlign="center" display={error ? 'visible' : 'none'} py={2}>
            Invalid Username or Password
          </TextError>
          <CenterRowFlex pt={1}>
            <TextXs px={1} color="gray.500">
              Forgot Password?{' '}
            </TextXs>
            <Link onClick={() => setLoginState(LoginStateEnum.PasswordReset)}>
              <TextXs color="blue.500">Reset</TextXs>
            </Link>
          </CenterRowFlex>
          <Flex py={5} justifyContent="center">
            <PbPrimaryButton type="submit" leftIcon={<MdAccountBox />} loading={formState.isSubmitting}>
              Login
            </PbPrimaryButton>
          </Flex>
          <Box>
            <CenterRowFlex justify="center">
              <TextXs px={1}>Not Registered?</TextXs>
              <Link onClick={() => setLoginState(LoginStateEnum.Register)}>
                <TextXs color="blue.500">Register</TextXs>
              </Link>
            </CenterRowFlex>
          </Box>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default LoginForm;
