import { Accordion, Box, Button, Divider, Link, Stack, Switch, Text, useColorMode, useToast } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { FaMoon } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdArrowBack, MdChevronRight, MdPersonPin } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import useAuthentication from '../../hooks/useAuthentication';
import { deauthenticateUser } from '../../redux/area/account/userActions';
import { TextSm } from '../common/Texts';
import { PROFILE_URL, SETTINGS_URL } from '../../InternalLinks';
import { FcSettings } from 'react-icons/fc';
import { setAuthorizationToken } from '../../redux/util/authorization';

export enum MenuSection {
  Main,
  DarkTheme,
  Profile,
}

interface IRightNavProps {
  userName: string;
  onClose: () => void;
}

export const RightNav: React.FC<IRightNavProps> = ({ userName, onClose }) => {
  useAuthentication();
  const router = useRouter();
  const [menuSection, setMenuSection] = useState<MenuSection | undefined>(MenuSection.Main);
  const dispatcher = useDispatch();
  const toast = useToast();

  const userMenu = useMemo(
    () => ({
      groups: [
        {
          items: [
            {
              loggedInOnly: true,
              name: 'Dark Mode',
              icon: FaMoon,
              onClick: () => {
                setMenuSection(MenuSection.DarkTheme);
              },
            },
          ],
        },
        {
          items: [
            {
              loggedInOnly: true,
              name: 'Profile',
              icon: MdPersonPin,
              onClick: () => {
                onClose();
                router.push(`${PROFILE_URL}/${userName!}`);
              },
            },
          ],
        },
        {
          items: [
            {
              loggedInOnly: true,
              name: 'Settings',
              icon: FcSettings,
              onClick: () => {
                onClose();
                router.push(`${SETTINGS_URL}`);
              },
            },
          ],
        },
        {
          items: [
            {
              loggedInOnly: true,
              name: 'Logout',
              icon: IoIosLogOut,
              onClick: () => {
                onClose();
                localStorage.removeItem('token');
                setAuthorizationToken(null);
                toast({
                  title: 'Success',
                  description: 'Successfully Logged Out',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                  position: 'top',
                });
                setTimeout(function () {
                  window.location.reload();
                }, 1500);
              },
            },
          ],
        },
      ],
    }),
    [userName]
  );

  return (
    <MainMenuContent minH="200px">
      {menuSection === MenuSection.DarkTheme && <MenuDarkMode onClickBack={() => setMenuSection(MenuSection.Main)} />}
      {menuSection === MenuSection.Profile && <MenuDarkMode onClickBack={() => setMenuSection(MenuSection.Main)} />}
      {menuSection === MenuSection.Main && (
        <>
          {userMenu.groups.map((group, idx) => (
            <Box key={idx}>
              {group.items.map((item: any) => (
                <Button
                  key={item.name}
                  as={'a'}
                  isFullWidth
                  borderRadius={0}
                  alignItems="center"
                  justifyContent="left"
                  p={0}
                  bg="transparent"
                  onClick={(e) => item.onClick(e, false)}>
                  <Stack isInline w="100%" px="1.5em" align="center" justify="center">
                    <Box as={item.icon} size="1.25em"></Box>
                    <Text ml="0.5em" fontWeight="normal">
                      {item.name}
                    </Text>
                    <Stack isInline ml="auto" align="center" justify="center">
                      <Text fontSize="0.75em" fontWeight="normal">
                        {item.value}
                      </Text>
                      {item.showChevron && <Box as={MdChevronRight} size="1.5em" />}
                    </Stack>
                  </Stack>
                </Button>
              ))}
              {idx !== userMenu.groups.length - 1 && <Divider />}
            </Box>
          ))}
        </>
      )}
    </MainMenuContent>
  );
};

export const MainMenuContent = (props: any) => <Accordion className="hide-scrollbar" allowToggle h="100%" {...props} />;

const MenuPageSingle = ({ title, description, onClickBack, children, ...rest }: any) => {
  return (
    <>
      <Stack isInline w="100%" justify="space-between" align="center" px="0.5em" mb="1em">
        <Link>
          <Box as={MdArrowBack} size="1.25em" m="0.5em" onClick={onClickBack}></Box>
        </Link>
        <Text fontWeight="semibold">{title}</Text>
        <Box m="0.5em"></Box>
      </Stack>
      <Stack px="1em">
        <Text fontSize="sm">{description}</Text>
        <Box my="1em"></Box>
        {children}
        <Box my="0.25em"></Box>
      </Stack>
    </>
  );
};

export const MenuDarkMode = ({ onClickBack }: any) => {
  const { toggleColorMode } = useColorMode();
  return (
    <MainMenuContent>
      <MenuPageSingle title="Dark Mode" description="Switch between dark mode" onClickBack={onClickBack}>
        <Stack isInline align="center" justifyContent="space-between">
          <TextSm>Dark Mode Enabled:</TextSm>
          <Switch onChange={toggleColorMode} defaultIsChecked={true}></Switch>
        </Stack>
      </MenuPageSingle>
    </MainMenuContent>
  );
};

export default RightNav;
