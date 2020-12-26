import React from 'react';
import { Box, Flex, useColorMode, Stack, useDisclosure, Avatar, IconButton, useToken } from '@chakra-ui/core';
import theme from '../../theme';
import { MdMenu } from 'react-icons/md';
import { Banner } from '../common/Texts';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import { MobileSideNav } from './LeftNav';
import useScreenSizes from '../../hooks/useScreenSizes';
import RightNav from './RightMenu';
import { PbDrawerForm } from '../common/Drawers';
import { LoginModal } from '../shared/Modals';
import MenuBase from '../common/Menus';
import MCalendar from '../common/MCalendar';
import { PbPrimaryButton } from '../common/Buttons';

const Footer = () => {
  const { user } = useSelector((state: IAppState) => state.state);
  const { colorMode } = useColorMode();
  const { SCREEN_MOBILE, SCREEN_DESKTOP } = useScreenSizes();
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);

  const { isOpen: isLeftNavOpen, onOpen: onLeftNavOpen, onClose: onLeftNavClose } = useDisclosure();
  const { isOpen: isMobileOpen, onOpen: onMobileOpen, onClose: onMobileClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  const [purple100, gray800] = useToken('colors', ['blue.800', 'gray.400']);

  const handleBurgerMenuPress = () => {
    onLeftNavOpen();
  };

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
