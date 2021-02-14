import { FlexProps } from '@chakra-ui/react';
import React from 'react';
import { Flex } from '../../chakra/Layout';

export const CenterColumnFlex: React.FC<FlexProps> = ({ children, ...rest }) => (
  <Flex flexDir="column" alignItems="center" justifyItems="center" alignContent="center" justify="center" {...rest}>
    {children}
  </Flex>
);

export const CenterRowFlex: React.FC<FlexProps> = ({ children, ...rest }) => (
  <Flex flexDir="row" wrap="wrap" {...rest}>
    {children}
  </Flex>
);

export const FormLayoutFlex: React.FC<FlexProps> = ({ children, ...rest }) => (
  <Flex flexDir="column" justify="space-between" my={3} {...rest}>
    {children}
  </Flex>
);
