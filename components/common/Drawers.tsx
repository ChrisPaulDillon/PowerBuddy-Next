import React from 'react';
import { Box, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Flex, IconButton, DrawerFooter } from '@chakra-ui/core';
import { IoIosExit } from 'react-icons/all';
import { Banner, HeadingMd } from './Texts';
import { CenterColumnFlex, CenterRowFlex } from '../layout/Flexes';
import { PbPrimaryButton } from './Buttons';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body?: string;
  actionText: string;
  actionColour?: string;
  size: string;
  onClick: () => void;
}

export const PbDrawer: React.FC<IProps> = ({ title, body, isOpen, onClose, onClick, actionText, children, ...rest }) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen} {...rest}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px" fontWeight="1">
          <Flex>
            <CenterRowFlex>
              <IconButton aria-label="" icon={<IoIosExit />} onClick={onClose} variant="ghost" size="md" isRound fontSize="1em" pt="1" />
              <Banner>PowerBuddy</Banner>
            </CenterRowFlex>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
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
              <PbPrimaryButton onClick={onClick}>{actionText}</PbPrimaryButton>
            </Box>
          </CenterColumnFlex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

interface IFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size: string;
}

export const PbDrawerForm: React.FC<IFormProps> = ({ title, isOpen, onClose, children, ...rest }) => {
  return (
    <Box zIndex={999}>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} {...rest}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" fontWeight="1">
            <Flex>
              <CenterRowFlex>
                <IconButton aria-label="" icon={<IoIosExit />} onClick={onClose} variant="ghost" size="md" isRound fontSize="1em" />
                <Banner>PowerBuddy</Banner>
              </CenterRowFlex>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
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
