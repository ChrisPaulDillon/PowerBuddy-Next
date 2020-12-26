import React, { useEffect, useState } from 'react';
import { CenterColumnFlex } from '../layout/Flexes';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import UserAvatar from '../layout/UserAvatar';
import { HeadingMd, PageHeader, TextSm } from '../common/Texts';
import UserSettingsForm from './forms/EditProfileForm';
import MemberCrown from '../shared/MemberCrown';
import { IPublicUser } from '../../interfaces/users';
import { GetPublicUserProfileUrl } from '../../api/public/user';
import { useAxios } from '../../hooks/useAxios';
import ProgressSpinner from '../common/ProgressSpinner';
import { Error } from '../common/Error';
import { useRouter } from 'next/router';

const ProfileIndexPage = () => {
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
    <CenterColumnFlex>
      <UserAvatar name={publicUser.userName!} size="lg" />
      <PageHeader>{publicUser.userName!}'s Profile </PageHeader>
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
  );
};

export default ProfileIndexPage;
