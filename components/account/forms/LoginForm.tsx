import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useColorMode, useToast } from '@chakra-ui/react';
import { FormInput } from '../../common/Inputs';
import { FormLayoutFlex } from '../../layout/Flexes';
import { TextError, TextXs } from '../../common/Texts';
import { FormButton } from '../../common/Buttons';
import { validateInput } from '../../../util/formInputs';
import axios from 'axios';
import { IUser } from 'powerbuddy-shared';
import { LoginStateEnum } from '../factories/LoginFormFactory';
import { useUserContext } from '../../users/UserContext';
import { SendEmailConfirmationUrl } from '../../../api/public/email';
import { decodeJwtToken, handleAuthenticationTokens } from '../../../util/axiosUtils';
import { ToastSuccess } from '../../shared/Toasts';
import { LoginUserRequest } from '../../../api/account/auth';
import { ACCOUNT_LOCKOUT, EMAIL_NOT_CONFIRMED, INVALID_CREDENTIALS, USER_NOT_FOUND } from '../../../api/apiResponseCodes';
import { Flex } from '../../../chakra/Layout';
import { Button, FormControl, FormErrorMessage, FormLabel, InputGroup, InputRightElement, Link } from '../../../chakra/Forms';
import theme from '../../../theme';

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

  const { colorMode } = useColorMode();
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
      <FormControl isInvalid={errors.email}>
        <FormLayoutFlex>
          <FormLabel>Email or Username</FormLabel>
          <FormInput name="email" ref={register({ validate: validateInput })} placeholder="example@examplesite.com" />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
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
              ref={register({ validate: validateInput })}
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
      {showError && (
        <TextError textAlign="center" py={2}>
          {errorMessage}
        </TextError>
      )}
      <FormButton isLoading={formState.isSubmitting}>
        Login
      </FormButton>
        <Link onClick={() => setLoginState(LoginStateEnum.PasswordReset)}>
          <TextXs color={theme.colors.hyperLink[colorMode]} textAlign='center'>Forgot Password?</TextXs>
        </Link>
        <Flex justify='center'>
      <FormButton colorScheme="blue" isFullWidth={false} onClick={() => setLoginState(LoginStateEnum.Register)}>
        Create New Account
      </FormButton>
      </Flex>
    </form>
  );
};

export default LoginForm;
