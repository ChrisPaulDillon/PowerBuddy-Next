import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { IWorkoutDay } from 'powerbuddy-shared';
import WorkoutProvider from '../../components/workouts/WorkoutContext';
import { PageContent, PageHead } from '../../components/layout/Page';
import { Box } from '../../chakra/Layout';
import { GetAllPublicWorkoutIdsRequest, GetWorkoutDayByIdRequest } from '../../api/public/workoutDay';
import { useUserContext } from '../../components/users/UserContext';
import WorkoutDay from '../../components/workouts/WorkoutDayContainer';
import { useAppDispatch } from '../../store/index';
import {setWorkout} from '../../components/workouts/store/workoutState';

interface IProps {
  workoutDayData: IWorkoutDay;
}

const WorkoutDayById: NextPage<IProps> = ({ workoutDayData }) => {
  const { userId } = useUserContext();
  const [contentDisabled, setContentDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (workoutDayData) {
      dispatch(setWorkout(workoutDayData));
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
    <Box>
      <PageHead
        title="Workout"
        description={`${workoutDayData?.userName}'s workout diary. View ${workoutDayData?.userName}'s workout for this date`}
        keywords={`${workoutDayData?.userName}, Workout Diary, PowerBuddy, Weightlifting App, Strong App, Intensity App, Powerlifting Weightlifting Templates, Liftvault Workout Program Spreadsheets, Powerlifting Routine, Olympic Weightlifting Template`}
      />
        <PageContent>
          <WorkoutDay  />
        </PageContent>
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
