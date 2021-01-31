import { useToast } from '@chakra-ui/core';
import axios from 'axios';
import React, { useRef } from 'react';
import FacebookLogin from 'react-facebook-login';
import { LoginWithFacebookUrl } from '../../api/account/auth';
import { decodeJwtToken, handleAuthenticationTokens } from '../../util/axiosUtils';
import { ToastSuccess } from '../shared/Toasts';
import { useUserContext } from '../users/UserContext';

export const Facebook = ({ onClose }) => {
  const toast = useToast();
  const { SetValues } = useUserContext();

  const handleFacebookLogin = async (response): Promise<void> => {
    const { accessToken } = response;
    return axios
      .post(LoginWithFacebookUrl(), {
        accessToken: accessToken,
      })
      .then((response) => {
        handleAuthenticationTokens(response.data.accessToken, response.data.refreshToken);
        const claimsValues = decodeJwtToken(response.data.accessToken);
        SetValues(claimsValues);
        toast(ToastSuccess('Success', 'Successfully Signed In'));
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
