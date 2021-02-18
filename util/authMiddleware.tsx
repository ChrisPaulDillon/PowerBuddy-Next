import { useUserContext } from '../components/users/UserContext';
import React, { useEffect } from 'react';
import { LOGIN_URL } from '../InternalLinks';
import { useRouter } from 'next/router';

export const withAuthorized = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { isAuthenticated } = useUserContext();
    const router = useRouter();

    useEffect(() => {
      setTimeout(() => {
        if (!isAuthenticated) {
          router.push(LOGIN_URL);
        }
      }, 1500);
    }, [isAuthenticated]);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const componentProps = WrappedComponent.getStaticProps && (await WrappedComponent.getStaticProps(ctx));
    return { ...componentProps };
  };

  return Wrapper;
};
