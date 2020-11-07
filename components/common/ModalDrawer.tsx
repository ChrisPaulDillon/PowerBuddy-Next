import { Box } from '@chakra-ui/core';
import React from 'react';
import useScreenSizes from '../../hooks/useScreenSizes';
import { PbDrawer, PbDrawerForm } from './Drawers';
import { PbModal, PbModalForm } from './Modals';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body?: string;
  actionText: string;
  actionColour?: string;
  onClick: () => void;
  children?: any;
}

export const PbModalDrawer: React.FC<IModalProps> = ({ title, body, isOpen, onClose, onClick, actionText, actionColour, children }) => {
  const { SCREEN_MOBILE } = useScreenSizes();
  return (
    <Box>
      {SCREEN_MOBILE ? (
        <PbDrawer isOpen={isOpen} title={title} body={body} onClose={onClose} size="full" onClick={onClick} actionText={actionText}>
          {children}
        </PbDrawer>
      ) : (
        <PbModal isOpen={isOpen} title={title} body={body} onClose={onClose} onClick={onClick} actionText={actionText}>
          {children}
        </PbModal>
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

export const PbModalDrawerForm: React.FC<IProps> = ({ title, isOpen, onClose, size, children }) => {
  const { SCREEN_MOBILE } = useScreenSizes();
  return (
    <Box>
      {SCREEN_MOBILE ? (
        <PbDrawerForm isOpen={isOpen} title={title} onClose={onClose} size="full">
          {children}
        </PbDrawerForm>
      ) : (
        <PbModalForm isOpen={isOpen} title={title} onClose={onClose} size={size}>
          {children}
        </PbModalForm>
      )}
    </Box>
  );
};
