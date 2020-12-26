import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { GetAllActiveUserProfilesUrl } from '../../api/public/user';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { PageHeader } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import UserList from '../../components/users/UserList';
import { useAxios } from '../../hooks/useAxios';
import { IUser } from '../../interfaces/users';

const Index: NextPage = () => {
  const { loading, data } = useAxios<IUser[]>(GetAllActiveUserProfilesUrl());
  const [publicUsers, setPublicUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data != null) setPublicUsers(data);
  }, [data]);

  if (loading) return <ProgressSpinner />;

  return (
    <Box>
      <CenterColumnFlex>
        <PageHeader Icon={FaUserFriends}>Users</PageHeader>
        <UserList publicUsers={publicUsers} />
      </CenterColumnFlex>
    </Box>
  );
};

export default Index;
