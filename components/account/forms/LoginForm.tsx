import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, InputGroup, InputRightElement, useToast, Link } from '@chakra-ui/react';
import { FormInput } from '../../common/Inputs';
import { CenterColumnFlex, CenterRowFlex } from '../../layout/Flexes';
import { TextError, TextXs } from '../../common/Texts';
import { PrimaryButton } from '../../common/Buttons';
import { MdAccountBox } from 'react-icons/md';
import { validateInput } from '../../../util/formInputs';
import axios from 'axios';
import { IUser } from 'powerbuddy-shared';
import { LoginStateEnum } from '../factories/LoginFormFactory';
import { useUserContext } from '../../users/UserContext';
import { Facebook } from '../Facebook';
import { SendEmailConfirmationUrl } from '../../../api/public/email';
import { decodeJwtToken, handleAuthenticationTokens } from '../../../util/axiosUtils';
import { ToastSuccess } from '../../shared/Toasts';
import { LoginUserRequest } from '../../../api/account/auth';
import { ACCOUNT_LOCKOUT, EMAIL_NOT_CONFIRMED, INVALID_CREDENTIALS, USER_NOT_FOUND } from '../../../responseCodes';
import { Box, Flex } from '../../../chakra/Layout';
import { Button } from '../../../chakra/Forms';

interface ILoginFormProps {
  onClose: () => void;
  setLoginState: any;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onClose, setLoginState }) => {
  const [showPW, setShowPW] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [emailNotVerified, setEmailNotVerified] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  const { SetValues } = useUserContext();

  const toast = useToast();

  const { register, handleSubmit, errors, formState } = useForm();

  const handleClick = () => setShowPW(!showPW);

  const onSubmit = async ({ email, password }: any) => {
    const user: IUser = {
      email: email,
      userName: email,
      password: password,
    };
    setShowError(false);
    const response = await LoginUserRequest(user);
    if (response?.code) {
      switch (response?.code) {
        case EMAIL_NOT_CONFIRMED:
          setEmailNotVerified(true);
          setUserId(response?.message);
          break;
        case INVALID_CREDENTIALS:
          setErrorMessage('Invalid Username/Email or Password');
          break;
        case USER_NOT_FOUND:
          setErrorMessage('No User found with the associated Username or Email');
          break;
        case ACCOUNT_LOCKOUT:
          setErrorMessage('Too many login attempts. Please wait 10 minutes before proceeding');
          break;
      }
      setShowError(true);
    } else {
      toast(ToastSuccess('Success', 'Successfully Signed In'));
      handleAuthenticationTokens(response.accessToken, response.refreshToken);
      const claimsValues = decodeJwtToken(response.accessToken);
      SetValues(claimsValues);
      onClose();
    }
  };

  const sendEmailConfirmation = async () => {
    try {
      toast(ToastSuccess('Success', 'Confirmation Email Sent Successfully. Please check your inbox'));
      await axios.post(SendEmailConfirmationUrl(userId));
    } catch (error) {}
  };

  if (emailNotVerified)
    return (
      <Flex justify="center">
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
                  ref={register({ validate: validateInput })}
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
          {showError && (
            <TextError textAlign="center" py={2}>
              {errorMessage}
            </TextError>
          )}
          <CenterRowFlex pt={1}>
            <TextXs px={1} color="gray.500">
              Forgot Password?{' '}
            </TextXs>
            <Link onClick={() => setLoginState(LoginStateEnum.PasswordReset)}>
              <TextXs color="blue.500">Reset</TextXs>
            </Link>
          </CenterRowFlex>
          <Flex py={5} justifyContent="center">
            <PrimaryButton type="submit" leftIcon={<MdAccountBox />} loading={formState.isSubmitting}>
              Login
            </PrimaryButton>
          </Flex>
          <Box>
            <CenterRowFlex justify="center">
              <TextXs px={1}>Not Registered?</TextXs>
              <Link onClick={() => setLoginState(LoginStateEnum.Register)}>
                <TextXs color="blue.500">Register</TextXs>
              </Link>
            </CenterRowFlex>
          </Box>
          <Box mt={2}>
            <Facebook onClose={onClose} />
          </Box>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default LoginForm;
