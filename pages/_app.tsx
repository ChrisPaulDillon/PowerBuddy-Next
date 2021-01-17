import { Box, ChakraProvider, extendTheme } from '@chakra-ui/core';
import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore, { IAppState } from '../redux/store';
import customTheme from '../theme';
import * as Sentry from '@sentry/react';
import Layout from '../components/layout/Layout';
import { loadUserProfile } from '../redux/area/account/userActions';
import { setAuthorizationToken } from '../redux/util/authorization';

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY,
});
const store = configureStore();

const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

// 3. extend the theme
const customTheme2 = extendTheme({ config, ...customTheme });

const MyApp = ({ Component }) => {
  useEffect(() => {
    if (localStorage.getItem('token') != null && localStorage.getItem('token')!.length > 1) {
      setAuthorizationToken(localStorage.getItem('token'));
      store.dispatch(loadUserProfile());
    }
  }, []);

  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={customTheme2}>
        <Layout>
          <Component compo />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;
