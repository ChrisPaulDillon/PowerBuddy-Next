import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, useDisclosure } from '@chakra-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetAllTemplateProgramsUrl } from '../../api/public/template';
import { ITemplateProgram } from '../../interfaces/templates';
import { TEMPLATES_URL, WORKOUT_DIARY_URL } from '../../components/util/InternalLinks';
import { ModalForward } from '../../components/common/Modals';
import { PageHeader } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { LoginModal } from '../../components/shared/Modals';
import useAuthentication from '../../hooks/useAuthentication';
import { GetWorkoutWeekWithDateUrl } from '../../api/account/workoutLog';
import { useAxios } from '../../hooks/useAxios';
import { IWorkoutWeekSummary } from '../../interfaces/workouts';
import WorkoutWeekSummary from '../../components/workouts/WorkoutWeekSummary';
import MCalendar from '../../components/common/MCalendar';
import ProgressSpinner from '../../components/common/ProgressSpinner';

const Index: NextPage = () => {
  useAuthentication();
  const router = useRouter();
  const { date } = router.query;

  const { data: weekData, loading: weekLoading } = useAxios<IWorkoutWeekSummary>(GetWorkoutWeekWithDateUrl(date as string));

  const [selectedDate, handleDateChange] = useState(new Date());

  const [, setTemplates] = useState<ITemplateProgram[]>([]);

  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isNoDiaryOpen, onClose: onNoDiaryClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(GetAllTemplateProgramsUrl());
        setTemplates(data && data.data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    router.push(`${WORKOUT_DIARY_URL}?date=${selectedDate.toISOString()}`);
  }, [selectedDate]);

  if (weekLoading) return <ProgressSpinner />;

  return (
    <Box>
      <PageHeader>Diary</PageHeader>
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
    </Box>
  );
};

export default Index;
