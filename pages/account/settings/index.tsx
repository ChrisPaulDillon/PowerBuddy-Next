import { Box } from '@chakra-ui/core';
import { NextPage } from 'next';
import React from 'react';
import AccountSettings from '../../../components/account/settings/AccountSettings';
import { CenterColumnFlex } from '../../../components/layout/Flexes';
import { PageHeader, PageContent } from '../../../components/layout/Page';
import { withAuthorized } from '../../../util/authMiddleware';

const Index: NextPage = () => {
  return (
    <Box>
      <PageHeader title="Settings" />
      <PageContent>
        <CenterColumnFlex>
          <AccountSettings />
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default withAuthorized(Index);
