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

export enum MenuSection {
  Profile,
  Security,
  WorkoutLog,
}

const AccountSettings = () => {
  const [selectedItem, setSelectedItem] = useState<MenuSection>(MenuSection.Profile);
  const { user } = useSelector((state: IAppState) => state.state);
  const { colorMode } = useColorMode();

  const settings = useMemo(
    () => ({
      groups: [
        {
          items: [
            {
              name: 'Profile',
              menuItem: MenuSection.Profile,
              onClick: () => {},
            },
          ],
        },
        {
          items: [
            {
              name: 'Security',
              menuItem: MenuSection.Security,
              onClick: () => {},
            },
          ],
        },
        {
          items: [
            {
              name: 'Workout Log',
              menuItem: MenuSection.WorkoutLog,
              onClick: () => {},
            },
          ],
        },
      ],
    }),
    [user]
  );

  return (
    <Box minW={{ xl: '1200px' }} maxW={{ xl: '1200px' }}>
      <Flex justify="center" flexDir="column" align="center" py={2}>
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
        <SettingContent />
      </Flex>
    </Box>
  );
};

const SettingContent = () => {
  return (
    <Box px={4}>
      <Box pb={2}>
        <HeadingMd>Test</HeadingMd>
        <Divider />
      </Box>
      <TextXs>
        "The quick brown fox jumps over the lazy dog" is an English-language pangram—a sentence that contains all of the letters of the English
        alphabet. Owing to its existence, Chakra was created.
      </TextXs>
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
  const [isSelected] = useState<boolean>(menuItem == selectedItem);

  console.log(selectedItem);
  console.log(menuItem);
  console.log(isSelected);

  return (
    <Box>
      <Button
        w="100%"
        borderLeft={isSelected ? '1px' : '0'}
        bg={isSelected ? 'gray.700' : 'transparent'}
        borderColor="red.500"
        borderRadius={0}
        size="sm">
        <TextXs fontWeight="light" textAlign="left">
          {name}
        </TextXs>
      </Button>
    </Box>
  );
};

export default AccountSettings;
