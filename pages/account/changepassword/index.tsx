import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import ChangePasswordForm from '../../../components/account/forms/ChangePasswordForm';
import { PageTitle } from '../../../components/common/Texts';
import { CenterColumnFlex } from '../../../components/layout/Flexes';
import { PageContent, PageHeader } from '../../../components/layout/Page';

const Index: NextPage = () => {
  const router = useRouter();
  const { token, userId } = router.query;

  return (
    <Box>
      <PageHeader title="Change Password" />
      <PageContent>
        <CenterColumnFlex>
          <PageTitle>Change Password</PageTitle>
          <ChangePasswordForm token={token as string} userId={userId as string} />
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default Index;