import React from 'react';
import UserAvatar from '../layout/UserAvatar';
import { PbStack } from './Stacks';
import { CenterColumnFlex } from '../layout/Flexes';
import { Box, Stack } from '../../chakra/Layout';
import { Icon } from '../../chakra/Forms';
import { FaBan, FaExclamation, FcCheckmark } from 'react-icons/all';
import { Text } from '../../chakra/Typography';

interface IToastAvatarProps {
  description: string;
  userName: string;
}

export const ToastAvatar: React.FC<IToastAvatarProps> = ({ userName, description }) => {
  return (
    <Box p={2} bg="gray.600" rounded="lg" minH="50px">
      <PbStack mt={1}>
        <UserAvatar userName={userName} />
        <CenterColumnFlex>
          <Text fontWeight={500} color="white">
            {description}
          </Text>
        </CenterColumnFlex>
      </PbStack>
    </Box>
  );
};

interface IToastProps {
  description: string;
}

export const ToastSuccess: React.FC<IToastProps> = ({ description }) => {
  return (
    <Box p={2} bg="gray.600" rounded="lg" minH="50px">
      <Stack isInline m={1} align="center">
        <Icon as={FcCheckmark} />
        <Text fontWeight={500} color="white">
          {description ?? 'Success'}
        </Text>
      </Stack>
    </Box>
  );
};

export const ToastError: React.FC<IToastProps> = ({ description }) => {
  return (
    <Box p={2} bg="gray.600" rounded="lg" minH="50px">
      <Stack isInline m={1} align="center">
        <Icon as={FaBan} color="red.500" />
        <Text fontWeight={500} color="white">
          {description ?? 'Success'}
        </Text>
      </Stack>
    </Box>
  );
};

export const ToastWarning: React.FC<IToastProps> = ({ description }) => {
  return (
    <Box p={2} bg="gray.600" rounded="lg" minH="50px">
      <Stack isInline m={1} align="center">
        <Icon as={FaExclamation} color="orange.500" />
        <Text fontWeight={500} color="white">
          {description ?? 'Success'}
        </Text>
      </Stack>
    </Box>
  );
};
