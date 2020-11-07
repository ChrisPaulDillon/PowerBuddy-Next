import {
  Accordion,
  Box,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Switch,
  Text,
  theme,
  useColorMode,
  useToast,
} from '@chakra-ui/core';
import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { FaCamera, FaFolderOpen, FaMoon } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { IoIosLogOut, IoMdMore } from 'react-icons/io';
import { MdChevronRight, MdPersonPin } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Router, useHistory } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import { deauthenticateUser } from '../../redux/area/account/userActions';
import { IAppState } from '../../redux/store';
import { TextSm } from '../common/Texts';
import { MenuPage, MenuPageSingle } from './Menu';

export enum MenuSection {
  Main,
  DarkTheme,
  Profile,
  LocationSelect,
  LanguageSelect,
}

interface IRightNavProps {
  userName: string;
  onClose: () => void;
}

export const RightNav: React.FC<IRightNavProps> = ({ userName, onClose }) => {
  useAuthentication();
  const history = useHistory();
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
              onClick: (e: { preventDefault: () => void }, x: any) => {
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
              onClick: (e: { preventDefault: () => void }, x: any) => {
                onClose();
                history.push(`/u/${userName!}`);
              },
            },
            // {
            //   loggedInOnly: true,
            //   name: 'Test',
            //   icon: FaCamera,
            //   onClick: (e: { preventDefault: () => void }, x: any) => {
            //     setMenuSection(MenuSection.LanguageSelect);
            //   },
            // },
            // {
            //   loggedInOnly: true,
            //   name: 'Test',
            //   icon: FaFolderOpen,
            //   onClick: (e: { preventDefault: () => void }, x: any) => {
            //     setMenuSection(MenuSection.LanguageSelect);
            //   },
            // },
          ],
        },
        {
          items: [
            {
              loggedInOnly: true,
              name: 'Logout',
              icon: IoIosLogOut,
              onClick: (e: { preventDefault: () => void }, x: any) => {
                onClose();
                dispatcher(deauthenticateUser());
                toast({
                  title: 'Success',
                  description: 'Successfully Logged Out',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                  position: 'top',
                });
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

export const MainMenuContent = (props: any) => (
  <>
    <Accordion className="hide-scrollbar" allowToggle h="100%" {...props} />
    {/* <style jsx global>{`
      .hide-scrollbar {
        overflow-x: scroll; // enables horizontal scrolling
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none; // hides scrollbar
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none; // hides scrollbar on webkit
      }
    `}</style> */}
  </>
);

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
