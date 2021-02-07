import { ModalFooter } from '@chakra-ui/core';
import React from 'react';
import LoginFormFactory from '../account/factories/LoginFormFactory';
import { ModalBase } from '../common/Modals';
import { Banner, HeadingMd, TextSm } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<ILoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalBase
      onClose={onClose}
      isOpen={isOpen}
      hasCloseButton={false}
      title={
        <CenterColumnFlex>
          <Banner>PowerBuddy</Banner>
          <HeadingMd>The All In One Weightlifting Solution</HeadingMd>
        </CenterColumnFlex>
      }>
      <LoginFormFactory onClose={onClose} />
      <ModalFooter>
        <TextSm textAlign="center" mr="5">
          Please Login to Continue
        </TextSm>
      </ModalFooter>
    </ModalBase>
  );
};
