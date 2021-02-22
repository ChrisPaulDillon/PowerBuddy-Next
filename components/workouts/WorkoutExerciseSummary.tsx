import { IWorkoutExerciseSummary } from 'powerbuddy-shared/lib';
import React from 'react';
import { PbStack } from '../common/Stacks';
import { TextXs } from '../common/Texts';

const WorkoutExerciseSummary: React.FC<IWorkoutExerciseSummary> = ({ exerciseName, noOfSets }) => (
  <PbStack p={1}>
    <TextXs>{exerciseName}</TextXs>
    <TextXs>{noOfSets} Sets</TextXs>
  </PbStack>
);

export default WorkoutExerciseSummary;
