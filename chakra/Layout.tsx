import { BoxProps, Box as ChakraBox, forwardRef } from '@chakra-ui/react';
import React, { ElementType } from 'react';

export const Box: React.FC<BoxProps & { ref?: React.Ref<HTMLDivElement> }> = forwardRef<
  BoxProps & { ref: React.Ref<HTMLDivElement> },
  ElementType<HTMLDivElement>
>(({ ...rest }, ref) => {
  return <ChakraBox ref={ref} {...rest} />;
});
