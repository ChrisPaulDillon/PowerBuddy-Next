import React from 'react';
import { Text, Heading, useColorMode, BoxProps } from '@chakra-ui/react';
import theme from '../../theme';

export const PageTitle: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text m={1} color={theme.colors.textColor[colorMode]} fontSize="2xl" fontFamily="'Roboto', serif;" textAlign="center" {...rest} />;
};

export const PageSubHeader: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Text
      color={theme.colors.textColor[colorMode]}
      fontSize={['lg', 'lg', 'xl', 'xl']}
      fontFamily="'Roboto', serif;"
      textAlign="center"
      {...rest}></Text>
  );
};

export const Banner: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text fontWeight="bold" color="whatsapp.500" fontSize="3xl" {...rest}></Text>;
};

export const HeadingMd: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['lg', 'lg', 'xl', 'xl']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const HeadingMdStatic: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize="xl" fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const HeadingSm: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['sm', 'sm', 'lg', 'lg']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const HeadingXs: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['sm', 'sm', 'sm', 'sm']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextLg: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['1xl', '2xs', '1xl', '1xl']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextSm: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['1xl', '1xs', '1xl', '1xl']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const ITextSm: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Text color={theme.colors.textColor[colorMode]} fontSize={['1xl', '1xs', '1xl', '1xl']} fontFamily="'Roboto', serif;" as="i" {...rest}></Text>
  );
};

export const TextXsFade: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.quoteColor[colorMode]} fontSize="xs" textAlign="center" {...rest}></Text>;
};

export const TextXs: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['xs', 'xs', 'xs', 'xs']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextRep: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['xs', 'sm', 'sm', 'sm']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextError: React.FC<BoxProps> = ({ ...rest }) => {
  return <Text color="red.500" fontSize="xs" fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextQuote: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.quoteColor[colorMode]} fontSize={['xs', 'sm', 'sm', 'sm']} fontFamily="Roboto" as="i" {...rest}></Text>;
};

export const TextAuthorQuote: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.quoteColor[colorMode]} fontSize={['md', 'md', 'lg', 'lg']} fontFamily="Roboto" as="i" {...rest}></Text>;
};

export const TextNavItem: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize="1xs" fontFamily="'Roboto', serif;" {...rest}></Text>;
};
