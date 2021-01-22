import { Box, Button } from '@chakra-ui/core';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { FaFacebook } from 'react-icons/all';

export const Facebook = () => {
  const handleFacebookLogin = (response) => {
    const { accessToken } = response;
    console.log(accessToken);

    //this.props.loginWithFacebook(accessToken);
  };

  const appId = 399640227879888;
  return (
    <Box>
      <FacebookLogin
        appId="399640227879888"
        autoLoad
        fields="name,email,picture"
        onClick={handleFacebookLogin}
        callback={handleFacebookLogin}
        icon="fa-facebook"
      />
    </Box>
  );
};
