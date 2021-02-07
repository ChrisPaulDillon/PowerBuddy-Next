import { theme } from '@chakra-ui/react';
import colors from './colors';
import fonts from './fonts';

const customTheme = {
  ...theme,
  colors,
  fonts,
};

export const getColor = (color: string) => {
  const ch = color.split('.');
  const c = ch[0];

  if (ch.length > 1) {
    return colors[c][ch[1]];
  } else {
    return colors[c];
  }
};

export default customTheme;
