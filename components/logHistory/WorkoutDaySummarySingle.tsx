import React from 'react';
import { Flex } from '@chakra-ui/react';
import { TextSm, TextXs } from '../common/Texts';
import { CardSm } from '../layout/Card';
import moment from 'moment';
import { TagPersonalBest } from '../shared/Tags';
import { IWorkoutDaySummary } from 'powerbuddy-shared';
import { Box } from '../../chakra/Layout';

const WorkoutDaySummarySingle: React.FC<IWorkoutDaySummary> = ({ date, personalBestCount, workoutExerciseSummaries }) => {
  return (
    <CardSm p={4}>
      <TextSm>{moment(date).format('DD/MM/YYYY')}</TextSm>
      <Box py={1}>
        <TagPersonalBest body={`${personalBestCount} PBs`} />
      </Box>
      {workoutExerciseSummaries!.map((x, idx) => (
        <Flex key={idx}>
          <TextXs>{x.exerciseName}</TextXs>
          <TextXs>{x.noOfSets}</TextXs>
        </Flex>
      ))}
    </CardSm>
  );
};

export default WorkoutDaySummarySingle;
