import React from 'react';
import { Stack, StackProps } from '@chakra-ui/react';

export const PbStack: React.FC<StackProps> = ({ children, ...rest }) => (
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

export const FormStack: React.FC<StackProps> = ({ children, ...rest }) => (
  <Stack isInline justify="space-between" align="center" my={1} w="100%" {...rest}>
    {children}
  </Stack>
);
