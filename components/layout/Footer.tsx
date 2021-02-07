import React from 'react';
import { Box, Flex, useColorMode, Stack, useDisclosure, useToken } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import useScreenSizes from '../../hooks/useScreenSizes';
import { useUserContext } from '../users/UserContext';

const Footer = () => {
  const { onOpen: onLeftNavOpen } = useDisclosure();

  const [] = useToken('colors', ['blue.800', 'gray.400']);

  return (
    <Flex
      as="nav"
      //   bg={`linear-gradient(to left, rgba(63, 17, 109), rgba(58, 58, 58, 0))`}
      w="100%"
      justifyContent="flex"
      alignItems="space-between"
      minH="6vh"
      position="sticky"
      bottom={0}
      zIndex={5}>
      <Stack isInline w="100%" justify="space-between" align="center">
        <Flex pt={2}>
          <Box mx={2}></Box>

          {/* <MCalendar /> */}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Footer;
