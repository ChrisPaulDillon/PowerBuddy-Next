import { Box } from '@chakra-ui/react';
import { useUserContext } from '../components/users/UserContext';
import React, { useEffect, useState } from 'react';
import { LoginModal } from '../components/shared/Modals';

export const withAuthorized = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { isAuthenticated } = useUserContext();
    const [promptLogin, setPromptLogin] = useState<boolean>(false);

    useEffect(() => {
      setTimeout(() => {
        if (!isAuthenticated) {
          setPromptLogin(true);
        } else {
          setPromptLogin(false);
        }
      }, 1500);
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return (
        <Box>
          <LoginModal isOpen={promptLogin} onClose={() => {}} />
          <WrappedComponent {...props} />
        </Box>
      );
    }
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const componentProps = WrappedComponent.getStaticProps && (await WrappedComponent.getStaticProps(ctx));
    return { ...componentProps };
  };

  return Wrapper;
};
