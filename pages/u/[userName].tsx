import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { HeadingMd, PageTitle, TextSm } from '../../components/common/Texts';
import React from 'react';
import { GetAllActiveUserProfilesUrl, GetPublicUserProfileUrl } from '../../api/public/user';
import { IPublicUser } from 'powerbuddy-shared';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import UserAvatar from '../../components/layout/UserAvatar';
import MemberCrown from '../../components/shared/MemberCrown';
import { PageContent, PageHead } from '../../components/layout/Page';
import axios from 'axios';
import { Box } from '../../chakra/Layout';

interface IUserProfileProps {
  publicUser: IPublicUser;
}

const UserProfile: NextPage<IUserProfileProps> = ({ publicUser }) => {
  return (
    <Box>
      <PageHead
        title={publicUser?.userName}
        description={`View ${publicUser?.userName} on PowerBuddy, the best App for Weightlifting & PowerLifting`}
        keywords={`${publicUser?.userName}, Workout Diary, PowerBuddy, Weightlifting App, Strong App, Intensity App, Powerlifting Weightlifting Templates, Liftvault Workout Program Spreadsheets, Powerlifting Routine, Olympic Weightlifting Template`}
      />
      <PageContent>
        <CenterColumnFlex>
          <UserAvatar userName={publicUser?.userName} size="lg" />
          <PageTitle>{publicUser?.userName}'s Profile </PageTitle>
          <MemberCrown memberStatusId={publicUser?.memberStatusId} />
          <CenterColumnFlex mt={2}>
            {publicUser?.isPublic ? (
              <CenterColumnFlex>
                {publicUser?.sportType && <HeadingMd>{publicUser.sportType} </HeadingMd>}
                {publicUser?.gender && <TextSm>{publicUser.gender}</TextSm>}
                {publicUser?.liftingLevel && <TextSm>{publicUser.liftingLevel + 'Lifter'}</TextSm>}
              </CenterColumnFlex>
            ) : (
              <HeadingMd>This users profile is not public</HeadingMd>
            )}
          </CenterColumnFlex>
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get<IPublicUser[]>(GetAllActiveUserProfilesUrl());

  const paths = res.data.map((user) => ({
    params: { userName: user.userName },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios.get<IPublicUser>(GetPublicUserProfileUrl(params.userName as string));

  return { props: { publicUser: res.data } };
};

export default UserProfile;
