import React from 'react';
import { BoxProps, Spinner } from '@chakra-ui/react';
import { CenterColumnFlex } from './../layout/Flexes';

const ProgressSpinner = () => {
  return (
    <CenterColumnFlex align="center">
      <Spinner zIndex={999} speed="0.40s" thickness="2px" emptyColor="gray.200" color="red.500" size="xl"></Spinner>
    </CenterColumnFlex>
  );
};

export default ProgressSpinner;
