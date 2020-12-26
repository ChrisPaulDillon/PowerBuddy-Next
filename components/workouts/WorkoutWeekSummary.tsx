import { Box, Flex, useColorMode } from '@chakra-ui/core';
import moment from 'moment';
import React from 'react';
import { CgArrowTopRight } from 'react-icons/cg';
import { IWorkoutDaySummary, IWorkoutExerciseSummary, IWorkoutWeekSummary } from '../../interfaces/workouts';
import PbIconButton from '../common/IconButtons';
import { PbStack } from '../common/Stacks';
import { HeadingMd, TextSm, TextXs } from '../common/Texts';
import { CardSm } from '../layout/Card';
import { CenterColumnFlex, CenterRowFlex } from '../layout/Flexes';
import { BadgeWeekNo, BadgeWorkoutName } from '../shared/Badges';
import theme from '../../theme';
import { WORKOUT_DIARY_URL } from '../util/InternalLinks';
import { useRouter } from 'next/router';

interface IProps {
  weekSummary: IWorkoutWeekSummary;
}

const WorkoutWeekSummary: React.FC<IProps> = ({ weekSummary }) => {
  return (
    <Box>
      <CenterRowFlex justify="center">
        {weekSummary?.workoutDays &&
          weekSummary?.workoutDays.map((x) => (
            <Flex flexDir="column">
              <HeadingMd textAlign="center">{moment(x.date).format('dddd')}</HeadingMd>
              <WorkoutDaySummarySingle {...x} />{' '}
            </Flex>
          ))}
      </CenterRowFlex>
    </Box>
  );
};

const WorkoutDaySummarySingle: React.FC<IWorkoutDaySummary> = ({
  workoutDayId,
  date,
  templateName,
  weekNo,
  workoutExerciseSummaries,
  hasWorkoutData,
}) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  return (
    <CardSm m={2} bg={moment(date).isSame(new Date(), 'day') ? 'gray.500' : theme.colors.cardColor[colorMode]} minW="180px" maxW="250px" minH="sm">
      <PbStack>
        <TextSm textAlign="left" isTruncated>
          {moment(date).format('DD/MM/YYYY')}
        </TextSm>
        <PbIconButton Icon={CgArrowTopRight} label="Go to Workout" onClick={() => router.push(`${WORKOUT_DIARY_URL}/${workoutDayId}`)} />
      </PbStack>
      {
        hasWorkoutData ? (
          <Box>
            <CenterRowFlex justify="center" py={2}>
              <Box px={1}>
                <BadgeWorkoutName body={`${templateName}`} />
              </Box>
              <Box px={1}>
                <BadgeWeekNo body={`Week ${weekNo}`} />
              </Box>
            </CenterRowFlex>
            <CenterColumnFlex mt={4}>
              {workoutExerciseSummaries?.map((x) => (
                <WorkoutExerciseSummary {...x} />
              ))}
            </CenterColumnFlex>
          </Box>
        ) : (
          <TextXs textAlign="center" py={4}>
            No Workout Data
          </TextXs>
        )
        /* <Box d="flex" alignItems="baseline">
        {completed ? <BadgeCompleted /> : <BadgeIncomplete />}
      </Box> */
      }
    </CardSm>
  );
};

const WorkoutExerciseSummary: React.FC<IWorkoutExerciseSummary> = ({ exerciseName, noOfSets }) => (
  <PbStack p={1}>
    <TextXs>{exerciseName}</TextXs>
    <TextXs>{noOfSets} Sets</TextXs>
  </PbStack>
);
export default WorkoutWeekSummary;
