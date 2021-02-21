import { useColorMode, theme, Box } from '@chakra-ui/react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { IWorkoutDaySummary } from 'powerbuddy-shared/lib';
import React from 'react';
import { CgArrowTopRight } from 'react-icons/cg';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { BadgeWorkoutName, BadgeWeekNo } from '../../shared/layout/Badges';
import TTIconButton from '../common/IconButtons';
import { PbStack } from '../common/Stacks';
import { TextSm, TextXs } from '../common/Texts';
import { CardSm } from '../layout/Card';
import { CenterRowFlex, CenterColumnFlex } from '../layout/Flexes';
import WorkoutExerciseSummary from './WorkoutExerciseSummary';

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
    <CardSm
      m={2}
      bg={moment(date).isSame(new Date(), 'day') ? theme.colors.cardHighlightColor[colorMode] : theme.colors.cardColor[colorMode]}
      minW="180px"
      maxW="250px"
      minH="sm">
      <PbStack>
        <TextSm textAlign="left" isTruncated>
          {moment(date).format('DD/MM/YYYY')}
        </TextSm>
        <TTIconButton Icon={CgArrowTopRight} label="Go to Workout" onClick={async () => router.push(`${WORKOUT_DIARY_URL}/${workoutDayId}`)} />
      </PbStack>
      {
        hasWorkoutData ? (
          <Box>
            <CenterRowFlex justify="center" py={2}>
              {templateName && (
                <Box px={1}>
                  <BadgeWorkoutName body={`${templateName}`} />
                </Box>
              )}
              {weekNo !== 0 && (
                <Box px={1}>
                  <BadgeWeekNo body={`Week ${weekNo}`} />
                </Box>
              )}
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

export default WorkoutDaySummarySingle;
