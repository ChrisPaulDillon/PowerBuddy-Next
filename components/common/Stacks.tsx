import React from 'react';
import { Stack } from '@chakra-ui/react';

export const PbStack = ({ children, ...rest }: any) => (
  <Stack
    isInline
    justify="space-between"
    align="center"
    // px="0.5em"
    mb="1em"
    w="100%"
    {...rest}>
    {children}
  </Stack>
);
