import { theme } from '@chakra-ui/core';

// Brand Colors
// PINK #A500B4
// PURPLE #4C006F
// Generate using https://smart-swatch.netlify.com/

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

const background = { light: 'gray.50', dark: 'gray.900' };
const navBackground = { light: 'gray.100', dark: 'gray.800' };
const bannerColor = { light: 'red.400', dark: 'red.700' };
const iconColor = { light: 'gray.500', dark: 'gray.50' };
const textColor = { light: 'gray.750', dark: 'gray.50' };
const quoteColor = { light: 'gray.500', dark: 'gray.50' };
const tagColor = { light: 'gray.200', dark: 'gray.700' };
const greenWeight = { light: 'green.400', dark: 'green.200' };
const hyperlink = { light: 'blue.300', dark: 'blue.700' };
const borderColor = {
  light: 'gray.100',
  dark: 'gray.800',
};
const hyperLink = { light: 'blue.500', dark: 'blue.300' };

const colors = {
  ...theme.colors,
  purple,
  green,
  hyperLink,
  background,
  navBackground,
  iconColor,
  textColor,
  quoteColor,
  bannerColor,
  tagColor,
  greenWeight,
  borderColor,
};

export default colors;
