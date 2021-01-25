import { ChakraProvider, extendTheme } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/store';
import customTheme from '../theme';
import * as Sentry from '@sentry/react';
import Layout from '../components/layout/Layout';
import { setAuthorizationToken } from '../redux/util/authorization';
import { IUser } from 'powerbuddy-shared/lib';
import axios from 'axios';
import { GetLoggedInUsersProfileUrl } from '../api/account/user';
import UserProvider from '../components/users/UserContext';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY,
});
const store = configureStore();

const config = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
};

const customTheme2 = extendTheme({ config, ...customTheme });

const MyApp = ({ Component }) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    const loadUserProfile = async (): Promise<void> => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        const response = await axios.get(GetLoggedInUsersProfileUrl());
        if (response && response.data) {
          setUser(response.data);
        }
      } catch (error) {}
    };

    if (localStorage.getItem('accessToken') != null && localStorage.getItem('accessToken')!.length > 1) {
      setAuthorizationToken(localStorage.getItem('accessToken'));
      loadUserProfile();
    }
  }, []);

  return (
    <Provider store={store}>
      <UserProvider user={user} setUser={setUser}>
        <ChakraProvider resetCSS theme={customTheme2}>
          <Layout>
            <Component compo />
          </Layout>
        </ChakraProvider>
      </UserProvider>
    </Provider>
  );
};

export default MyApp;
