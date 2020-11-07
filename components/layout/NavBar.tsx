import React, { useState } from 'react';
import { Box, Flex, Link, useColorMode, Stack, useDisclosure, Avatar, IconButton } from '@chakra-ui/core';
import theme from '../../theme';
import { MdMenu } from 'react-icons/md';
import { Banner } from '../common/Texts';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import PbMenu from '../common/Menus';
import { MobileSideNav } from './SideNav';
import useScreenSizes from '../../hooks/useScreenSizes';
import RightNav from './RightNav';
import { PbDrawerForm } from '../common/Drawers';
import { LoginModal } from '../common/Modals';

interface INavBarProps {
  menuOpen: boolean;
  setMenuOpen: any;
}

const NavBar: React.FC<INavBarProps> = ({ menuOpen, setMenuOpen }) => {
  const { user } = useSelector((state: IAppState) => state.state);
  const { colorMode } = useColorMode();
  const { SCREEN_MOBILE, SCREEN_DESKTOP } = useScreenSizes();
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);
  const { isOpen: isLeftNavOpen, onOpen: onLeftNavOpen, onClose: onLeftNavClose } = useDisclosure();
  const { isOpen: isMobileOpen, onOpen: onMobileOpen, onClose: onMobileClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  const handleBurgerMenuPress = () => {
    if (SCREEN_MOBILE) {
      onLeftNavOpen();
    }
    if (SCREEN_DESKTOP) {
      setMenuOpen(!menuOpen);
    } else {
      onLeftNavOpen();
    }
  };

  return (
    <Flex
      bg={theme.colors.navBackground[colorMode]}
      w="100%"
      p={1}
      justifyContent="flex"
      alignItems="center"
      borderColor={theme.colors.borderColor[colorMode]}
      borderBottomWidth={1}>
      <Stack isInline w="100%" justify="space-between" align="center" ml="1">
        <Flex ml="1">
          <IconButton
            icon={<MdMenu />}
            size="md"
            onClick={handleBurgerMenuPress}
            color={theme.colors.iconColor[colorMode]}
            aria-label=""
            isRound
            fontSize="1.5em"
            variant="ghost"
            ml="5"
          />
          <Banner ml="2">PowerBuddy</Banner>
        </Flex>
        <Flex>
          {SCREEN_MOBILE ? (
            <Box>
              <Avatar size="md" name={user.userName!} onClick={isAuthenticated ? onMobileOpen : onLoginOpen} />
              <PbDrawerForm isOpen={isMobileOpen} onClose={onMobileClose} size="full" title={user.userName!}>
                <RightNav userName={user.userName!} onClose={onMobileClose} />
              </PbDrawerForm>
            </Box>
          ) : isAuthenticated ? (
            <PbMenu button={<Avatar size="md" name={user.userName!} />} py="2">
              <RightNav userName={user.userName!} onClose={onMobileClose} />
            </PbMenu>
          ) : (
            <Avatar size="md" name={user.userName!} onClick={onLoginOpen} />
          )}
        </Flex>
      </Stack>
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
      {isLeftNavOpen && <MobileSideNav isOpen={isLeftNavOpen} onClose={onLeftNavClose} />}
    </Flex>
  );
};

export default NavBar;
