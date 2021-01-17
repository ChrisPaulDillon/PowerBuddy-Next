import { Box, Flex, Link, useToast } from '@chakra-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AccountSettings from '../../../components/account/settings/AccountSettings';
import { PageTitle, TextSm } from '../../../components/common/Texts';
import { CenterColumnFlex } from '../../../components/layout/Flexes';
import { PageHeader, PageContent } from '../../../components/layout/Page';

const Index: NextPage = () => {
  const router = useRouter();
  const { token, userId } = router.query;

  const [response, setResponse] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

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

export default Index;
