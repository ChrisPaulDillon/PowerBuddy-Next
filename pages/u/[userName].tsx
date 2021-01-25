import { NextPage } from 'next';
import { Box } from '@chakra-ui/core';
import { HeadingMd, PageTitle, TextSm } from '../../components/common/Texts';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { GetPublicUserProfileUrl } from '../../api/public/user';
import { useAxios } from '../../hooks/useAxios';
import { IPublicUser } from 'powerbuddy-shared';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import UserAvatar from '../../components/layout/UserAvatar';
import MemberCrown from '../../components/shared/MemberCrown';
import { Error } from '../../components/common/Error';
import { PageContent, PageHead } from '../../components/layout/Page';
import { useUserContext } from '../../components/users/UserContext';

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { userName } = router.query;
  const { user } = useUserContext();
  const [publicUser, setPublicUser] = useState<IPublicUser>({} as IPublicUser);
  const { data, loading: requestLoading } = useAxios<IPublicUser>(GetPublicUserProfileUrl(userName! as string));
  const [] = useState<boolean>(false);

  useEffect(() => {
    if (data != null) setPublicUser(data);
  }, [data]);

  if (requestLoading) return <ProgressSpinner />;
  // if (requestError) return <Error statusCode={404} description="User Could Not Be Found With This Username" />;

  if (Object.keys(user).length === 0) return <Error statusCode={404} description="No User Found under this username" />;
  return (
    <Box>
      <PageHead title="Profile" description="View PowerBuddy weightlifting powerlifting profiles" />
      <PageContent>
        <CenterColumnFlex>
          <UserAvatar name={publicUser.userName!} size="lg" />
          <PageTitle>{publicUser.userName!}'s Profile </PageTitle>
          <MemberCrown memberStatusId={publicUser.memberStatusId!} />
          <CenterColumnFlex mt={2}>
            {publicUser.isPublic ? (
              <CenterColumnFlex>
                {publicUser?.sportType && <HeadingMd>{publicUser.sportType} </HeadingMd>}
                {publicUser?.gender && <TextSm>{publicUser.gender}</TextSm>}
                {publicUser?.liftingLevel && <TextSm>{publicUser.liftingLevel + 'Lifter'}</TextSm>}
              </CenterColumnFlex>
            ) : (
              <HeadingMd>This users profile is not public</HeadingMd>
            )}
            {/* <LiftFeed userName={publicUser.userName!} /> */}
          </CenterColumnFlex>
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default UserProfile;
