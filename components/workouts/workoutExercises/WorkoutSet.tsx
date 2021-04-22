import { Box, Stack } from '@chakra-ui/react';
import moment from 'moment';
import { IWorkoutSet } from 'powerbuddy-shared/lib';
import React, { memo, useState, useEffect, useCallback } from 'react';
import RepSchemeTagFactory, { RepSchemeTagEnum } from '../factories/RepSchemeTagFactory';
import EditWorkoutSetDialog from './dialogs/EditWorkoutSetDialog';

interface ISetProps {
  set: IWorkoutSet;
  date: Date;
  workoutSets: IWorkoutSet[];
}

const WorkoutSet: React.FC<ISetProps> = memo(({ set, date, workoutSets = [] }) => {
  const { workoutSetId, weightLifted, noOfReps, repsCompleted, personalBest } = set;
  const [repEnabled] = useState<boolean>(moment(date).isAfter(new Date()) ? true : false);
  const [currentReps, setCurrentReps] = useState<number>(repsCompleted ?? noOfReps);
  const [tagType, setTagType] = useState<RepSchemeTagEnum>(RepSchemeTagEnum.None);

  useEffect(() => {
    if (personalBest) {
      setTagType(RepSchemeTagEnum.PersonalBest);
    } else if (repEnabled) {
      setTagType(RepSchemeTagEnum.Disabled);
    } else {
      setTagType(RepSchemeTagEnum.Normal);
    }
  }, [set]);

  const determineColor = useCallback(() => {
    if (currentReps === noOfReps) return 'green.300';
    if (noOfReps - currentReps < 3) return 'orange';
    return 'red';
  }, []);

  const [repColor, setRepColor] = useState<string>(determineColor());

  const setRepsAchieved = () => {
    let newRep = 0;
    if (currentReps < 1) {
      setRepColor('green.300');
      newRep = noOfReps;
    } else if (noOfReps - currentReps < 3) {
      setRepColor('orange');
      newRep = currentReps - 1;
    } else {
      setRepColor('red');
      newRep = currentReps - 1;
    }
    setCurrentReps(newRep);

    workoutSets?.map((e) => {
      if (e.workoutSetId === workoutSetId) {
        e.repsCompleted = newRep;
        return e;
      } else {
        return { ...e };
      }
    });
  };

  return (
    <Box minW="145px">
      <Stack w="100%" justifyContent="space-between" p="0.25em" py="0.50em" flexWrap="wrap">
        <RepSchemeTagFactory
          weightLifted={weightLifted}
          noOfReps={noOfReps}
          currentReps={currentReps}
          repColor={repColor}
          repTagType={tagType}
          setRepsAchieved={setRepsAchieved}
        />
      </Stack>
      <EditWorkoutSetDialog workoutSet={set} />
    </Box>
  );
});

export default WorkoutSet;
