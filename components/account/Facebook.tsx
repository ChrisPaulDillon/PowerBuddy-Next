import { useToast } from '@chakra-ui/core';
import axios from 'axios';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { LoginWithFacebookUrl } from '../../api/account/auth';
import { setAuthorizationToken } from '../../redux/util/authorization';
import { useUserContext } from '../users/UserContext';

export const Facebook = ({ onClose }) => {
  const toast = useToast();
  const { setUser } = useUserContext();

  const handleFacebookLogin = async (response) => {
    const { accessToken } = response;
    try {
      await axios.post(LoginWithFacebookUrl(), { accessToken: accessToken });
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
      setUser(response.data.user);
      onClose();
    } catch (err) {}
  };

  return (
    <FacebookLogin
      appId="399640227879888"
      autoLoad
      fields="name,email,picture"
      onClick={handleFacebookLogin}
      callback={handleFacebookLogin}
      icon="fa-facebook"
    />
  );
};
