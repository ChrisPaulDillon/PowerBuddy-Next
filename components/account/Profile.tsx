import React, { useEffect, useState } from 'react';
import { CenterColumnFlex } from '../layout/Flexes';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from '../../redux/store';
import UserAvatar from '../layout/UserAvatar';
import { HeadingMd, PageHeader, TextSm, TextXs } from '../common/Texts';
import { PbPrimaryButton } from '../common/Buttons';
import UserSettingsForm from './forms/EditProfileForm';
import { sendFriendRequest } from '../../redux/area/account/friendsListActions';
import { Box, Flex, useToast } from '@chakra-ui/core';
import MemberCrown from '../shared/MemberCrown';
import { IPublicUser } from '../../interfaces/users';
import { GetPublicUserProfileUrl } from '../../api/public/user';
import { useAxios } from '../../hooks/useAxios';
import ProgressSpinner from '../common/ProgressSpinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SendFriendRequestUrl, SendFriendResponseUrl } from '../../api/account/friendsList';
import { Error } from '../common/Error';

export enum FriendStatus {
  PendingTo,
  PendingFrom,
  None,
}

const ProfileIndexPage = () => {
  //@ts-ignore
  const { userName } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [friendStatus, setFriendStatus] = useState<FriendStatus>(FriendStatus.None);

  const { user } = useSelector((state: IAppState) => state.state);
  const { userFriendsList } = useSelector((state: IAppState) => state.state);
  const [publicUser, setPublicUser] = useState<IPublicUser>({} as IPublicUser);
  const { data, loading: requestLoading, error: requestError, statusCode } = useAxios<IPublicUser>(GetPublicUserProfileUrl(userName));
  const [isOnFriendsList, setIsOnFriendsList] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if (data != null) setPublicUser(data);
  }, [data]);

  useEffect(() => {
    if (publicUser) {
      if (publicUser.pendingFriendRequestFrom) {
        setFriendStatus(FriendStatus.PendingFrom);
      } else if (publicUser.pendingFriendRequestTo) {
        setFriendStatus(FriendStatus.PendingTo);
      }
    }
  }, [publicUser]);

  useEffect(() => {
    setIsOnFriendsList(userFriendsList!.some((x) => x.userName === publicUser.userName));
  }, [publicUser]);

  if (requestLoading) return <ProgressSpinner />;
  if (requestError) return <Error statusCode={404} description="User Could Not Be Found With This Username" />;

  const sendFriendRequest = async () => {
    setLoading(true);
    try {
      await axios.put(SendFriendRequestUrl(publicUser.userId!));
      toast({
        title: 'Success',
        description: 'Successfully Sent Friend Request',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could Not Send Friend Request',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoading(false);
  };

  const sendFriendResponse = async () => {
    setLoading(true);
    try {
      await axios.put(SendFriendResponseUrl(publicUser.userId!));
      toast({
        title: 'Success',
        description: 'Successfully Accepted Request',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not send friend response',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoading(false);
  };

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

          <Box mt="4">
            {isOnFriendsList ? (
              <TextSm color="green.500">You are currently friends with {publicUser.userName!}</TextSm>
            ) : (
              {
                [FriendStatus.PendingFrom]: (
                  <CenterColumnFlex>
                    <PbPrimaryButton loading={loading} onClick={() => sendFriendResponse()}>
                      Accept
                    </PbPrimaryButton>
                    <TextXs mt="2">{publicUser.userName!} added you as a friend</TextXs>
                  </CenterColumnFlex>
                ),
                [FriendStatus.PendingTo]: (
                  <CenterColumnFlex>
                    <PbPrimaryButton loading={loading} isDisabled={true}>
                      Requested
                    </PbPrimaryButton>
                    <TextXs mt="2">You have requested to be friends</TextXs>
                  </CenterColumnFlex>
                ),
                [FriendStatus.None]: (
                  <CenterColumnFlex>
                    <PbPrimaryButton loading={loading} onClick={() => sendFriendRequest()}>
                      Add Friend
                    </PbPrimaryButton>
                  </CenterColumnFlex>
                ),
              }[friendStatus]
            )}
          </Box>
          {/* <LiftFeed userName={publicUser.userName!} /> */}
        </CenterColumnFlex>
      ) : (
        <UserSettingsForm />
      )}
    </CenterColumnFlex>
  );
};

export default ProfileIndexPage;
