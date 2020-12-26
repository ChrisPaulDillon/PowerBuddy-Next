import React from 'react';
import logo from '../../images/logo.png';
import { Image } from '@chakra-ui/core';

const Logo = () => {
  return <Image boxSize="100px" color={['white', 'white', 'primary.500', 'primary.500']} src={logo} />;
};

export default Logo;
