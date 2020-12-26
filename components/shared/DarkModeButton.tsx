import { Button, IconButton, useColorMode } from '@chakra-ui/core';
import React from 'react';
import { FaMoon, MdWbSunny } from 'react-icons/all';

export const DarkModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <FaMoon /> : <MdWbSunny />} aria-label="" />;
};
