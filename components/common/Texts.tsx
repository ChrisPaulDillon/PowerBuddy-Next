import React from 'react';
import { Text, Heading, useColorMode, useColorModeValue as mode, BoxProps } from '@chakra-ui/react';
import theme from '../../theme';

export const Banner: React.FC<BoxProps> = ({ ...rest }) => {
  return <Heading color={mode('whatsapp.500', 'whatsapp.500')} textAlign="center" size="xl" fontWeight="extrabold" {...rest}></Heading>;
};

export const PageTitle: React.FC<BoxProps> = ({ ...rest }) => {
  return <Heading color={mode('gray.600', 'white')} textAlign="center" size="lg" fontWeight="extrabold" {...rest} />;
};

export const PageSubHeader: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['lg', 'lg', 'xl', 'xl']} textAlign="center" {...rest}></Text>;
};

export const HeadingMd: React.FC<BoxProps> = ({ ...rest }) => {
  return <Heading fontSize={'lg'} color={mode('gray.600', 'white')} fontWeight="extrabold" textAlign="center" {...rest}></Heading>;
};

export const HeadingXs: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['sm', 'sm', 'sm', 'sm']} {...rest}></Text>;
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
  return <Text color={mode('gray.100', 'white')} fontSize={['xs', 'sm', 'sm', 'sm']} fontFamily="'Roboto', serif;" {...rest}></Text>;
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
