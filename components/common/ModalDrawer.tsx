import { Box } from '@chakra-ui/core';
import React from 'react';
import useScreenSizes from '../../hooks/useScreenSizes';
import { DrawerBasic, PbDrawerForm } from './Drawers';
import { ModalForward, ModalForm } from './Modals';

interface IModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body?: string;
  actionText: string;
  actionColour?: string;
  loading?: boolean;
  onClick: () => void;
  children?: any;
}

export const PbModalDrawer: React.FC<IModalDrawerProps> = ({
  title,
  body,
  isOpen,
  onClose,
  onClick,
  actionText,
  actionColour,
  loading,
  children,
}) => {
  const { SCREEN_MOBILE } = useScreenSizes();
  return (
    <Box>
      {SCREEN_MOBILE ? (
        <DrawerBasic
          isOpen={isOpen}
          title={title}
          body={body}
          onClose={onClose}
          size="full"
          onClick={onClick}
          actionText={actionText}
          actionColour={actionColour}
          loading={loading}>
          {children}
        </DrawerBasic>
      ) : (
        <ModalForward
          isOpen={isOpen}
          title={title}
          body={body}
          onClose={onClose}
          onClick={onClick}
          actionText={actionText}
          actionColour={actionColour}
          loading={loading}>
          {children}
        </ModalForward>
      )}
    </Box>
  );
};

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: string;
  children?: any;
}

export const ModalDrawerForm: React.FC<IProps> = ({ title, isOpen, onClose, size, children }) => {
  const { SCREEN_MOBILE } = useScreenSizes();
  return (
    <Box>
      {SCREEN_MOBILE ? (
        <PbDrawerForm isOpen={isOpen} title={title} onClose={onClose} size="full">
          {children}
        </PbDrawerForm>
      ) : (
        <ModalForm isOpen={isOpen} title={title} onClose={onClose} size={size}>
          {children}
        </ModalForm>
      )}
    </Box>
  );
};
