import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from 'powerbuddy-shared';

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

  useEffect(() => {
    setWeightType(user?.usingMetric ? 'kg' : 'lbs');
  }, [user]);

  useEffect(() => {
    setIsAuthenticated(Object.keys(user).length > 0);
  }, [user]);

  return <UserContext.Provider value={{ user, setUser, isAuthenticated, weightType }}>{children}</UserContext.Provider>;
}
