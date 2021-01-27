import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from 'powerbuddy-shared';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { RefreshTokenUrl } from '../../api/account/auth';
import { handleAuthenticationTokens, setAuthorizationToken } from '../../util/axiosUtils';

interface IContextOutputProps {
  user: IUser;
  setUser: any;
  isAuthenticated: boolean;
  weightType: string;
}

const UserContext = createContext({} as IContextOutputProps);

export const useUserContext = () => useContext(UserContext);

interface IContextInputProps {
  user: IUser;
  setUser: any;
  children: any;
}

export default function UserProvider({ user, setUser, children }: IContextInputProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Object.keys(user).length > 0);
  const [weightType, setWeightType] = useState<string>('kg');

  const RefreshTokenRequest = (failedRequest) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken === undefined) {
      return null;
    }
    return axios
      .post(RefreshTokenUrl(), {
        refreshToken: refreshToken,
      })
      .then((tokenRefreshResponse) => {
        handleAuthenticationTokens(tokenRefreshResponse.data.accessToken, tokenRefreshResponse.data.refreshToken);
        setIsAuthenticated(true);
        setUser(tokenRefreshResponse.data.user);
        console.log(tokenRefreshResponse);

        return Promise.resolve();
      });
  };

  createAuthRefreshInterceptor(axios, RefreshTokenRequest);

  useEffect(() => {
    setWeightType(user?.usingMetric ? 'kg' : 'lbs');
  }, [user]);

  useEffect(() => {
    setIsAuthenticated(Object.keys(user).length > 0);
  }, [user]);

  return <UserContext.Provider value={{ user, setUser, isAuthenticated, weightType }}>{children}</UserContext.Provider>;
}
