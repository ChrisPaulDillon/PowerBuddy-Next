import axios from 'axios';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { LoginWithFacebookUrl } from '../../api/account/auth';
import useFireToast from '../../hooks/useFireToast';
import { decodeJwtToken, handleAuthenticationTokens } from '../../util/axiosUtils';
import { useUserContext } from '../users/UserContext';

export const Facebook = ({ onClose }) => {
  const toast = useFireToast();
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
        toast.Success('Successfully Signed In');
        onClose();
      })
      .catch((err) => {
        toast.Error('Could not sign in using Facebook, try an alternative');
      });
  };

  return <FacebookLogin appId="399640227879888" fields="name,email,picture" onClick={() => {}} callback={handleFacebookLogin} icon="fa-facebook" />;
};
