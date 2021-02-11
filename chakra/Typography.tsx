import { Text as ChakraText, Heading as ChakraHeading, TextProps, ChakraProps } from '@chakra-ui/react';

export const Text: React.FC<TextProps> = ({ ...rest }) => {
  return <ChakraText {...rest} />;
};

export const Heading: React.FC<ChakraProps> = ({ ...rest }) => {
  return <ChakraHeading {...rest} />;
};
