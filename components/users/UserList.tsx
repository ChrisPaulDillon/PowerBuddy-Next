import React from 'react';
import UserAvatar from '../layout/UserAvatar';
import { Box, Flex } from '@chakra-ui/react';
import { TextXs } from '../common/Texts';
import { IUser } from 'powerbuddy-shared';

interface IProps {
  publicUsers: IUser[];
}

const UserList: React.FC<IProps> = ({ publicUsers }) => {
  return (
    <Flex wrap="wrap">
      {publicUsers.map((x, idx) => (
        <Box key={idx}>
          <PublicUserSingle {...x}></PublicUserSingle>
        </Box>
      ))}
    </Flex>
  );
};

const PublicUserSingle: React.FC<IUser> = ({ userName }) => {
  return (
    <Box p="4" minW="50px">
      <UserAvatar userName={userName} size="lg" />
      <TextXs textAlign="center">{userName}</TextXs>
    </Box>
  );
};
export default UserList;
