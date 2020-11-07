import { Popover, PopoverTrigger, PopoverContent, PopoverCloseButton } from '@chakra-ui/core';
import React from 'react';

interface IProps {
  button: JSX.Element;
  isOpen: boolean | undefined;
  onClose: () => void;
  children: any;
}

const PbPopover: React.FC<IProps> = ({ isOpen, onClose, button, children, ...rest }) => {
  const firstFieldRef = React.useRef(null);
  return (
    <>
      <Popover isOpen={isOpen} initialFocusRef={firstFieldRef} onClose={onClose} placement="bottom" closeOnBlur={true} {...rest}>
        <PopoverTrigger>{button}</PopoverTrigger>
        <PopoverContent p={5}>
          {children}
          <PopoverCloseButton />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PbPopover;
