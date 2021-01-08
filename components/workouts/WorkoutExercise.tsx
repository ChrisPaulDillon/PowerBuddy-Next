import { useColorMode, useDisclosure, Box, Divider, Flex, Stack } from '@chakra-ui/core';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { RiAddCircleLine } from 'react-icons/ri';
import PbIconButton from '../common/IconButtons';
import { ModalDrawerForm } from '../common/ModalDrawer';
import { HeadingXs } from '../common/Texts';
import { ProgramExerciseCard } from '../layout/Card';
import { CenterRowFlex } from '../layout/Flexes';
import { PERSONALBESTS_URL } from '../../InternalLinks';
import theme from '../../theme';
import { IWorkoutExercise, IWorkoutSet } from '../../interfaces/workouts';
import moment from 'moment';
import { useWorkoutContext } from './WorkoutContext';
import Link from 'next/link';
import RepSchemeTagFactory, { RepSchemeTagEnum } from './factories/RepSchemeTagFactory';
import AddExerciseNoteForm from './forms/AddExerciseNoteForm';
import QuickAddSetsForm from './forms/QuickAddSetsForm';
import DeleteWorkoutExerciseAlert from './alerts/DeleteWorkoutExerciseAlert';
import EditWorkoutSetForm from './forms/EditWorkoutSetForm';

interface IExerciseProps {
  key?: number;
  workoutExercise: IWorkoutExercise;
  date: Date;
}

export const WorkoutExercise: React.FC<IExerciseProps> = React.memo(({ workoutExercise, date }) => {
  const { contentDisabled } = useWorkoutContext();
  const [notesHighlighted] = useState<boolean>(workoutExercise.comment != null ? true : false);
  const { colorMode } = useColorMode();

  const { isOpen: isAddNoteOpen, onOpen: onAddNoteOpen, onClose: onAddNoteClose } = useDisclosure();
  const { isOpen: isDeleteExerciseOpen, onOpen: onDeleteExerciseOpen, onClose: onDeleteExerciseClose } = useDisclosure();
  const { isOpen: isQuickAddOpen, onOpen: onQuickAddOpen, onClose: onQuickAddClose } = useDisclosure();

  return (
    <ProgramExerciseCard py="2">
      <Divider />
      <Flex
        justify={{ lg: 'initial', md: 'left', sm: 'left', xs: 'center' }}
        alignItems={{ lg: 'initial', md: 'left', sm: 'left', xs: 'center' }}
        wrap="wrap">
        <CenterRowFlex
          wrap="no-wrap"
          maxW="100vw"
          justify={{ lg: 'initial', md: 'left', sm: 'left', xs: 'center' }}
          alignItems={{ lg: 'initial', md: 'left', sm: 'left', xs: 'center' }}
          justifyContent={{ lg: 'initial', md: 'left', sm: 'left', xs: 'center' }}>
          <Flex mt="1">
            <HeadingXs mr="1" minW="50px">
              {workoutExercise.noOfSets} Sets
            </HeadingXs>
            <Link
              href={`${PERSONALBESTS_URL}/${workoutExercise.exerciseId}?exercise=${encodeURIComponent(
                workoutExercise.exerciseName!.replace(/\s+/g, '-').toLowerCase()
              )}`}>
              <HeadingXs minW="150px" color={theme.colors.hyperLink[colorMode]}>
                {workoutExercise.exerciseName}
              </HeadingXs>
            </Link>
          </Flex>
          <Box minW="100px">
            <PbIconButton
              label="Add a new set"
              Icon={RiAddCircleLine}
              color="green.500"
              fontSize="20px"
              onClick={onQuickAddOpen}
              isDisabled={contentDisabled}
            />
            <PbIconButton
              label="Delete Exercise"
              Icon={MdDeleteForever}
              color="red.500"
              fontSize="20px"
              onClick={onDeleteExerciseOpen}
              isDisabled={contentDisabled}
            />
            <PbIconButton
              Icon={FaRegCommentAlt}
              label="Comment"
              color={notesHighlighted ? 'green.500' : 'gray.500'}
              fontSize="15px"
              isDisabled={contentDisabled}
              onClick={onAddNoteOpen}
            />
          </Box>
        </CenterRowFlex>
        {workoutExercise!.workoutSets!.map((ws, idx) => {
          return (
            <Box key={idx}>
              <WorkoutSet set={ws} date={date} workoutSets={workoutExercise.workoutSets!} workoutDayId={workoutExercise.workoutDayId!} />
            </Box>
          );
        })}
      </Flex>

      {isQuickAddOpen && (
        <ModalDrawerForm isOpen={isQuickAddOpen} onClose={onQuickAddClose} title="Quick Add Sets">
          <QuickAddSetsForm
            workoutExercise={workoutExercise!}
            suggestedReps={workoutExercise.workoutSets![0].noOfReps!}
            suggestedWeight={workoutExercise.workoutSets![0].weightLifted!}
            totalSets={workoutExercise.noOfSets!}
            onClose={onQuickAddClose}
          />
        </ModalDrawerForm>
      )}
      {isAddNoteOpen && (
        <ModalDrawerForm title="Add Exercise Note" isOpen={isAddNoteOpen} onClose={onAddNoteClose}>
          <AddExerciseNoteForm
            onClose={onAddNoteClose}
            workoutExerciseId={workoutExercise.workoutExerciseId!}
            workoutDayId={workoutExercise.workoutDayId!}
            note={workoutExercise.comment}
          />
        </ModalDrawerForm>
      )}
      {isDeleteExerciseOpen && (
        <ModalDrawerForm title="Delete Diary Exercise?" isOpen={isDeleteExerciseOpen} onClose={onDeleteExerciseClose}>
          <DeleteWorkoutExerciseAlert onClose={onDeleteExerciseClose} workoutExerciseId={workoutExercise.workoutExerciseId!} />
        </ModalDrawerForm>
      )}
    </ProgramExerciseCard>
  );
});

interface ISetProps {
  key?: any;
  set: IWorkoutSet;
  date: Date;
  workoutSets: IWorkoutSet[];
  workoutDayId: number;
}

const WorkoutSet: React.FC<ISetProps> = memo(({ set, date, workoutSets = [], workoutDayId }) => {
  const { workoutSetId, weightLifted, noOfReps, repsCompleted, personalBest } = set;
  const [repEnabled] = useState<boolean>(moment(date).isAfter(new Date()) ? true : false);
  const [currentReps, setCurrentReps] = useState<number>(repsCompleted ?? noOfReps!);
  const [tagType, setTagType] = useState<RepSchemeTagEnum>(RepSchemeTagEnum.None);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    if (currentReps === noOfReps!) return 'green';
    if (noOfReps! - currentReps < 3) return 'orange';
    return 'red';
  }, []);

  const [repColor, setRepColor] = useState<string>(determineColor());

  const setRepsAchieved = () => {
    let newRep = 0;
    if (currentReps < 1) {
      setRepColor('green');
      newRep = noOfReps!;
    } else if (noOfReps! - currentReps < 3) {
      setRepColor('orange');
      newRep = currentReps - 1;
    } else {
      setRepColor('red');
      newRep = currentReps - 1;
    }
    setCurrentReps(newRep);

    workoutSets.map((e) => {
      if (e.workoutSetId! === workoutSetId!) {
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
          weightLifted={weightLifted!}
          noOfReps={noOfReps!}
          currentReps={currentReps}
          repColor={repColor}
          repTagType={tagType}
          setEditRepAlert={onOpen}
          setRepsAchieved={setRepsAchieved}
        />
      </Stack>
      <ModalDrawerForm isOpen={isOpen} onClose={onClose} title="Edit Your Set">
        <EditWorkoutSetForm workoutDayId={workoutDayId!} workoutSet={set} onClose={onClose} />
      </ModalDrawerForm>
    </Box>
  );
});

export default WorkoutExercise;
