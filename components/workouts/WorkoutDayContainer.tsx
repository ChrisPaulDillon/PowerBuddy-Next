import { Box } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { BreadcrumbBase, IBreadcrumbInput } from '../common/Breadcrumbs';
import { PbStack } from '../common/Stacks';
import { HeadingMd } from '../common/Texts';
import { CardNoShadow } from '../layout/Card';
import { BadgeWorkoutName } from '../../shared/layout/Badges';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../store/index';
import WorkoutDayBar from './WorkoutDayBar';
import SharedDialogs from './dialogs/SharedDialogs';
import WorkoutExerciseList from './workoutExercises/WorkoutExerciseList';

interface IProps {}

const WorkoutDayContainer: React.FC<IProps> = () => {
  const workoutDay = useAppSelector((state) => state.workout?.workoutState?.workoutDay);

  const [] = useState<boolean>(workoutDay?.comment != null ? true : false);

  const [dateHighlighted] = useState<boolean>(moment(workoutDay?.date).isSame(new Date(), 'day') ? true : false);

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: WORKOUT_DIARY_URL, name: 'Workout Diary' },
    { href: '#', name: dateHighlighted ? 'Todays Workout' : moment(workoutDay.date).format('dddd Do MMM') },
  ];

  const { register, handleSubmit, formState } = useForm();

  return (
    <Box>
      <BreadcrumbBase values={breadcrumbInput} />
      {workoutDay?.userName && <HeadingMd mt={[7, 7, 0, 0]}>{workoutDay?.userName}'s Diary</HeadingMd>}
      <CardNoShadow borderWidth="0.5px" minH="250px" w="100%" p="2" my="5">
        <PbStack mb={1} w="100%">
          <WorkoutDayBar />
          <BadgeWorkoutName body={workoutDay?.templateName} />
        </PbStack>
        <Box p="2">
          <WorkoutExerciseList />
        </Box>
      </CardNoShadow>
      <SharedDialogs />
    </Box>
  );
};

export default WorkoutDayContainer;
