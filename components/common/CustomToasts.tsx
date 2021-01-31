import { Box, useColorMode } from '@chakra-ui/core';
import React from 'react';
import UserAvatar from '../layout/UserAvatar';
import { PbStack } from './Stacks';
import { TextSm, TextXs } from './Texts';
import theme from '../../theme';
import { CenterColumnFlex } from '../layout/Flexes';

interface IToastProps {
  title: string;
  description: string;
  userName: string;
}

export const ToastAvatar: React.FC<IToastProps> = ({ title, description, userName }) => {
  const { colorMode } = useColorMode();

  return (
    <Box p={1} bg={theme.colors.cardColor[colorMode]} rounded="lg">
      <PbStack mt={1}>
        <UserAvatar userName={userName} />
        <CenterColumnFlex>
          <TextSm>{title}</TextSm>
          <TextXs>{description}</TextXs>
        </CenterColumnFlex>
      </PbStack>
    </Box>
  );
};
