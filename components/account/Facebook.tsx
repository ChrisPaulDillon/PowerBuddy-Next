import { useToast } from '@chakra-ui/core';
import axios from 'axios';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { LoginWithFacebookUrl } from '../../api/account/auth';
import { handleLoginTokens } from '../../api/axiosUtils';
import { useUserContext } from '../users/UserContext';

export const Facebook = ({ onClose }) => {
  const toast = useToast();
  const { setUser } = useUserContext();

  const handleFacebookLogin = async (response): Promise<void> => {
    const { accessToken } = response;
    return axios
      .post(LoginWithFacebookUrl(), {
        accessToken: accessToken,
      })
      .then((response) => {
        handleLoginTokens(response.data.accessToken, response.data.refreshToken);
        setUser(response.data.user);
        toast({
          title: 'Success',
          description: 'Successfully Signed In',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        onClose();
      });

    //   handleLoginTokens(response.data.accessToken, response.data.refreshToken);

    //   onClose();
    // } catch (err) {
    //   toast({
    //     title: 'Error',
    //     description: 'Could not sign in using Facebook, try an alternative',
    //     status: 'error',
    //     duration: 2000,
    //     isClosable: true,
    //     position: 'top',
    //   });
    // }
  };

  return <FacebookLogin appId="399640227879888" fields="name,email,picture" onClick={() => {}} callback={handleFacebookLogin} icon="fa-facebook" />;
};
