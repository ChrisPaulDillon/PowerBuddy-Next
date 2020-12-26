import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { TextSm, TextXs } from '../common/Texts';
import { IWorkoutDaySummary } from '../../interfaces/programLogs';
import { CardSm } from '../layout/Card';
import moment from 'moment';
import { TagPersonalBest } from '../shared/Tags';

const WorkoutDaySummarySingle: React.FC<IWorkoutDaySummary> = ({ date, personalBestCount, workoutExerciseSummaries }) => {
  return (
    <CardSm p={4}>
      <TextSm>{moment(date).format('DD/MM/YYYY')}</TextSm>
      <Box py={1}>
        <TagPersonalBest body={`${personalBestCount} PBs`} />
      </Box>
      {workoutExerciseSummaries!.map((x, idx) => (
        <Flex key={idx}>
          <TextXs>{x.ExerciseName}</TextXs>
          <TextXs>{x.NoOfSets}</TextXs>
        </Flex>
      ))}
    </CardSm>
  );
};

export default WorkoutDaySummarySingle;
