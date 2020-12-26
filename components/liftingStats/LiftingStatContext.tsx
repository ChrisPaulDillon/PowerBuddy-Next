import { ILiftingStat, ILiftingStatGrouped } from '../../interfaces/liftingStats/index';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface IContextOutputProps {
  liftingStats: ILiftingStatGrouped[];
}

const LiftingStatContext = createContext({} as IContextOutputProps);

export const useLiftingStatContext = () => useContext(LiftingStatContext);

interface IContextInputProps {
  liftingStats: ILiftingStatGrouped[];
  children: any;
}

export default function LiftingStatProvider({ liftingStats, children }: IContextInputProps) {
  return <LiftingStatContext.Provider value={{ liftingStats }}>{children}</LiftingStatContext.Provider>;
}
