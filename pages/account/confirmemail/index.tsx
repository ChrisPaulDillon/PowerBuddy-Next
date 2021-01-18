import { Box, Flex, Link, useToast } from '@chakra-ui/core';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { VerifyEmailUrl } from '../../../api/account/user';
import { SendEmailConfirmationUrl } from '../../../api/public/email';
import ProgressSpinner from '../../../components/common/ProgressSpinner';
import { PageTitle, TextSm } from '../../../components/common/Texts';
import { CenterColumnFlex } from '../../../components/layout/Flexes';
import { PageContent, PageHeader } from '../../../components/layout/Page';

const Index: NextPage = () => {
  const router = useRouter();
  const { token, userId } = router.query;

  const [response, setResponse] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    const verifyEmail = async (): Promise<void> => {
      if (userId && token) {
        try {
          const response = await axios.post(VerifyEmailUrl(userId! as string), { token: token.toString().replace(/\s+/g, '+') });
          if (response.data) {
            setResponse(true);
          }
        } catch (err) {
          setResponse(false);
        }
      }
    };
    verifyEmail();
    setLoading(false);
  }, [userId, token]);

  const sendEmailConfirmation = async () => {
    try {
      const response = await axios.post(SendEmailConfirmationUrl(userId! as string));
      toast({
        title: 'Success',
        description: 'Successfully Sent Email. Please Check Your Inbox',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {}
  };

  if (loading) return <ProgressSpinner />;

  if (userId == null || token == null)
    return (
      <Box>
        <PageHeader title="Confirm Email" />
        <PageContent>
          <CenterColumnFlex>
            <PageTitle>Error. You have followed an invalid link</PageTitle>
          </CenterColumnFlex>
        </PageContent>
      </Box>
    );

  if (response)
    return (
      <Box>
        <PageHeader title="Confirm Email" />
        <PageContent>
          <CenterColumnFlex>
            <PageTitle>Email Successfully Confirmed</PageTitle>
            <PageContent>
              <TextSm>You may now login</TextSm>
            </PageContent>
          </CenterColumnFlex>
        </PageContent>
      </Box>
    );

  return (
    <Box>
      <PageHeader title="Confirm Email" />
      <PageContent>
        <CenterColumnFlex>
          <PageTitle>Error! Token has expired!</PageTitle>
          <Flex>
            <TextSm px={1}>You can request</TextSm>
            <Link onClick={async () => await sendEmailConfirmation()}>
              <TextSm color="blue.500">another email confirmation</TextSm>
            </Link>
          </Flex>
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default Index;