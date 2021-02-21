import React from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex } from '@chakra-ui/react';
import { CenterColumnFlex } from '../layout/Flexes';
import { PrimaryButton } from './Buttons';
import { PlacementType, SizeType } from '../../types/unionTypes';
import { DrawerCloseButton } from '@chakra-ui/react';
import { Box } from '../../chakra/Layout';
import { HeadingMd } from './Texts';

interface IDrawerBaseProps {
  title: string | React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  hasCloseButton?: boolean;
  placement?: PlacementType;
  size?: SizeType;
  children: any;
}

const DrawerBase: React.FC<IDrawerBaseProps> = ({ title, isOpen, onClose, hasCloseButton = true, size, placement, children, ...rest }) => (
  <Drawer placement={placement ?? 'left'} onClose={onClose} isOpen={isOpen} size={size ?? 'full'} {...rest}>
    <DrawerOverlay />
    <DrawerContent>
      {hasCloseButton && <DrawerCloseButton onClick={onClose} />}
      <DrawerHeader textAlign="center">
        <HeadingMd>{title}</HeadingMd>
      </DrawerHeader>
      <DrawerBody>{children}</DrawerBody>
    </DrawerContent>
  </Drawer>
);

interface IDrawerBasicProps extends IDrawerBaseProps {
  body?: string;
  actionText: string;
  actionColour?: string;
  loading?: boolean;
  onClick: () => void;
}

export const DrawerBasic: React.FC<IDrawerBasicProps> = ({
  title,
  body,
  isOpen,
  onClose,
  onClick,
  actionText,
  actionColour,
  placement,
  size,
  loading,
  children,
  ...rest
}) => {
  return (
    <DrawerBase isOpen={isOpen} onClose={onClose} placement={placement} size={size} title={title}>
      <CenterColumnFlex>
        <Box
          mt="2"
          overflowY="scroll"
          css={{
            scrollSnapType: 'x mandatory',
            '::-webkit-scrollbar': { width: 0 },
            '-msOverflowStyle': 'none',
            scrollbarWidth: 'none',
          }}
          {...rest}>
          {body}
          {children}
        </Box>
        <Box mt="5">
          <PrimaryButton onClick={onClick} colorScheme={actionColour} isLoading={loading}>
            {actionText}
          </PrimaryButton>
        </Box>
      </CenterColumnFlex>
    </DrawerBase>
  );
};

interface IDrawerFormProps extends IDrawerBaseProps {
  title: string | React.ReactNode;
}

export const DrawerForm: React.FC<IDrawerFormProps> = ({ title, isOpen, onClose, hasCloseButton, size, placement, children, ...rest }) => {
  return (
    <DrawerBase title={title} isOpen={isOpen} onClose={onClose} hasCloseButton={hasCloseButton} size={size} placement={placement}>
      <Flex flexDir="column">
        <Box
          mt="2"
          overflowY="scroll"
          css={{
            scrollSnapType: 'x mandatory',
            '::-webkit-scrollbar': { width: 0 },
            '-msOverflowStyle': 'none',
            scrollbarWidth: 'none',
          }}
          {...rest}>
          {children}
        </Box>
      </Flex>
    </DrawerBase>
  );
};
