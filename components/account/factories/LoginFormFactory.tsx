import { Box } from '@chakra-ui/core';
import React, { useState } from 'react';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import SendPasswordResetForm from '../forms/SendPasswordResetForm';

export enum LoginStateEnum {
  Register,
  Login,
  PasswordReset,
}

const LoginFormFactory = ({ onClose }: any) => {
  const [loginState, setLoginState] = useState<LoginStateEnum>(LoginStateEnum.Login);
  return (
    <Box>
      {
        {
          [LoginStateEnum.Login]: <LoginForm setLoginState={setLoginState} onClose={onClose} />,
          [LoginStateEnum.Register]: <RegisterForm onClose={onClose} setLoginState={setLoginState} />,
          [LoginStateEnum.PasswordReset]: <SendPasswordResetForm onClose={onClose} setLoginState={setLoginState} />,
        }[loginState]
      }
    </Box>
  );
};

export default LoginFormFactory;
