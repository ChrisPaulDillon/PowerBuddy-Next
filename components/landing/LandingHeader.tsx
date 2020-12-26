import React from 'react';
import { Box, Flex, Text, Button, Stack, Link, Image } from '@chakra-ui/core';
import { AiOutlineClose, GiHamburgerMenu } from 'react-icons/all';
import { DarkModeButton } from '../shared/DarkModeButton';
import logo from '../../images/logo.png';
import Logo from '../shared/Logo';
import { PORTAL_URL } from '../util/InternalLinks';

const MenuItems = (props) => {
  const { children, isLast, to = '/', ...rest } = props;
  return (
    <Text mb={{ base: isLast ? 0 : 8, sm: 0 }} mr={{ base: 0, sm: isLast ? 0 : 8 }} display="block" {...rest}>
      <Link to={to}>{children}</Link>
    </Text>
  );
};

const Header = (props) => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" p={2} mb={4} {...props}>
      <Flex align="center">
        <Logo />
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </Box>

      <Box display={{ base: show ? 'block' : 'none', md: 'block' }} flexBasis={{ base: '100%', md: 'auto' }}>
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}>
          <MenuItems to={PORTAL_URL}>Portal</MenuItems>
          <MenuItems to={PORTAL_URL}>How It works </MenuItems>
          {/* <MenuItems to="/signup" isLast>
            <Button
              size="sm"
              rounded="md"
              colorScheme="primary.500"
              bg={['white', 'white', 'primary.500', 'primary.500']}
              _hover={{
                bg: ['primary.100', 'primary.100', 'primary.600', 'primary.600'],
              }}>
              Create Account
            </Button>
          </MenuItems> */}
          <MenuItems>
            <DarkModeButton />
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
