import { Link, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState, useMemo } from 'react';
import { FaMoon } from 'react-icons/fa';
import { IoIosLogIn, IoIosLogOut } from 'react-icons/io';
import { MdArrowBack, MdChevronRight, MdPersonPin } from 'react-icons/md';
import { LOGIN_URL, PROFILE_URL, SETTINGS_URL } from '../../InternalLinks';
import { FcSettings } from 'react-icons/fc';
import { useUserContext } from '../users/UserContext';
import axios from 'axios';
import { LogoutUserUrl } from '../../api/account/auth';
import { setAuthorizationToken } from '../../util/axiosUtils';
import { Box, Stack } from '../../chakra/Layout';
import { Button, Switch } from '../../chakra/Forms';
import { Text } from '../../chakra/Typography';
import { Accordion } from '../../chakra/Disclosure';
import theme from '../../theme';
import useFireToast from '../../hooks/useFireToast';

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
  const router = useRouter();
  const [menuSection, setMenuSection] = useState<MenuSection | undefined>(MenuSection.Main);
  const toast = useFireToast();
  const { isAuthenticated } = useUserContext();

  const { colorMode } = useColorMode();

  const logoutUser = async () => {
    await axios.post(LogoutUserUrl(localStorage.getItem('refreshToken')));
  };

  const userMenu = useMemo(
    () => ({
      groups: [
        {
          items: [
            {
              loggedInOnly: false,
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
              loggedInOnly: false,
              name: isAuthenticated ? 'Logout' : 'Login',
              icon: isAuthenticated ? IoIosLogOut : IoIosLogIn,
              onClick: () => {
                onClose();
                if (isAuthenticated) {
                  logoutUser();
                  localStorage.removeItem('refreshToken');
                  setAuthorizationToken(null);
                  toast.Success('Successfully Logged Out');
                  setTimeout(function () {
                    window.location.reload();
                  }, 1000);
                } else {
                  router.push(LOGIN_URL);
                }
              },
            },
          ],
        },
      ],
    }),
    [userName, isAuthenticated]
  );

  return (
    <MainMenuContent minH="200px">
      {menuSection === MenuSection.DarkTheme && <MenuDarkMode onClickBack={() => setMenuSection(MenuSection.Main)} />}
      {menuSection === MenuSection.Profile && <MenuDarkMode onClickBack={() => setMenuSection(MenuSection.Main)} />}
      {menuSection === MenuSection.Main && (
        <>
          {userMenu.groups.map((group, idx) => (
            <Box key={idx}>
              {group.items.map((item: any) => {
                if (!isAuthenticated && item.loggedInOnly) {
                  return null;
                }
                return (
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
                      <Box as={item.icon} color={theme.colors.textColor[colorMode]} />
                      <Text ml="0.5em" fontWeight="normal" color={theme.colors.textColor[colorMode]}>
                        {item.name}
                      </Text>
                      <Stack isInline ml="auto" align="center" justify="center">
                        <Text fontSize="0.75em" fontWeight="normal" color={theme.colors.textColor[colorMode]}>
                          {item.value}
                        </Text>
                        {item.showChevron && <Box as={MdChevronRight} />}
                      </Stack>
                    </Stack>
                  </Button>
                );
              })}
              {/* {idx !== userMenu.groups.length - 1 && <Divider />} */}
            </Box>
          ))}
        </>
      )}
    </MainMenuContent>
  );
};

export const MainMenuContent = (props: any) => <Accordion className="hide-scrollbar" allowToggle h="100%" {...props} />;

const MenuPageSingle = ({ title, description, onClickBack, children }: any) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Stack isInline w="100%" justify="space-between" align="center" px="0.5em" mb="1em">
        <Link>
          <Box as={MdArrowBack} m="0.5em" onClick={onClickBack} color={theme.colors.textColor[colorMode]} />
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
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MainMenuContent>
      <MenuPageSingle title="Dark Mode" description="Switch between dark mode" onClickBack={onClickBack}>
        <Stack isInline align="center" justifyContent="space-between">
          <Text>Dark Mode Enabled</Text>
          <Switch onChange={toggleColorMode} defaultIsChecked={colorMode === 'dark' ? true : false} />
        </Stack>
      </MenuPageSingle>
    </MainMenuContent>
  );
};

export default RightNav;
