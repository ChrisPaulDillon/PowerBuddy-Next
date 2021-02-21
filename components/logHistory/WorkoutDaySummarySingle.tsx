import React from 'react';
import { TextSm, TextXs } from '../common/Texts';
import { CardSm } from '../layout/Card';
import moment from 'moment';
import { IWorkoutDaySummary } from 'powerbuddy-shared';
import { Box, Flex } from '../../chakra/Layout';
import { TagPersonalBest } from '../../shared/layout/Tags';

const WorkoutDaySummarySingle: React.FC<IWorkoutDaySummary> = ({ date, personalBestCount, workoutExerciseSummaries }) => {
  return (
    <CardSm p={4}>
      <TextSm>{moment(date).format('DD/MM/YYYY')}</TextSm>
      <Box py={1}>
        <TagPersonalBest body={`${personalBestCount} PBs`} />
      </Box>
      {workoutExerciseSummaries?.map((x, idx) => (
        <Flex key={idx}>
          <TextXs>{x.exerciseName}</TextXs>
          <TextXs>{x.noOfSets}</TextXs>
        </Flex>
      ))}
    </CardSm>
  );
};

export default WorkoutDaySummarySingle;
