import React from 'react';
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex, IconButton, DrawerFooter } from '@chakra-ui/react';
import { IoIosExit } from 'react-icons/all';
import { Banner, HeadingMd } from './Texts';
import { CenterColumnFlex, CenterRowFlex } from '../layout/Flexes';
import { PbPrimaryButton } from './Buttons';

interface IDrawerBaseProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const DrawerBase: React.FC<IDrawerBaseProps> = ({ isOpen, onClose, children, ...rest }) => (
  <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="full" {...rest}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px" fontWeight="light" textAlign="center">
        <Flex>
          <CenterRowFlex>
            <IconButton aria-label="" icon={<IoIosExit />} onClick={onClose} variant="ghost" size="md" isRound fontSize="1em" pt="1" />
            <Banner>PowerBuddy</Banner>
          </CenterRowFlex>
        </Flex>
      </DrawerHeader>
      <DrawerBody>{children}</DrawerBody>
    </DrawerContent>
  </Drawer>
);

interface IDrawerBasicProps extends IDrawerBaseProps {
  title: string;
  body?: string;
  actionText: string;
  actionColour?: string;
  size: string;
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
  loading,
  children,
  ...rest
}) => {
  return (
    <DrawerBase isOpen={isOpen} onClose={onClose}>
      <CenterColumnFlex>
        <HeadingMd>{title}</HeadingMd>
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
          <PbPrimaryButton onClick={onClick} colorScheme={actionColour} loading={loading}>
            {actionText}
          </PbPrimaryButton>
        </Box>
      </CenterColumnFlex>
    </DrawerBase>
  );
};

interface IDrawerFormProps extends IDrawerBaseProps {
  title: string;
  size: string;
}

export const PbDrawerForm: React.FC<IDrawerFormProps> = ({ title, isOpen, onClose, children, ...rest }) => {
  return (
    <DrawerBase isOpen={isOpen} onClose={onClose}>
      <Flex flexDir="column">
        <CenterColumnFlex>
          <HeadingMd>{title}</HeadingMd>
        </CenterColumnFlex>
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

export const PbDrawerHeaderless = ({ title, isOpen, onOpen, onClose, children, ...rest }: any) => {
  return (
    <Box overflowY="scroll">
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} {...rest} overflowY="scroll">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex flexDir="column">
              <CenterColumnFlex>
                <HeadingMd>{title}</HeadingMd>
              </CenterColumnFlex>
              <Box mt="4">{children}</Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
