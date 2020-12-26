import React, { useEffect, useState } from 'react';
import { PageHeader } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import SearchBar from '../shared/SearchBar';
import { GetAllUserLiftingStatsUrl } from '../../api/account/liftingStats';
import { ILiftFeed, ILiftingStatGrouped } from '../../interfaces/liftingStats';
import LiftingStatProvider from './LiftingStatContext';
import { useAxios } from '../../hooks/useAxios';
import ProgressSpinner from '../common/ProgressSpinner';
import { GetLiftFeedByUserName } from '../../api/public/liftingStat';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import LiftFeed from './LiftFeed';
import LiftingStatList from './LiftingStatList';
import { useDisclosure } from '@chakra-ui/core';
import { ModalForward } from '../common/Modals';
import { LoginModal } from '../shared/Modals';
import { WORKOUT_DIARY_URL } from '../util/InternalLinks';
import { useRouter } from 'next/router';

const LiftingStatsIndexPage = () => {
  const router = useRouter();
  const { user } = useSelector((state: IAppState) => state.state);
  const { loading, data: liftingStats, statusCode: statCode } = useAxios<ILiftingStatGrouped[]>(GetAllUserLiftingStatsUrl());
  const { loading: feedLoad, data: feedData } = useAxios<ILiftFeed[]>(GetLiftFeedByUserName(user.userName!));
  const [liftFeed, setLiftFeed] = useState<ILiftFeed[]>([]);
  const [, setSearchTerm] = useState<string>('');

  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isNoStatsOpen, onOpen: onNoStatsOpen, onClose: onNoStatsClose } = useDisclosure();
  //const filteredStats = useLiftingStatSearch(liftingStats, searchTerm);

  useEffect(() => {
    if (statCode === 401) onLoginOpen();
  }, [statCode]);

  useEffect(() => {
    if (liftingStats === undefined && !loading) {
      onNoStatsOpen();
    } else {
      onNoStatsClose();
    }
  }, [statCode, liftingStats]);

  useEffect(() => {
    if (feedData != null) setLiftFeed(feedData);
  }, [feedData]);

  if (loading || feedLoad || liftingStats === undefined) return <ProgressSpinner />;

  return (
    <CenterColumnFlex>
      <LiftingStatProvider liftingStats={liftingStats!}>
        <PageHeader size="20px">Your Personal Bests</PageHeader>
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search personal bests..." />
        <LiftFeed liftFeed={liftFeed} />
        <LiftingStatList />
      </LiftingStatProvider>
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
      {isNoStatsOpen && (
        <ModalForward
          isOpen={isNoStatsOpen}
          onClose={onNoStatsClose}
          title="No Personal Bests Recorded"
          onClick={() => router.push(WORKOUT_DIARY_URL)}
          body="Start recording workouts in the diary and you will be notified automatically when personal bests are hit!"
          actionText="Go to Diary"
        />
      )}
    </CenterColumnFlex>
  );
};

export default LiftingStatsIndexPage;
