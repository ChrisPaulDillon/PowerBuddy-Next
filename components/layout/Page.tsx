import { Box, useColorMode } from '@chakra-ui/core';
import React from 'react';
import theme from '../../theme';

const Page: React.FC = ({ children, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      position="relative"
      height="100vh"
      width="100%"
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      overflowY="scroll"
      p={1}
      css={{
        scrollSnapType: 'x mandatory',
        '::-webkit-scrollbar': { width: 0 },
        '-msOverflowStyle': 'none',
        scrollbarWidth: 'none',
      }}
      {...rest}>
      {children}
    </Box>
  );
};

export default Page;
