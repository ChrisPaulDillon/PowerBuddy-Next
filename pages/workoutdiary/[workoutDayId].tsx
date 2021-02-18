import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { IWorkoutDay } from 'powerbuddy-shared';
import WorkoutProvider from '../../components/workouts/WorkoutContext';
import { PageContent, PageHead } from '../../components/layout/Page';
import { Box } from '../../chakra/Layout';
import { GetAllPublicWorkoutIdsRequest, GetWorkoutDayByIdRequest } from '../../api/public/workoutDay';
import { useUserContext } from '../../components/users/UserContext';
import WorkoutDay from '../../components/workouts/WorkoutDay';

interface IProps {
  workoutDayData: IWorkoutDay;
}

const WorkoutDayById: NextPage<IProps> = ({ workoutDayData }) => {
  const { userId } = useUserContext();
  const [workoutDay, setWorkoutDay] = useState<IWorkoutDay>(workoutDayData);
  const [contentDisabled, setContentDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (workoutDayData) {
      setWorkoutDay(workoutDayData);
    }
  }, [workoutDayData]);

  useEffect(() => {
    if (workoutDayData) {
      if (workoutDayData?.userId !== userId) {
        setContentDisabled(true);
      } else {
        setContentDisabled(false);
      }
    }
  }, [workoutDayData, userId]);

  return (
    <Box w="100%" mt={3}>
      <PageHead
        title="Workout"
        description={`${workoutDay?.userName}'s workout diary. View ${workoutDay?.userName}'s workout for this date`}
        keywords={`${workoutDay?.userName}, Workout Diary, PowerBuddy, Weightlifting App, Strong App, Intensity App, Powerlifting Weightlifting Templates, Liftvault Workout Program Spreadsheets, Powerlifting Routine, Olympic Weightlifting Template`}
      />
      <WorkoutProvider workoutDay={workoutDay} setWorkoutDay={setWorkoutDay} contentDisabled={contentDisabled}>
        <PageContent>
          <WorkoutDay workoutDay={workoutDay} />
        </PageContent>
      </WorkoutProvider>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await GetAllPublicWorkoutIdsRequest();

  const paths = res?.data.map((workoutDayId) => ({
    params: { workoutDayId: workoutDayId.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workoutDayId = params.workoutDayId as string;
  const res = await GetWorkoutDayByIdRequest(parseInt(workoutDayId));

  return { props: { workoutDayData: res.data } };
};

export default WorkoutDayById;
