import React from 'react';
import { Text, Heading, useColorMode, BoxProps } from '@chakra-ui/core';
import theme from '../../theme';
import { CenterColumnFlex, CenterRowFlex } from '../layout/Flexes';
import { IconType } from 'react-icons';

interface IPageHeaderProps extends BoxProps {
  Icon?: IconType;
  size?: string;
  onInfoClick?: () => void;
}

export const PageHeader: React.FC<IPageHeaderProps> = ({ Icon, size, onInfoClick, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <CenterRowFlex justify="center">
      <Heading color={theme.colors.textColor[colorMode]} size="lg" fontFamily="'Roboto', serif;" {...rest}></Heading>
    </CenterRowFlex>
  );
};

export const PageSubHeader: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <CenterColumnFlex>
      <Text color={theme.colors.textColor[colorMode]} fontSize={['lg', 'lg', 'xl', 'xl']} fontFamily="'Roboto', serif;" {...rest}></Text>
    </CenterColumnFlex>
  );
};

export const PageHeaderStatic: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize="3xl" fontFamily="'Roboto', serif;" {...rest}></Text>;
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

export const TextXs: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['xs', 'xs', 'xs', 'xs']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextRep: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize={['xs', 'sm', 'sm', 'sm']} fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextExercise: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize="xl" fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextError: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color="red.500" fontSize="1xs" fontFamily="'Roboto', serif;" {...rest}></Text>;
};

export const TextExerciseRep: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize="1xs" fontFamily="'Roboto', serif;" {...rest}></Text>;
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

export const Banner: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color="red.600" fontSize="3xl" fontFamily="'trade-gothic'" textAlign="center" {...rest}></Text>;
};

export const SubBanner: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return <Text color={theme.colors.textColor[colorMode]} fontSize="2xl" fontFamily="'trade-gothic'" textAlign="left" {...rest}></Text>;
};
