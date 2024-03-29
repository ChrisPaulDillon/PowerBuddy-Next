import { Box } from '@chakra-ui/react';
import React from 'react';
import useScreenSizes from '../../hooks/useScreenSizes';
import { DrawerBasic, DrawerForm } from './Drawers';
import { ModalForward, ModalForm } from './Modals';

interface IBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  hasCloseButton?: boolean;
}

interface IModalDrawerProps extends IBaseProps {
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

interface IModalDrawerFormProps extends IBaseProps {
  size?: string;
  children?: any;
}

export const ModalDrawerForm: React.FC<IModalDrawerFormProps> = ({ title, isOpen, onClose, size, hasCloseButton, children }) => {
  const { SCREEN_MOBILE } = useScreenSizes();
  return (
    <Box>
      {SCREEN_MOBILE ? (
        <DrawerForm isOpen={isOpen} title={title} onClose={onClose} size="full" hasCloseButton={hasCloseButton}>
          {children}
        </DrawerForm>
      ) : (
        <ModalForm isOpen={isOpen} title={title} onClose={onClose} size={size} hasCloseButton={hasCloseButton}>
          {children}
        </ModalForm>
      )}
    </Box>
  );
};
