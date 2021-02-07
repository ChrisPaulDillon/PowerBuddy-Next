import React from 'react';
import { Tooltip } from '@chakra-ui/react';

export const PbToolTip = ({ label, children, ...rest }: any) => (
  <Tooltip aria-label={label} label={label} placement="right" zIndex={999} {...rest}>
    {children}
  </Tooltip>
);
