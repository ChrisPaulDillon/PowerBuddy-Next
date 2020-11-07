import React from 'react';
import { Input } from '@chakra-ui/core';

export const SmInput = ({ ...rest }) => {
  return <Input placeholder="Select" size="sm" {...rest} defaultValue={0} />;
};
