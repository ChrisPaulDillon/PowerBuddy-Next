import { Link, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { VerifyEmailUrl } from '../../../api/account/auth';
import { SendEmailConfirmationUrl } from '../../../api/public/email';
import { Box, Flex } from '../../../chakra/Layout';
import ProgressSpinner from '../../../components/common/ProgressSpinner';
import { PageTitle, TextSm } from '../../../components/common/Texts';
import { CenterColumnFlex } from '../../../components/layout/Flexes';
import { PageContent, PageHead } from '../../../components/layout/Page';
import { ToastSuccess } from '../../../components/shared/Toasts';

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
      toast(ToastSuccess('Success', 'Successfully Sent Email. Please Check Your Inbox'));
    } catch (error) {}
  };

  if (loading) return <ProgressSpinner />;

  if (userId == null || token == null)
    return (
      <Box>
        <PageHead title="Confirm Email" description="Confirm your email address to grant full access to your account" />
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
        <PageHead title="Confirm Email" description="Confirm your email address to grant full access to your account" />
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
      <PageHead title="Confirm Email" description="Confirm your email address to grant full access to your account" />
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
