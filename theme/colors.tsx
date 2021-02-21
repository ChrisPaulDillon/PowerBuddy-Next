import { theme } from '@chakra-ui/react';

// Brand Colors
// PINK #A500B4
// PURPLE #4C006F
// Generate using https://smart-swatch.netlify.com/

const gray = {
  '50': '#f9f9f9',
  '100': '#f2f2f2',
  '200': '#e9e9e9',
  '300': '#d5d5d5',
  '400': '#b0b0b0',
  '500': '#838383',
  '600': '#595959',
  '700': '#3a3a3a',
  '800': '#232323',
  '900': '#1d1d1d',
};

const green = {
  50: '#ddffe9',
  100: '#b0fdc8',
  200: '#81faa7',
  300: '#51f884',
  400: '#22f663',
  500: '#09dd49',
  600: '#00ac38',
  700: '#007b27',
  800: '#004b15',
  900: '#001b01',
};

const purple = {
  50: '#fae3ff',
  100: '#e82ff',
  200: '#d780ff',
  300: '#c74efe',
  400: '#b61efd',
  500: '#9d07e4',
  600: '#7a02b2',
  700: '#570080',
  800: '#34004e',
  900: '#13001e',
};

const menuItemSelected = { light: 'gray.300', dark: 'gray.700' };

const calendar = { light: 'gray.700', dark: 'gray.700' };
const calendarText = { light: 'gray.50', dark: 'gray.50' };
const calendarTextNonMonth = { light: 'gray.200', dark: 'gray.200' };

const primary = { light: 'purple.500', dark: 'purple.700' };

const navBackground = { light: 'gray.100', dark: 'gray.800' };
const borderColor = { light: 'gray.300', dark: 'gray.700' };
const iconColor = { light: 'gray.500', dark: 'gray.100' };

const background = { light: 'gray.100', dark: 'gray.800' };

const cardColor = { light: 'gray.50', dark: 'gray.700' };
const cardHighlightColor = { light: 'gray.300', dark: 'gray.600' };
const toastColor = { light: 'gray.300', dark: 'gray.600' };

const navIconColor = { light: 'gray.600', dark: 'gray.700' };
const bannerColor = { light: 'gray.750', dark: 'gray.50' };
const textColor = { light: 'gray.600', dark: 'white' };
const quoteColor = { light: 'gray.500', dark: 'gray.50' };
const tagColor = { light: 'gray.200', dark: 'gray.600' };
const greenWeight = { light: 'green.400', dark: 'green.200' };
const selectColor = { light: 'gray.50', dark: 'gray.700' };
const selectColorTemp = { light: 'gray.50', dark: 'gray.500' };
const hoverSelectColor = { light: 'gray.700', dark: 'gray.100' };

const hyperLink = { light: 'blue.500', dark: 'blue.100' };

const colors = {
  ...theme.colors,
  primary,
  purple,
  green,
  menuItemSelected,
  // gray,
  hyperLink,
  background,
  navBackground,
  navIconColor,
  iconColor,
  textColor,
  quoteColor,
  bannerColor,
  tagColor,
  greenWeight,
  borderColor,
  cardColor,
  toastColor,
  cardHighlightColor,
  selectColor,
  selectColorTemp,
  hoverSelectColor,
  calendar,
  calendarText,
  calendarTextNonMonth,
};

export default colors;
