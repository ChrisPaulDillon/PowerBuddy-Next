import React from 'react';
import { Flex } from '../../chakra/Layout';
import { PageTitle } from '../common/Texts';
import UserAvatar from './UserAvatar';

interface IUserProps {
  userName: string;
}

const UserProfile: React.FC<IUserProps> = ({ userName }) => {
  return (
    <Flex justify="center" flexDir="column" align="center" py={2} pb={[5, 3, 2, 1]}>
      <UserAvatar userName={userName} />
      <PageTitle>{userName}</PageTitle>
    </Flex>
  );
};

export default UserProfile;
