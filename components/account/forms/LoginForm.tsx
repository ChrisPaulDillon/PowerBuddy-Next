import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, Button, Flex, Box, InputGroup, InputRightElement, useToast } from '@chakra-ui/core';
import { FormInput } from '../../common/Inputs';
import { IUser } from '../../../interfaces/users';
import { CenterColumnFlex } from '../../layout/Flexes';
import { useDispatch } from 'react-redux';
import { TextError, TextXs } from '../../common/Texts';
import { PbPrimaryButton } from '../../common/Buttons';
import { MdAccountBox } from 'react-icons/md';
import { validateInput, validateEmailInput } from '../../../util/formInputs';
import { validatePassword } from '../../../util/formInputs';
import { LoginUserUrl, RegisterUserUrl } from '../../../api/account/user';
import axios from 'axios';
import { setAuthorizationToken } from '../../../redux/util/authorization';
import { LOGIN_USER, REGISTER_USER } from '../../../redux/actionTypes';

const LoginForm = ({ onClose }: any) => {
  const [showPW, setShowPW] = React.useState(false);
  const handleClick = () => setShowPW(!showPW);

  const [error, setError] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const dispatcher = useDispatch();
  const toast = useToast();

  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = async ({ email, username, password }: any) => {
    if (isSignUp) {
      const user: IUser = {
        email: email,
        userName: username,
        password: password,
      };
      try {
        const response = await axios.post(RegisterUserUrl(), user);
        localStorage.setItem('token', response.data.token);
        setAuthorizationToken(response.data.token);
        dispatcher({
          type: REGISTER_USER,
          user: response.data.user,
          isAuthenticated: true,
        });
        toast({
          title: 'Success',
          description: 'Successfully Signed Up',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setIsSignUp(false);
      } catch (error) {
        setError(true);
      }
    } else {
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
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      } catch (error) {
        setError(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex>
        <Box p="2">
          <FormControl isInvalid={errors.email}>
            <Box p="1">
              <TextXs>{isSignUp ? 'Email' : 'Email or Username'}</TextXs>
              <FormInput
                name="email"
                ref={isSignUp ? register({ validate: validateEmailInput }) : register({ validate: validateInput })}
                placeholder="example@examplesite.com"
              />
            </Box>
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
          {isSignUp && (
            <FormControl isInvalid={errors.username}>
              <Box p="1">
                <TextXs>Username</TextXs>
                <FormInput name="username" ref={register({ validate: validateInput })} placeholder="Username..." />
              </Box>
              {isSignUp && <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>}
            </FormControl>
          )}
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
            {isSignUp ? 'Username or Email Already in use' : 'Invalid Username or Password'}
          </TextError>
          <Flex mt="3" justifyContent="center">
            <PbPrimaryButton type="submit" leftIcon={<MdAccountBox />} loading={formState.isSubmitting}>
              {isSignUp ? 'Register' : 'Login'}
            </PbPrimaryButton>
          </Flex>
          <Box display={isSignUp ? 'none' : 'inline'}>
            <CenterColumnFlex pt="5">
              <TextXs>
                Not Registered?{' '}
                <PbPrimaryButton variant="ghost" size="sm" onClick={() => setIsSignUp(true)} loading={formState.isSubmitting}>
                  <TextXs>Sign Up</TextXs>
                </PbPrimaryButton>
              </TextXs>
            </CenterColumnFlex>
          </Box>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default LoginForm;
