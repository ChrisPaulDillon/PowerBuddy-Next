import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { IUser } from 'powerbuddy-shared/lib';
import React from 'react';
import { GetLoggedInUsersProfileUrl } from '../../../api/account/user';
import AccountSettings from '../../../components/account/settings/AccountSettings';
import { CenterColumnFlex } from '../../../components/layout/Flexes';
import { PageHead, PageContent } from '../../../components/layout/Page';
import { useAxios } from '../../../hooks/useAxios';
import { withAuthorized } from '../../../util/authMiddleware';

const Index: NextPage = () => {
  const { loading, data: user, statusCode: statCode } = useAxios<IUser>(GetLoggedInUsersProfileUrl());

  return (
    <Box>
      <PageHead title="Settings" description="PowerBuddy modify your settings, switch from kilogram to pounds and update personal info" />
      <PageContent>
        <CenterColumnFlex>
          <AccountSettings user={user} />
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default withAuthorized(Index);
