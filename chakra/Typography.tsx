import { Text as ChakraText, Heading as ChakraHeading, TextProps, useColorMode, HeadingProps } from '@chakra-ui/react';
import theme from '../theme';

export const Text: React.FC<TextProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();

  return <ChakraText color={theme.colors.iconColor[colorMode]} {...rest} />;
};

export const Heading: React.FC<HeadingProps> = ({ ...rest }) => {
  return <ChakraHeading {...rest} />;
};
