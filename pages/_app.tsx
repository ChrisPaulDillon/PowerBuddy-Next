import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import customTheme from '../theme';
import * as Sentry from '@sentry/react';
import Layout from '../components/layout/Layout';
import UserProvider from '../components/users/UserContext';
import { AppContext, AppProps } from 'next/app';
import { NextComponentType } from 'next';
import { PageHead } from '../components/layout/Page';

if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY,
});
const store = configureStore();

export interface ModifiedAppInitialProps<A = { [key in string]: string }> {
  appProps: A;
}

export interface ExtendedAppProps<P = { [key in string]: string }, A = { [key in string]: string }> extends AppProps<P>, ModifiedAppInitialProps<A> {}

const MyApp: NextComponentType<AppContext, ModifiedAppInitialProps, ExtendedAppProps> = ({ Component, pageProps, appProps }) => {
  //const { SetValues } = useUserContext();

  useEffect(() => {
    // const RefreshToken = async () => {
    //   const refreshToken = localStorage.getItem('refreshToken');
    //   await RefreshRequest(refreshToken, SetValues);
    // };
    //RefreshToken();
  }, []);

  return (
    <Provider store={store}>
      <UserProvider>
        <ChakraProvider resetCSS theme={customTheme}>
          <Layout>
            <PageHead title="Home" description="PowerBuddy helps weightlifters and powerlifters reach their goals and track personal bests" />
            <Component {...appProps} {...pageProps} />
          </Layout>
        </ChakraProvider>
      </UserProvider>
    </Provider>
  );
};

MyApp.getInitialProps = async () => {
  return {
    appProps: {
      /* ...someAppProps */
    },
  };
};

export default MyApp;
