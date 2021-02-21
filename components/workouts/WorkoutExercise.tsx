import { useColorMode, useDisclosure } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { RiAddCircleLine } from 'react-icons/ri';
import TTIconButton from '../common/IconButtons';
import { ModalDrawerForm } from '../common/ModalDrawers';
import { HeadingXs } from '../common/Texts';
import { PERSONALBESTS_URL } from '../../InternalLinks';
import theme from '../../theme';
import { useWorkoutContext } from './WorkoutContext';
import Link from 'next/link';
import AddExerciseNoteForm from './forms/AddExerciseNoteForm';
import QuickAddSetsForm from './forms/QuickAddSetsForm';
import DeleteWorkoutExerciseAlert from './alerts/DeleteWorkoutExerciseAlert';
import { IWorkoutExercise } from 'powerbuddy-shared';
import { Box, Flex } from '../../chakra/Layout';
import { Divider } from '../../chakra/DataDisplay';
import WorkoutSet from './WorkoutSet';

interface IExerciseProps {
  key?: number;
  workoutExercise: IWorkoutExercise;
  date: Date;
}

export const WorkoutExercise: React.FC<IExerciseProps> = ({ workoutExercise, date }) => {
  const { contentDisabled } = useWorkoutContext();
  const [notesHighlighted] = useState<boolean>(workoutExercise.comment != null ? true : false);
  const { colorMode } = useColorMode();

  const { isOpen: isAddNoteOpen, onOpen: onAddNoteOpen, onClose: onAddNoteClose } = useDisclosure();
  const { isOpen: isDeleteExerciseOpen, onOpen: onDeleteExerciseOpen, onClose: onDeleteExerciseClose } = useDisclosure();
  const { isOpen: isQuickAddOpen, onOpen: onQuickAddOpen, onClose: onQuickAddClose } = useDisclosure();

  const workoutOptionsBar: React.ReactNode = useMemo(
    () => (
      <Box>
        <TTIconButton
          label="Add a new set"
          Icon={RiAddCircleLine}
          color="green.500"
          fontSize="20px"
          onClick={onQuickAddOpen}
          isDisabled={contentDisabled}
        />
        <TTIconButton
          label="Delete Exercise"
          Icon={MdDeleteForever}
          color="red.500"
          fontSize="20px"
          onClick={onDeleteExerciseOpen}
          isDisabled={contentDisabled}
        />
        <TTIconButton
          Icon={FaRegCommentAlt}
          label="Comment"
          color={notesHighlighted ? 'green.500' : 'gray.500'}
          fontSize="15px"
          isDisabled={contentDisabled}
          onClick={onAddNoteOpen}
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

      {isQuickAddOpen && (
        <ModalDrawerForm isOpen={isQuickAddOpen} onClose={onQuickAddClose} title="Quick Add Sets">
          <QuickAddSetsForm
            workoutExercise={workoutExercise}
            suggestedReps={workoutExercise?.workoutSets[0].noOfReps}
            suggestedWeight={workoutExercise?.workoutSets[0].weightLifted}
            totalSets={workoutExercise.noOfSets}
            onClose={onQuickAddClose}
          />
        </ModalDrawerForm>
      )}
      {isAddNoteOpen && (
        <ModalDrawerForm title="Add Exercise Note" isOpen={isAddNoteOpen} onClose={onAddNoteClose}>
          <AddExerciseNoteForm
            onClose={onAddNoteClose}
            workoutExerciseId={workoutExercise?.workoutExerciseId}
            workoutDayId={workoutExercise?.workoutDayId}
            note={workoutExercise?.comment}
          />
        </ModalDrawerForm>
      )}
      {isDeleteExerciseOpen && (
        <ModalDrawerForm title="Delete Diary Exercise?" isOpen={isDeleteExerciseOpen} onClose={onDeleteExerciseClose}>
          <DeleteWorkoutExerciseAlert onClose={onDeleteExerciseClose} workoutExerciseId={workoutExercise?.workoutExerciseId} />
        </ModalDrawerForm>
      )}
    </Box>
  );
};

export default WorkoutExercise;
