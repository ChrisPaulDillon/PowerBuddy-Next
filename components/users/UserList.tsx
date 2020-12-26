import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import UserAvatar from '../layout/UserAvatar';
import { Box, Flex } from '@chakra-ui/core';
import { IUser, IFriendsListAssoc } from '../../interfaces/users';
import { TextSm } from '../common/Texts';
import { TextXs } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';

interface IProps {
  publicUsers: IUser[];
}

const UserList: React.FC<IProps> = ({ publicUsers }) => {
  const { userFriendsList } = useSelector((state: IAppState) => state.state);
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
