import React from 'react';
import { Flex, Box, useColorMode, Text } from '@chakra-ui/core';
import theme from '../../theme';

const Footer: React.FC = () => {
  const { colorMode } = useColorMode();
  const borderTop = { light: '1px solid #E7E7E7', dark: '1px solid grey.300' };
  return (
    <Flex
      flexDirection="column"
      bg={theme.colors.background[colorMode]}
      bottom="0"
      height="150"
      width="100%"
      position="relative"
      borderTop={borderTop[colorMode]}>
      <Flex flexDirection="column">
        <Text>Socials</Text>
      </Flex>
      <Flex textAlign="center" align="center" justify="center" bottom="0" left="45%">
        Copyright PowerBuddy 2020
      </Flex>
    </Flex>
  );
};

export default Footer;
