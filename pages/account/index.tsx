import { NextPage } from 'next';
import { Box } from '@chakra-ui/core';
import { HeadingMd, PageTitle, TextSm } from '../../components/common/Texts';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetPublicUserProfileUrl } from '../../api/public/user';
import { useAxios } from '../../hooks/useAxios';
import { IPublicUser } from '../../interfaces/users';
import { IAppState } from '../../redux/store';
import UserSettingsForm from '../../components/account/forms/EditProfileForm';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import UserAvatar from '../../components/layout/UserAvatar';
import MemberCrown from '../../components/shared/MemberCrown';
import { Error } from '../../components/common/Error';
import { PageContent, PageHeader } from '../../components/layout/Page';

const Index: NextPage = () => {
  const router = useRouter();
  const { userName } = router.query;
  const { user } = useSelector((state: IAppState) => state.state);
  const [publicUser, setPublicUser] = useState<IPublicUser>({} as IPublicUser);
  const { data, loading: requestLoading, error: requestError } = useAxios<IPublicUser>(GetPublicUserProfileUrl(userName! as string));
  const [] = useState<boolean>(false);

  useEffect(() => {
    if (data != null) setPublicUser(data);
  }, [data]);

  if (requestLoading) return <ProgressSpinner />;
  if (requestError) return <Error statusCode={404} description="User Could Not Be Found With This Username" />;

  return (
    <Box>
      <PageHeader title="Profile" />
      <PageContent>
        <CenterColumnFlex>
          <UserAvatar name={publicUser.userName!} size="lg" />
          <PageTitle>{publicUser.userName!}'s Profile </PageTitle>
          <MemberCrown memberStatusId={publicUser.memberStatusId!} mt="2" />

          {user.userName !== publicUser.userName ? (
            <CenterColumnFlex mt="3">
              {publicUser.isPublic ? (
                <CenterColumnFlex>
                  <HeadingMd>{publicUser.sportType ?? publicUser.sportType} </HeadingMd>
                  <TextSm>{publicUser.gender ?? publicUser.gender}</TextSm>
                  <TextSm>{publicUser.liftingLevel ?? publicUser.liftingLevel + 'Lifter'}</TextSm>
                </CenterColumnFlex>
              ) : (
                <HeadingMd>This users profile is not public</HeadingMd>
              )}
              {/* <LiftFeed userName={publicUser.userName!} /> */}
            </CenterColumnFlex>
          ) : (
            <UserSettingsForm />
          )}
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default Index;
