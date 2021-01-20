import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from 'powerbuddy-shared';

interface IContextOutputProps {
  user: IUser;
  setUser: any;
  isAuthenticated: boolean;
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

  useEffect(() => {
    setIsAuthenticated(Object.keys(user).length > 0);
  }, [user]);

  console.log(isAuthenticated);

  return <UserContext.Provider value={{ user, setUser, isAuthenticated }}>{children}</UserContext.Provider>;
}
