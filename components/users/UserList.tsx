import React from 'react';
import { IUser } from 'powerbuddy-shared';
import { Box, Flex } from '../../chakra/Layout';
import UserProfileCard from '../shared/UserProfileCard';

interface IProps {
  publicUsers: IUser[];
}

const UserList: React.FC<IProps> = ({ publicUsers }) => {
  return (
    <Flex wrap="wrap" justify='center'>
      {publicUsers.map((x, idx) => (
        <Box key={idx} p={2}>
          <UserProfileCard userName={x.userName} sportType={x.sportType} gender={x.gender} liftingLevel={x.liftingLevel}/>
        </Box>
      ))}
    </Flex>
  );
};
export default UserList;
