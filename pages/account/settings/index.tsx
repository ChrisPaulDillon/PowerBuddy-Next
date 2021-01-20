import { Box, Flex, Link, useDisclosure, useToast } from '@chakra-ui/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AccountSettings from '../../../components/account/settings/AccountSettings';
import { PageTitle, TextSm } from '../../../components/common/Texts';
import { CenterColumnFlex } from '../../../components/layout/Flexes';
import { PageHeader, PageContent } from '../../../components/layout/Page';
import { LoginModal } from '../../../components/shared/Modals';
import { useUserContext } from '../../../components/users/UserContext';
import useAuthentication from '../../../hooks/useAuthentication';

const Index: NextPage = () => {
  const handleAuthentication = useAuthentication();

  const router = useRouter();
  const { user } = useUserContext();
  const { token, userId } = router.query;

  const [response, setResponse] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  useEffect(() => {
    if (!handleAuthentication) {
      onLoginOpen();
    }
  }, [handleAuthentication]);

  return (
    <Box>
      <PageHeader title="Settings" />
      <PageContent>
        <CenterColumnFlex>
          <AccountSettings />
        </CenterColumnFlex>
      </PageContent>
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
    </Box>
  );
};

export default Index;
