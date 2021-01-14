import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/core';
import React from 'react';
import LoginFormFactory from '../account/factories/LoginFormFactory';
import LoginForm from '../account/forms/LoginForm';
import { Banner, HeadingMd, TextSm } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';

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
            <LoginFormFactory onClose={onClose} />
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
