import { Box } from '@chakra-ui/core';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { GetAllActiveUserProfilesUrl } from '../../api/public/user';
import { PageTitle } from '../../components/common/Texts';
import { PageContent, PageHead } from '../../components/layout/Page';
import UserList from '../../components/users/UserList';
import { IUser } from 'powerbuddy-shared';
import axios from 'axios';

const Index: NextPage = ({ users }: any) => {
  return (
    <Box>
      <PageHead title="Active Users" description="View PowerBuddy powerlifting members and view personal bests" />
      <PageContent>
        <PageTitle>Users</PageTitle>
        <UserList publicUsers={users} />
      </PageContent>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get<IUser[]>(GetAllActiveUserProfilesUrl());

  return {
    props: {
      users: response.data,
    },
  };
};

export default Index;
