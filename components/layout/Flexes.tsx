import React from 'react';
import { Flex } from '@chakra-ui/react';

export const CenterColumnFlex = ({ children, ...rest }: any) => (
  <Flex flexDir="column" alignItems="center" justifyItems="center" alignContent="center" justify="center" {...rest}>
    {children}
  </Flex>
);

export const CenterRowFlex = ({ children, ...rest }: any) => (
  <Flex flexDir="row" wrap="wrap" {...rest}>
    {children}
  </Flex>
);
