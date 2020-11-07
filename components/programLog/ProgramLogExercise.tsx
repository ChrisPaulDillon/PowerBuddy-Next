import React, { useState } from 'react';
import { Flex, Divider, Box, Link, useDisclosure, Stack, useColorMode } from '@chakra-ui/core';
import { IProgramLogExercise } from '../../interfaces/programLogs';
import { HeadingXs } from '../common/Texts';
import { RiAddCircleLine, FaRegCommentAlt, MdDeleteForever } from 'react-icons/all';
import { ProgramExerciseCard } from '../layout/Card';
import { CenterRowFlex } from '../layout/Flexes';
import ProgramLogRepScheme from './ProgramLogRepScheme';
import DeleteProgramLogExerciseAlert from './alerts/DeleteProgramLogExerciseAlert';
import QuickAddSetsForm from './forms/QuickAddSetsForm';
import { PbStack } from '../common/Stacks';
import PbIconButton from '../common/IconButtons';
import AddExerciseNoteForm from './forms/AddExerciseNoteForm';
import { Link as RouterLink } from 'react-router-dom';
import { PbModalDrawerForm } from '../common/ModalDrawer';
import theme from '../../theme';
import { useProgramLogContext } from './ProgramLogContext';

interface ILogExerciseProps {
  key?: number;
  ple: IProgramLogExercise;
  date: Date;
}

export const ProgramLogExerciseWeb: React.FC<ILogExerciseProps> = React.memo(({ ple, date }) => {
  const { contentDisabled } = useProgramLogContext();
  const [notesHighlighted] = useState<boolean>(ple.comment != null ? true : false);
  const { colorMode } = useColorMode();
  const { isOpen: isAddNoteOpen, onOpen: onAddNoteOpen, onClose: onAddNoteClose } = useDisclosure();
  const { isOpen: isDeleteExerciseOpen, onOpen: onDeleteExerciseOpen, onClose: onDeleteExerciseClose } = useDisclosure();
  const { isOpen: isQuickAddOpen, onOpen: onQuickAddOpen, onClose: onQuickAddClose } = useDisclosure();

  const exerciseOnClick = () => `/personalbests/${ple.exerciseId}`;

  return (
    <ProgramExerciseCard py="2">
      <Divider />
      <Stack spacing="no-spacing" direction="row">
        <CenterRowFlex wrap="no-wrap">
          <Flex mt="1">
            <HeadingXs mr="1" minW="50px">
              {ple.noOfSets} Sets
            </HeadingXs>
            <Link as={RouterLink} to={exerciseOnClick} color={theme.colors.hyperLink[colorMode]}>
              <HeadingXs minW="150px">{ple.exerciseName}</HeadingXs>
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
        <Flex wrap="wrap">
          {ple!.programLogRepSchemes!.map((plrs) => {
            return (
              <ProgramLogRepScheme
                key={plrs.programLogRepSchemeId}
                repScheme={plrs}
                date={date}
                repSchemes={ple!.programLogRepSchemes!}
                programLogDayId={ple!.programLogDayId!}
              />
            );
          })}
        </Flex>
      </Stack>

      {isQuickAddOpen && (
        <PbModalDrawerForm isOpen={isQuickAddOpen} onClose={onQuickAddClose} title="Quick Add Sets">
          <QuickAddSetsForm
            ple={ple!}
            suggestedReps={ple.programLogRepSchemes![0].noOfReps!}
            suggestedWeight={ple.programLogRepSchemes![0].weightLifted!}
            totalSets={ple.noOfSets!}
            onClose={onQuickAddClose}
          />
        </PbModalDrawerForm>
      )}
      {isAddNoteOpen && (
        <PbModalDrawerForm title="Add Exercise Note" isOpen={isAddNoteOpen} onClose={onAddNoteClose}>
          <AddExerciseNoteForm
            onClose={onAddNoteClose}
            programLogExerciseId={ple.programLogExerciseId!}
            programLogDayId={ple.programLogDayId!}
            note={ple.comment}
          />
        </PbModalDrawerForm>
      )}
      {isDeleteExerciseOpen && (
        <PbModalDrawerForm title="Delete Diary Exercise?" isOpen={isDeleteExerciseOpen} onClose={onDeleteExerciseClose}>
          <DeleteProgramLogExerciseAlert
            onClose={onDeleteExerciseClose}
            programLogDayId={ple.programLogDayId!}
            programLogExerciseId={ple.programLogExerciseId!}
          />
        </PbModalDrawerForm>
      )}
    </ProgramExerciseCard>
  );
});

export const ProgramLogExerciseMobile: React.FC<ILogExerciseProps> = React.memo(({ ple, date }) => {
  const [notesHighlighted] = useState<boolean>(ple.comment != null ? true : false);
  const { colorMode } = useColorMode();
  const { isOpen: isAddNoteOpen, onOpen: onAddNoteOpen, onClose: onAddNoteClose } = useDisclosure();
  const { isOpen: isDeleteExerciseOpen, onOpen: onDeleteExerciseOpen, onClose: onDeleteExerciseClose } = useDisclosure();
  const { isOpen: isQuickAddOpen, onOpen: onQuickAddOpen, onClose: onQuickAddClose } = useDisclosure();
  const { contentDisabled } = useProgramLogContext();

  const exerciseOnClick = () => `/personalbests/${ple.exerciseId}`;

  return (
    <ProgramExerciseCard py="2">
      <Divider />
      <Flex>
        <PbStack>
          <Flex mt="1">
            <HeadingXs mr="1" minW="50px">
              {ple.noOfSets} Sets
            </HeadingXs>
            <Link as={RouterLink} to={exerciseOnClick} color={theme.colors.hyperLink[colorMode]}>
              <HeadingXs minW="150px">{ple.exerciseName}</HeadingXs>
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
              onClick={onAddNoteOpen}
              isDisabled={contentDisabled}
            />
          </Box>
        </PbStack>
      </Flex>
      <Flex wrap="wrap" justify="center">
        {ple!.programLogRepSchemes!.map((plrs) => {
          return (
            <ProgramLogRepScheme
              key={plrs.programLogRepSchemeId}
              repScheme={plrs}
              date={date}
              repSchemes={ple!.programLogRepSchemes!}
              programLogDayId={ple!.programLogDayId!}
            />
          );
        })}
      </Flex>

      {isQuickAddOpen && (
        <PbModalDrawerForm isOpen={isQuickAddOpen} onClose={onQuickAddClose} title="Quick Add Sets">
          <QuickAddSetsForm
            ple={ple!}
            suggestedReps={ple.programLogRepSchemes![0].noOfReps!}
            suggestedWeight={ple.programLogRepSchemes![0].weightLifted!}
            totalSets={ple.noOfSets!}
            onClose={onQuickAddClose}
          />
        </PbModalDrawerForm>
      )}
      {isAddNoteOpen && (
        <PbModalDrawerForm title="Add Exercise Note" isOpen={isAddNoteOpen} onClose={onAddNoteClose}>
          <AddExerciseNoteForm
            onClose={onAddNoteClose}
            programLogExerciseId={ple.programLogExerciseId!}
            programLogDayId={ple.programLogDayId!}
            note={ple.comment}
          />
        </PbModalDrawerForm>
      )}
      {isDeleteExerciseOpen && (
        <PbModalDrawerForm title="Delete Diary Exercise?" isOpen={isDeleteExerciseOpen} onClose={onDeleteExerciseClose}>
          <DeleteProgramLogExerciseAlert
            onClose={onDeleteExerciseClose}
            programLogDayId={ple.programLogDayId!}
            programLogExerciseId={ple.programLogExerciseId!}
          />
        </PbModalDrawerForm>
      )}
    </ProgramExerciseCard>
  );
});
