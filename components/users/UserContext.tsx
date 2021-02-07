import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { RefreshTokenUrl } from '../../api/account/auth';
import { decodeJwtToken, handleAuthenticationTokens } from '../../util/axiosUtils';

export interface IClaimsValues {
  userId?: string;
  userName?: string;
  weightType?: string;
  firstVisit?: boolean;
  memberStatusId?: number;
}

interface IContextOutputProps {
  userId: string;
  userName: string;
  isAuthenticated: boolean;
  weightType: string;
  firstVisit: boolean;
  memberStatusId: number;
  SetValues: ({ userId, userName, weightType, firstVisit }: IClaimsValues) => void;
}

const UserContext = createContext({} as IContextOutputProps);

export const useUserContext = () => useContext(UserContext);

interface IContextInputProps {
  children: any;
}

export default function UserProvider({ children }: IContextInputProps) {
  const [userId, setUserId] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [weightType, setWeightType] = useState<string>('kg');
  const [firstVisit, setFirstVisit] = useState<boolean>(false);
  const [memberStatusId, setMemberStatusId] = useState<number>(0);

  const RefreshTokenRequest = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken === undefined) {
      return null;
    }
    const tokenRefreshResponse = await axios.post(RefreshTokenUrl(), {
      refreshToken: refreshToken,
    });
    //TODO Validate access token
    const claimsValues = decodeJwtToken(tokenRefreshResponse.data.accessToken);
    handleAuthenticationTokens(tokenRefreshResponse.data.accessToken, tokenRefreshResponse.data.refreshToken);
    SetValues(claimsValues);
    return await Promise.resolve();
  };

  const SetValues = ({ userId, userName, weightType, firstVisit, memberStatusId }: IClaimsValues) => {
    if (userId) {
      setUserId(userId);
    }
    if (userName) {
      setUserName(userName);
    }
    if (weightType) {
      setWeightType(weightType);
    }
    if (firstVisit) {
      setFirstVisit(firstVisit);
    }
    if (memberStatusId) {
      setMemberStatusId(memberStatusId);
    }
    setIsAuthenticated(true);
  };

  createAuthRefreshInterceptor(axios, RefreshTokenRequest);

  return (
    <UserContext.Provider value={{ userId, userName, isAuthenticated, weightType, firstVisit, memberStatusId, SetValues }}>
      {children}
    </UserContext.Provider>
  );
}
