import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, ModalFooter } from '@chakra-ui/core';
import React from 'react';
import LoginForm from '../account/forms/LoginForm';
import { CenterColumnFlex } from '../layout/Flexes';
import { PbPrimaryButton } from './Buttons';
import { Banner, HeadingMd, TextSm } from './Texts';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body?: string;
  actionText: string;
  actionColour?: string;
  onClick: () => void;
}

export const PbModal: React.FC<IModalProps> = ({ isOpen, onClose, title, body, onClick, actionText, actionColour }) => {
  const btnRef = React.useRef();
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent pb={5}>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CenterColumnFlex>
                <Box> {body}</Box>
                <Box mt="5">
                  <PbPrimaryButton onClick={onClick}>{actionText}</PbPrimaryButton>
                </Box>
              </CenterColumnFlex>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

interface IModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: string;
}

export const PbModalForm: React.FC<IModalFormProps> = ({ isOpen, onClose, title, size, children }) => {
  const btnRef = React.useRef();
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={size ?? 'md'}>
        <ModalOverlay>
          <ModalContent pb={5}>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CenterColumnFlex>{children}</CenterColumnFlex>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export const LoginModal = ({ isOpen, onClose }: any) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay>
        <ModalContent pb={5}>
          <ModalHeader fontWeight="normal">
            {' '}
            <CenterColumnFlex>
              <Banner>PowerBuddy</Banner>
              <HeadingMd>The All In One Weightlifting Solution</HeadingMd>
            </CenterColumnFlex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginForm onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <TextSm textAlign="center" mr="5">
              Please Login to Continue
            </TextSm>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
