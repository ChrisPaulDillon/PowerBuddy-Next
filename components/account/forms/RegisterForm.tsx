import { Box, Button, Flex, FormControl, FormErrorMessage, InputGroup, InputRightElement, useToast } from '@chakra-ui/core';
import axios from 'axios';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdAccountBox, TiArrowBack } from 'react-icons/all';
import { useDispatch } from 'react-redux';
import { RegisterUserUrl } from '../../../api/account/user';
import { REGISTER_USER } from '../../../redux/actionTypes';
import { setAuthorizationToken } from '../../../redux/util/authorization';
import { validateEmailInput, validateInput, validatePassword } from '../../../util/formInputs';
import { PbPrimaryButton } from '../../common/Buttons';
import PbIconButton from '../../common/IconButtons';
import { FormInput } from '../../common/Inputs';
import { TextXs, TextError } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { LoginStateEnum } from '../factories/LoginFormFactory';

const RegisterForm = ({ onClose, setLoginState }: any) => {
  const [showPW, setShowPW] = React.useState(false);
  const handleClick = () => setShowPW(!showPW);

  const [error, setError] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const dispatcher = useDispatch();
  const toast = useToast();

  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = async ({ email, username, password }: any) => {
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex>
        <PbIconButton Icon={TiArrowBack} onClick={() => setLoginState(LoginStateEnum.Login)} label="Return to Login" />
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
            <PbPrimaryButton type="submit" leftIcon={<MdAccountBox />} loading={formState.isSubmitting}>
              Register
            </PbPrimaryButton>
          </Flex>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default RegisterForm;