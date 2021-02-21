import React from 'react';
import { Box } from '../../chakra/Layout';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '../../chakra/Overlay';
import { CenterColumnFlex } from '../layout/Flexes';
import { FormButton, PrimaryButton, SecondaryButton } from './Buttons';
import { PbStack } from './Stacks';
import { HeadingMd } from './Texts';

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
      <ModalContent>
        <ModalHeader textAlign="center">
          <HeadingMd>{title}</HeadingMd>
        </ModalHeader>
        {hasCloseButton && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
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
      <Box textAlign="center"> {body}</Box>
      <FormButton onClick={onClick} colorScheme={actionColour} isLoading={loading}>
        {actionText}
      </FormButton>
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
          <SecondaryButton onClick={onClick} isLoading={loading}>
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
              <SecondaryButton onClick={onBackClick} isLoading={loading}>
                {backText ?? 'Back'}
              </SecondaryButton>
            </Box>
            <PrimaryButton onClick={onForwardClick} isLoading={loading}>
              {forwardText ?? 'Submit'}
            </PrimaryButton>
          </PbStack>
        </Box>
      </CenterColumnFlex>
    </ModalBase>
  );
};

interface IModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string | React.ReactNode;
  size?: string;
  hasCloseButton?: boolean;
}

export const ModalForm: React.FC<IModalFormProps> = ({ isOpen, onClose, title, hasCloseButton, children }) => {
  return (
    <ModalBase onClose={onClose} isOpen={isOpen} title={title} hasCloseButton={hasCloseButton}>
      {children}
    </ModalBase>
  );
};
