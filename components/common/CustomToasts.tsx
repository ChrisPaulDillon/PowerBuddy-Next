import { useColorMode } from '@chakra-ui/react';
import React from 'react';
import UserAvatar from '../layout/UserAvatar';
import { PbStack } from './Stacks';
import { TextXs } from './Texts';
import theme from '../../theme';
import { CenterColumnFlex } from '../layout/Flexes';
import { Box, Stack } from '../../chakra/Layout';
import { Icon } from '../../chakra/Forms';
import { FcCheckmark } from 'react-icons/all';
import { Text } from '../../chakra/Typography';

interface IToastAvatarProps {
  description: string;
  userName: string;
}

export const ToastAvatar: React.FC<IToastAvatarProps> = ({ userName, description }) => {
  const { colorMode } = useColorMode();

  return (
    <Box p={2} bg={theme.colors.toastColor[colorMode]} rounded="lg">
      <PbStack mt={1}>
        <UserAvatar userName={userName} />
        <CenterColumnFlex>
          <TextXs>{description}</TextXs>
        </CenterColumnFlex>
      </PbStack>
    </Box>
  );
};

interface IToastProps {
  description: string;
}

export const ToastCustomSuccess: React.FC<IToastProps> = ({ description }) => {
  const { colorMode } = useColorMode();

  return (
    <Box p={2} bg={theme.colors.toastColor[colorMode]} rounded="lg" minH="50px">
      <Stack isInline justify="space-between" m={1} align="center">
        <Text fontWeight={500}>{description ?? 'Success'}</Text>
        <Icon as={FcCheckmark} />
      </Stack>
    </Box>
  );
};
