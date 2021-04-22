import { useColorMode } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { RiAddCircleLine } from 'react-icons/ri';
import TTIconButton from '../../common/IconButtons';
import { HeadingXs } from '../../common/Texts';
import { PERSONALBESTS_URL } from '../../../InternalLinks';
import theme from '../../../theme';
import { useWorkoutContext } from '../WorkoutContext';
import Link from 'next/link';
import { IWorkoutExercise } from 'powerbuddy-shared';
import { Box, Flex } from '../../../chakra/Layout';
import { Divider } from '../../../chakra/DataDisplay';
import WorkoutSet from './WorkoutSet';
import SharedExerciseDialogs from './dialogs/SharedExerciseDialogs';
import { useAppDispatch } from '../../../store/index';
import { modalOnOpen } from '../store/workoutState';

interface IExerciseProps {
  key?: number;
  workoutExercise: IWorkoutExercise;
  date: Date;
}

export const WorkoutExercise: React.FC<IExerciseProps> = ({ workoutExercise, date }) => {
  const { contentDisabled } = useWorkoutContext();
  const [notesHighlighted] = useState<boolean>(workoutExercise.comment != null ? true : false);
  const { colorMode } = useColorMode();

  const dispatch = useAppDispatch();

  const workoutOptionsBar: React.ReactNode = useMemo(
    () => (
      <Box>
        <TTIconButton
          label="Add a new set"
          Icon={RiAddCircleLine}
          color="green.500"
          fontSize="20px"
          onClick={() => dispatch(modalOnOpen('quickAddSets'))}
          isDisabled={contentDisabled}
        />
        <TTIconButton
          label="Delete Exercise"
          Icon={MdDeleteForever}
          color="red.500"
          fontSize="20px"
          onClick={() => dispatch(modalOnOpen('deleteExercise'))}
          isDisabled={contentDisabled}
        />
        <TTIconButton
          Icon={FaRegCommentAlt}
          label="Comment"
          color={notesHighlighted ? 'green.500' : 'gray.500'}
          fontSize="15px"
          isDisabled={contentDisabled}
          onClick={() => dispatch(modalOnOpen('addExerciseNote'))}
        />
      </Box>
    ),
    [contentDisabled]
  );

  return (
    <Box bg={theme.colors.cardColor[colorMode]} position="relative" alignContent="center" justifyContent="center" textAlign="center" w="100%" py={2}>
      <Divider />
      <Flex justify={{ lg: 'initial', md: 'left', sm: 'center' }} alignItems={{ lg: 'initial', md: 'left', sm: 'center' }} wrap="wrap">
        <Flex maxW="100vw" mb={['5', '5', '5', '5']}>
          <HeadingXs mr="1" minW="50px" mt={2}>
            {workoutExercise?.noOfSets} Sets
          </HeadingXs>
          <HeadingXs minW="150px" color={theme.colors.hyperLink[colorMode]} mt={2}>
            <Link
              href={`${PERSONALBESTS_URL}/${workoutExercise?.exerciseId}?exercise=${encodeURIComponent(
                workoutExercise?.exerciseName.replace(/\s+/g, '-').toLowerCase()
              )}`}>
              {workoutExercise?.exerciseName}
            </Link>
          </HeadingXs>
          {workoutOptionsBar}
        </Flex>
        {workoutExercise?.workoutSets.map((ws, idx) => {
          return (
            <Box key={idx}>
              <WorkoutSet set={ws} date={date} workoutSets={workoutExercise?.workoutSets} workoutDayId={workoutExercise?.workoutDayId} />
            </Box>
          );
        })}
      </Flex>
      <SharedExerciseDialogs    workoutExercise={workoutExercise} />
    </Box>
  );
};

export default WorkoutExercise;