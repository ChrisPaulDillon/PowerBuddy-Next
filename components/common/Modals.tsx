import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box } from '@chakra-ui/react';
import React from 'react';
import { CenterColumnFlex } from '../layout/Flexes';
import { PbPrimaryButton, SecondaryButton } from './Buttons';
import { PbStack } from './Stacks';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  body?: string;
  loading?: boolean;
  hasCloseButton?: boolean;
}

export const ModalBase: React.FC<IModalProps> = ({ isOpen, onClose, title, hasCloseButton = true, children }) => (
  <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="outside" colorScheme="blue.500">
    <ModalOverlay>
      <ModalContent pb={5}>
        <ModalHeader textAlign="center" fontWeight="lighter">
          {title}
        </ModalHeader>
        {hasCloseButton && <ModalCloseButton />}
        <ModalBody>
          <Box p={4}>{children}</Box>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  </Modal>
);

interface IModalForwardProps extends IModalProps {
  onClick: () => void;
  actionText: string;
  actionColour?: string;
}

export const ModalForward: React.FC<IModalForwardProps> = ({ isOpen, onClose, title, body, onClick, actionText, actionColour, loading }) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title}>
      <CenterColumnFlex>
        <Box textAlign="center"> {body}</Box>
        <Box mt="5">
          <PbPrimaryButton onClick={onClick} colorScheme={actionColour} loading={loading}>
            {actionText}
          </PbPrimaryButton>
        </Box>
      </CenterColumnFlex>
    </ModalBase>
  );
};

interface IModalBackProps extends IModalProps {
  onClick: () => void;
  actionText: string;
}

export const ModalBack: React.FC<IModalBackProps> = ({ isOpen, onClose, title, body, onClick, actionText, loading }) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title}>
      <CenterColumnFlex>
        <Box> {body}</Box>
        <Box mt="5">
          <SecondaryButton onClick={onClick} loading={loading}>
            {actionText}
          </SecondaryButton>
        </Box>
      </CenterColumnFlex>
    </ModalBase>
  );
};

interface IModalBackForwardProps extends IModalProps {
  onBackClick: () => void;
  onForwardClick: () => void;
  forwardText?: string;
  backText?: string;
}

export const ModalBackForward: React.FC<IModalBackForwardProps> = ({
  isOpen,
  onClose,
  title,
  body,
  loading,
  onBackClick,
  onForwardClick,
  forwardText,
  backText,
}) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title}>
      <CenterColumnFlex>
        <Box> {body}</Box>
        <Box mt="5">
          <PbStack>
            <Box mr={5}>
              <SecondaryButton onClick={onBackClick} loading={loading}>
                {backText ?? 'Back'}
              </SecondaryButton>
            </Box>
            <PbPrimaryButton onClick={onForwardClick} loading={loading}>
              {forwardText ?? 'Submit'}
            </PbPrimaryButton>
          </PbStack>
        </Box>
      </CenterColumnFlex>
    </ModalBase>
  );
};

interface IModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: string;
}

export const ModalForm: React.FC<IModalFormProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <ModalBase onClose={onClose} isOpen={isOpen} title={title}>
      {children}
    </ModalBase>
  );
};
