import { Box } from '@chakra-ui/core';
import { useUserContext } from '../components/users/UserContext';
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

  return Wrapper;
};
