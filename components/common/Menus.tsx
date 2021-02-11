import React from 'react';
import { Button, Menu, MenuButton, MenuList, Stack } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { TextXs } from './Texts';
import { Box } from '../../chakra/Layout';

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
        <Box as={Icon} color={color} pr={1} />
        <TextXs fontWeight="light" minW="75px" fontSize={fontSize ?? 'sm'}>
          {title}
        </TextXs>
      </Stack>
    </Button>
  );
};

export default MenuBase;
