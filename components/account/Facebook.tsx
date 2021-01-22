import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { TiSocialFacebookCircular } from 'react-icons/all';

export const Facebook = () => {
  const responseFacebook = () => {};

  return (
    <FacebookLogin
      appId="399640227879888"
      autoLoad
      fields="name,email,picture"
      onClick={responseFacebook}
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
};
