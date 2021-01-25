import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { GetAllActiveUserProfilesUrl } from '../../api/public/user';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { PageTitle } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { PageContent, PageHead } from '../../components/layout/Page';
import UserList from '../../components/users/UserList';
import { useAxios } from '../../hooks/useAxios';
import { IUser } from 'powerbuddy-shared';

const Index: NextPage = () => {
  const { loading, data } = useAxios<IUser[]>(GetAllActiveUserProfilesUrl());
  const [publicUsers, setPublicUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data != null) setPublicUsers(data);
  }, [data]);

  if (loading) return <ProgressSpinner />;

  return (
    <Box>
      <PageHead title="Active Users" description="View PowerBuddy powerlifting members and view personal bests" />
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
