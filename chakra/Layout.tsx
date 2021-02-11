import { BoxProps, Box as ChakraBox, forwardRef, FlexProps, Flex as ChakraFlex, StackProps, Stack as ChakraStack } from '@chakra-ui/react';
import React, { ElementType } from 'react';

export const Box: React.FC<BoxProps & { ref?: React.Ref<HTMLDivElement> }> = forwardRef<
  BoxProps & { ref: React.Ref<HTMLDivElement> },
  ElementType<HTMLDivElement>
>(({ ...rest }, ref) => {
  return <ChakraBox ref={ref} {...rest} />;
});

export const Flex: React.FC<FlexProps> = ({ ...rest }) => {
  return <ChakraFlex {...rest} />;
};

export const Stack: React.FC<StackProps> = ({ ...rest }) => {
  return <ChakraStack {...rest} />;
};
