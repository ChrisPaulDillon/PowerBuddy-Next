import { Box, useDisclosure } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { GetWorkoutWeekWithDateUrl } from '../api/account/workoutLog';
import MCalendar from '../components/common/MCalendar';
import { ModalForward } from '../components/common/Modals';
import ProgressSpinner from '../components/common/ProgressSpinner';
import { CenterColumnFlex } from '../components/layout/Flexes';
import { PageContent, PageHeader } from '../components/layout/Page';
import { LoginModal } from '../components/shared/Modals';
import { TEMPLATES_URL } from '../InternalLinks';
import WorkoutWeekSummary from '../components/workouts/WorkoutWeekSummary';
import { useAxios } from '../hooks/useAxios';
import { IWorkoutWeekSummary } from 'powerbuddy-shared';
import useAuthentication from '../hooks/useAuthentication';
import { NextPage } from 'next';
import { useUserContext } from '../components/users/UserContext';
import { withAuthorized } from '../util/authMiddleware';

const Index: NextPage = () => {
  const router = useRouter();
  const { date } = router.query;

  const { data: weekData, loading: weekLoading, error: weekError } = useAxios<IWorkoutWeekSummary>(GetWorkoutWeekWithDateUrl(date as string));

  const [selectedDate, handleDateChange] = useState(new Date());

  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isNoDiaryOpen, onClose: onNoDiaryClose } = useDisclosure();

  useEffect(() => {
    router.push(`?date=${selectedDate.toISOString()}`);
  }, [selectedDate]);

  if (weekLoading) return <ProgressSpinner />;

  return (
    <Box>
      <PageHeader title="Diary">Diary</PageHeader>
      <PageContent>
        <Box mt={5} w="100%">
          <CenterColumnFlex pb={4}>
            <MCalendar selectedDate={selectedDate} handleDateChange={handleDateChange} />
          </CenterColumnFlex>
          <WorkoutWeekSummary weekSummary={weekData!} />
          {/* {workoutWeek && workoutWeek.map((x) => <WorkoutDay workoutDay={x} />)} */}
          {/* {SCREEN_MOBILE && Object.keys(programLogWeek).length !== 0 && (
            <ProgramLogWeek weekNo={weekNo} onLeftClick={handleWeekNoLeftClick} onRightClick={handleWeekNoRightClick}>
              <Swiper effect="cube">
                {programLogWeek.programLogDays.map((pld) => (
                  <SwiperSlide key={pld.programLogDayId!}>
                    <ProgramLogDay key={pld.programLogDayId} programLogDay={pld} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </ProgramLogWeek>
          )}
          {SCREEN_DESKTOP && programLogWeek?.programLogDays && (
            <ProgramLogWeekTab
              programLogDays={programLogWeek?.programLogDays!}
              weekNo={weekNo}
              onLeftClick={handleWeekNoLeftClick}
              onRightClick={handleWeekNoRightClick}
            />
          )} */}
        </Box>
        {/* {isExtendOpen && (
        <ModalBackForward
          isOpen={isExtendOpen}
          onClose={onExtendClose}
          title="End of Program Reached"
          body="Would you like to extend this program another week?"
          onBackClick={onExtendClose}
          onForwardClick={() => (())}
          //onForwardClick={handleModalForwardClick}
          backText="Return to Diary"
          forwardText="Add Week"
          loading={addWeekLoading}
        />
      )} */}
        {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
        {isNoDiaryOpen && (
          <ModalForward
            isOpen={isNoDiaryOpen}
            onClose={onNoDiaryClose}
            title="No Active Diary 😨"
            onClick={() => router.push(TEMPLATES_URL)}
            body="You do not currently have an active diary, you can create one by visiting the templates section"
            actionText="Go to Program Templates"
          />
        )}
      </PageContent>
    </Box>
  );
};

export default withAuthorized(Index);
