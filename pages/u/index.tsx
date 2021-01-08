import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { GetAllActiveUserProfilesUrl } from '../../api/public/user';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { PageTitle } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { PageContent, PageHeader } from '../../components/layout/Page';
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
      <PageHeader title="Active Users" />
      <PageContent>
        <CenterColumnFlex>
          <PageTitle>Users</PageTitle>
          <UserList publicUsers={publicUsers} />
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default Index;
