import { ModalFooter } from '@chakra-ui/react';
import React from 'react';
import LoginFormFactory from '../account/factories/LoginFormFactory';
import { ModalDrawerForm } from '../common/ModalDrawers';
import { ModalBase } from '../common/Modals';
import { Banner, HeadingMd, TextSm } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<ILoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalDrawerForm
      onClose={onClose}
      isOpen={isOpen}
      hasCloseButton={false}
      title={
        <CenterColumnFlex>
          <Banner>PowerBuddy</Banner>
          <HeadingMd>The All In One Weightlifting Solution</HeadingMd>
        </CenterColumnFlex>
      }>
      {' '}
      <LoginFormFactory onClose={onClose} />
    </ModalDrawerForm>
  );
};
