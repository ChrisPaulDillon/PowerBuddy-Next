import React from 'react';
import { Box, Button, LightMode, Menu, MenuButton, MenuList, Stack, Text } from '@chakra-ui/core';
import { IconType } from 'react-icons';
import { TextXs } from './Texts';

interface IMenuProps {
  button: JSX.Element;
  menuItems?: IMenuItem[];
}

const MenuBase: React.FC<IMenuProps> = ({ button, menuItems, children }) => {
  return (
    <Menu placement="bottom">
      <MenuButton>{button}</MenuButton>
      <MenuList maxW="sm">
        {menuItems?.map((item, idx) => (
          <Box key={idx}>
            <MenuItem {...item} />
          </Box>
        ))}
        {children}
      </MenuList>
    </Menu>
  );
};

export interface IMenuItem {
  title: string;
  Icon: IconType;
  onClick?: () => void;
  color?: string;
  loading?: boolean;
  fontSize?: string;
}

export const MenuItem: React.FC<IMenuItem> = ({ title, Icon, onClick, color, loading, fontSize, ...rest }) => {
  return (
    <Button as={'a'} isFullWidth borderRadius={0} justifyContent="left" p={0} bg="transparent" onClick={onClick} isLoading={loading} {...rest}>
      <Stack isInline w="100%" px="1em" align="center">
        <Box as={Icon} size="1.25em" color={color} pr={1} />
        <TextXs fontWeight="light" minW="75px" fontSize={fontSize ?? 'sm'}>
          {title}
        </TextXs>
      </Stack>
    </Button>
  );
};

export default MenuBase;
