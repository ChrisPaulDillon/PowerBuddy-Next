import { Box, Button, Divider, Flex, useColorMode } from '@chakra-ui/core';
import React, { useMemo, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdPersonPin } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../redux/store';
import PbIconButton from '../../common/IconButtons';
import { HeadingMd, PageTitle, TextSm, TextXs } from '../../common/Texts';
import UserAvatar from '../../layout/UserAvatar';
import theme from '../../../theme';
import { log } from 'console';
import EditProfileForm from './forms/EditProfileForm';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import UpdatePasswordForm from './forms/UpdatePasswordForm';

export enum MenuSection {
  Profile,
  Security,
  WorkoutLog,
}

const AccountSettings = () => {
  const [selectedItem, setSelectedItem] = useState<MenuSection>(MenuSection.Profile);
  const { user } = useSelector((state: IAppState) => state.state);
  const { colorMode } = useColorMode();

  const settings = {
    groups: [
      {
        items: [
          {
            name: 'Profile',
            menuItem: MenuSection.Profile,
            onClick: () => {
              setSelectedItem(MenuSection.Profile);
            },
          },
        ],
      },
      {
        items: [
          {
            name: 'Security',
            menuItem: MenuSection.Security,
            onClick: () => {
              setSelectedItem(MenuSection.Security);
            },
          },
        ],
      },
      {
        items: [
          {
            name: 'Workout Log',
            menuItem: MenuSection.WorkoutLog,
            onClick: () => {
              setSelectedItem(MenuSection.WorkoutLog);
            },
          },
        ],
      },
    ],
  };

  return (
    <Box minW={{ xl: '1000px' }} maxW={{ xl: '1000px' }}>
      <Flex justify="center" flexDir="column" align="center" py={2} pb={[5, 3, 2, 1]}>
        <UserAvatar userName={user?.userName} />
        <PageTitle>{user?.userName}</PageTitle>
      </Flex>
      <Flex>
        <Box w="150px" border="1px" borderColor={theme.colors.borderColor[colorMode]}>
          {settings.groups.map((group, idx) => (
            <Box key={idx}>
              {group.items.map((item: any) => (
                <SettingItem name={item.name} onClick={item.onClick} menuItem={item.menuItem} selectedItem={selectedItem} />
              ))}
              {idx !== settings.groups.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
        <SettingContent>
          {selectedItem == MenuSection.Profile && <EditProfileForm />}
          {selectedItem == MenuSection.Security && <UpdatePasswordForm />}
          {selectedItem == MenuSection.WorkoutLog && <TextSm>Unavailable</TextSm>}
        </SettingContent>
      </Flex>
    </Box>
  );
};

interface IContentProps {
  children: any;
}

const SettingContent: React.FC<IContentProps> = ({ children }) => {
  return (
    <Box px={4} minW="260px">
      <Box pb={2}>
        <HeadingMd>Profile</HeadingMd>
        <Divider />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

interface IItemProps {
  name: string;
  menuItem: MenuSection;
  onClick: () => void;
  selectedItem: MenuSection;
}

const SettingItem: React.FC<IItemProps> = ({ name, menuItem, onClick, selectedItem }) => {
  const { colorMode } = useColorMode();

  let isSelected = menuItem == selectedItem;

  return (
    <Box>
      <Button
        w="100%"
        borderLeft={isSelected ? '1px' : '0'}
        bg={isSelected ? theme.colors.menuItemSelected[colorMode] : 'transparent'}
        borderColor="red.500"
        borderRadius={0}
        onClick={onClick}
        size="sm">
        <TextXs fontWeight="light" textAlign="left">
          {name}
        </TextXs>
      </Button>
    </Box>
  );
};

export default AccountSettings;
