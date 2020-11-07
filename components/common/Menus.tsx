import React from 'react';
import { Menu, MenuButton, MenuList } from '@chakra-ui/core';

const PbMenu = ({ button, children }: any) => {
  return (
    <Menu>
      <MenuButton>{button}</MenuButton>
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export default PbMenu;
