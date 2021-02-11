import { useColorMode } from '@chakra-ui/react';
import React from 'react';
import UserAvatar from '../layout/UserAvatar';
import { PbStack } from './Stacks';
import { TextXs } from './Texts';
import theme from '../../theme';
import { CenterColumnFlex } from '../layout/Flexes';
import { Box } from '../../chakra/Layout';

interface IToastProps {
  description: string;
  userName: string;
}

export const ToastAvatar: React.FC<IToastProps> = ({ userName, description }) => {
  const { colorMode } = useColorMode();

  return (
    <Box p={2} bg={theme.colors.cardColor[colorMode]} rounded="lg">
      <PbStack mt={1}>
        <UserAvatar userName={userName} />
        <CenterColumnFlex>
          <TextXs>{description}</TextXs>
        </CenterColumnFlex>
      </PbStack>
    </Box>
  );
};
