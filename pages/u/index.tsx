import { Box } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { GetAllActiveUserProfilesUrl } from '../../api/public/user';
import { PageTitle } from '../../components/common/Texts';
import { PageContent, PageHead } from '../../components/layout/Page';
import UserList from '../../components/users/UserList';
import { IUser } from 'powerbuddy-shared';
import axios from 'axios';

interface IProps {
  users: IUser[];
}

const Index: NextPage<IProps> = ({ users }) => {
  return (
    <Box>
      <PageHead
        title="Active Users"
        description="View PowerBuddy powerlifting members and view personal bests"
        keywords={`PowerBuddy Diary, Workout Diary, PowerBuddy, Weightlifting App, Strong App, Intensity App, Powerlifting Weightlifting Templates, Liftvault Workout Program Spreadsheets, Powerlifting Routine, Olympic Weightlifting Template`}
      />
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
