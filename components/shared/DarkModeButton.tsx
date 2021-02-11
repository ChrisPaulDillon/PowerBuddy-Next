import { useColorMode } from '@chakra-ui/react';
import React from 'react';
import { FaMoon, MdWbSunny } from 'react-icons/all';
import { IconButton } from '../../chakra/Forms';

export const DarkModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <FaMoon /> : <MdWbSunny />} aria-label="" />;
};
