import { Box, useDisclosure, useToast } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { GetWorkoutWeekWithDateUrl } from '../api/account/workoutLog';
import MCalendar from '../components/common/MCalendar';
import ProgressSpinner from '../components/common/ProgressSpinner';
import { CenterColumnFlex } from '../components/layout/Flexes';
import { PageContent, PageHead } from '../components/layout/Page';
import { LoginModal } from '../components/shared/Modals';
import WorkoutWeekSummary from '../components/workouts/WorkoutWeekSummary';
import { useAxios } from '../hooks/useAxios';
import { IWorkoutWeekSummary } from 'powerbuddy-shared';
import { NextPage } from 'next';
import { withAuthorized } from '../util/authMiddleware';

const Index: NextPage = () => {
  const router = useRouter();
  const { date } = router.query;

  const { data: weekData, loading: weekLoading } = useAxios<IWorkoutWeekSummary>(GetWorkoutWeekWithDateUrl(date as string));

  const [selectedDate, handleDateChange] = useState(new Date());

  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  useEffect(() => {
    router.push(`?date=${selectedDate.toISOString()}`);
  }, [selectedDate]);

  if (weekLoading) return <ProgressSpinner />;

  return (
    <Box>
      <PageHead title="Diary" description="PowerBuddy's workout diary for powerlifters, weightlifters and gym enthusiasts">
        Diary
      </PageHead>
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
      </PageContent>
    </Box>
  );
};

export default withAuthorized(Index);
