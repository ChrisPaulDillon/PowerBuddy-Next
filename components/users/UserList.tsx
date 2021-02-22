import React from 'react';
import { IUser } from 'powerbuddy-shared';
import { Box, Flex } from '../../chakra/Layout';
import UserProfileCard from '../../shared/layout/UserProfileCard';
interface IProps {
  publicUsers: IUser[];
}

const UserList: React.FC<IProps> = ({ publicUsers }) => {
  return (
    <Flex wrap="wrap" justify="center">
      {publicUsers.map((x, idx) => (
        <Box key={idx} p={2}>
          <UserProfileCard user={x} />
        </Box>
      ))}
    </Flex>
  );
};
export default UserList;
