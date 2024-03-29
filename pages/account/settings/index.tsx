import { NextPage } from 'next';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useEffect, useState } from 'react';
import { GetLoggedInUsersProfileUrl } from '../../../api/account/user';
import { Box } from '../../../chakra/Layout';
import AccountSettings from '../../../components/account/settings/AccountSettings';
import ProgressSpinner from '../../../components/common/ProgressSpinner';
import { CenterColumnFlex } from '../../../components/layout/Flexes';
import { PageHead, PageContent } from '../../../components/layout/Page';
import { useAxios } from '../../../hooks/useAxios';
import { withAuthorized } from '../../../util/authMiddleware';

const Index: NextPage = () => {
  const { loading, data: user, statusCode: statCode } = useAxios<IUser>(GetLoggedInUsersProfileUrl());
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    setUserData(user);
  }, [user]);

  console.log(user);

  if (loading) return <ProgressSpinner />;

  return (
    <Box>
      <PageHead
        title="Settings"
        description="PowerBuddy modify your settings, switch from kilogram to pounds and update personal info"
        keywords={`Workout Diary, PowerBuddy, Weightlifting App, Strong App, Intensity App, Powerlifting Weightlifting Templates, Liftvault Workout Program Spreadsheets, Powerlifting Routine, Olympic Weightlifting Template`}
      />
      <PageContent>
        <CenterColumnFlex>
          <AccountSettings user={userData} />
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default withAuthorized(Index);
