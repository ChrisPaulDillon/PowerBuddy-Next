//@ts-nocheck
import useWindowSize from './useWindowSize';
import { callbackify } from 'util';

interface ISize {
  width: number;
  height: number;
}

export default function useScreenSizes() {
  const size = useWindowSize();
  return calcSize(size);
}

export const CalculateScreenSizes = () => {
  if (typeof window !== 'undefined') {
    const size = {
      width: window!.innerWidth,
      height: window!.innerHeight,
    };
    return calcSize(size);
  }
  const size = {
    width: 0,
    height: 0,
  };
  return calcSize(size);
};

function calcSize(size: ISize) {
  const SCREEN_XS = size.width > 0 && size.width <= 480;
  const SCREEN_SM = size.width > 480 && size.width <= 768;
  const SCREEN_MD = size.width > 768 && size.width <= 1200;
  const SCREEN_LG = size.width > 1200;

  const SCREEN_MOBILE = SCREEN_XS || SCREEN_MD;
  const SCREEN_DESKTOP = size.width === 0 || !SCREEN_MOBILE;

  return {
    SCREEN_XS,
    SCREEN_SM,
    SCREEN_MD,
    SCREEN_LG,
    SCREEN_MOBILE,
    SCREEN_DESKTOP,
  };
}
