import { Box } from '@chakra-ui/core';
import { useUserContext } from '../components/users/UserContext';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import React from 'react';
import { LoginModal } from '../components/shared/Modals';

export const LoginRoute = (targetURL?: string) => `/account/login${targetURL ? `?TargetURL=${targetURL}` : ''}`;

export const withAuthorized = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { user } = useUserContext();

    if (Object.keys(user).length === 0) {
      return (
        <Box>
          <LoginModal isOpen={true} />
          <WrappedComponent {...props} />
        </Box>
      );
    }
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    //const account = await getAccount(ctx);
    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps };
  };

  //Wrapper.whyDidYouRender = true;

  return Wrapper;
};

export const withOAuth = () => (WrappedComponent: NextPage) => {
  const Wrapper = (props) => {
    const { user } = useUserContext();
    const router = useRouter();

    const doLogin = () => {
      router.push(LoginRoute(router.asPath));
    };

    useEffect(() => {
      if (Object.keys(user).length === 0 || !user) {
        doLogin();
      }
    }, [user]);

    console.log(user);

    //if (!user) return <Box />;

    return <WrappedComponent {...{ ...props }} />;
  };

  return Wrapper;
};
