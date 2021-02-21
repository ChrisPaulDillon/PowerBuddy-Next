import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import { ILiftingStat, IWorkoutDay } from 'powerbuddy-shared/lib';
import React, { useMemo, useState } from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import { BiDumbbell } from 'react-icons/bi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { FcCheckmark } from 'react-icons/fc';
import { GiRun } from 'react-icons/gi';
import { MdWarning } from 'react-icons/md';
import { UpdateWorkoutUrl } from '../../api/account/workoutDay';
import { DeleteWorkoutLogUrl } from '../../api/account/workoutLog';
import useFireToast from '../../hooks/useFireToast';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { BreadcrumbBase, IBreadcrumbInput } from '../common/Breadcrumbs';
import TTIconButton from '../common/IconButtons';
import MenuBase, { IMenuItem } from '../common/Menus';
import { ModalDrawerForm, PbModalDrawer } from '../common/ModalDrawers';
import { PbStack } from '../common/Stacks';
import { HeadingMd, TextXs } from '../common/Texts';
import { CardNoShadow } from '../layout/Card';
import { CenterColumnFlex } from '../layout/Flexes';
import { BadgeWorkoutName } from '../../shared/layout/Badges';
import NotifiyPersonalBestAlert from './alerts/NotifyPersonalBestAlert';
import AddExerciseForm from './forms/AddExerciseForm';
import AddWorkoutNoteForm from './forms/AddWorkoutNoteForm';
import AddWorkoutTemplateForm from './forms/AddWorkoutTemplateForm';
import { useWorkoutContext } from './WorkoutContext';
import WorkoutExercise from './WorkoutExercise';

interface IProps {
  workoutDay: IWorkoutDay;
}

const WorkoutDay: React.FC<IProps> = ({ workoutDay }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [] = useState<boolean>(workoutDay?.comment != null ? true : false);
  const [dayEnabled] = useState<boolean>(moment(workoutDay?.date).isAfter(new Date()) ? true : false);
  const [dateHighlighted] = useState<boolean>(moment(workoutDay?.date).isSame(new Date(), 'day') ? true : false);
  const [noteLoading] = useState<boolean>(false);
  const [personalBests, setPersonalBests] = useState<ILiftingStat[]>([]);
  const [deleteLogLoading, setDeleteLogLoading] = useState<boolean>(false);

  const { contentDisabled } = useWorkoutContext();

  const { isOpen: isAddExerciseOpen, onOpen: onAddExerciseOpen, onClose: onAddExerciseClose } = useDisclosure();
  const { isOpen: isDeleteLogOpen, onOpen: onDeleteLogOpen, onClose: onDeleteLogClose } = useDisclosure();
  const { isOpen: isAddWorkoutNoteOpen, onOpen: onAddWorkoutNoteOpen, onClose: onAddWorkoutNoteClose } = useDisclosure();
  const { isOpen: isAddWorkoutTemplateOpen, onOpen: onAddWorkoutTemplateOpen, onClose: onAddWorkoutTemplateClose } = useDisclosure();

  const toast = useFireToast();

  const deleteLog = async () => {
    setDeleteLogLoading(true);
    try {
      await axios.delete(DeleteWorkoutLogUrl(workoutDay.workoutLogId));
      toast.Success('Successfully deleted program log');
      onDeleteLogClose();
    } catch (error) {
      toast.Error('Could not delete log, please try again later');
    }
    setDeleteLogLoading(false);
  };

  const updateWorkoutDay = async () => {
    setLoading(true);
    workoutDay.completed = true;
    try {
      const response = await axios.put(UpdateWorkoutUrl(workoutDay.workoutDayId!), workoutDay);
      if (response.data != null) {
        setPersonalBests(response.data);
      }
      toast.Success('Diary Entry is now marked as complete');
    } catch (err) {
      toast.Error('Could not mark Diary Entry as complete');
      workoutDay.completed = false;
    }
    setLoading(false);
  };

  const menuItems = useMemo(
    (): IMenuItem[] => [
      {
        title: 'Delete Diary Log',
        Icon: MdWarning,
        onClick: onDeleteLogOpen,
        loading: deleteLogLoading,
      },
      {
        title: 'Add Workout Note',
        Icon: FaRegCommentAlt,
        onClick: onAddWorkoutNoteOpen,
        loading: noteLoading,
      },
      {
        title: 'Create Workout Template',
        Icon: GiRun,
        onClick: onAddWorkoutTemplateOpen,
        loading: noteLoading,
      },
    ],
    []
  );

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: WORKOUT_DIARY_URL, name: 'Workout Diary' },
    { href: '#', name: dateHighlighted ? 'Todays Workout' : moment(workoutDay.date).format('dddd Do MMM') },
  ];

  const workoutDayBar: React.ReactNode = useMemo(
    () => (
      <Flex>
        {' '}
        <TTIconButton
          label="Complete Workout"
          Icon={FcCheckmark}
          color={workoutDay?.completed ? 'green.500' : 'gray.500'}
          onClick={() => updateWorkoutDay()}
          isLoading={loading}
          isDisabled={dayEnabled || contentDisabled}
        />
        <TTIconButton
          label="Add New Exercise"
          Icon={BiDumbbell}
          color="blue.500"
          fontSize="25px"
          onClick={onAddExerciseOpen}
          isDisabled={contentDisabled}
        />
        <MenuBase
          button={<TTIconButton label="Additional Options" Icon={AiOutlineMore} onClick={() => undefined} isDisabled={contentDisabled} />}
          menuItems={menuItems}
        />
      </Flex>
    ),
    [contentDisabled]
  );

  return (
    <Box>
      <BreadcrumbBase values={breadcrumbInput} />
      {workoutDay?.userName && (
        <HeadingMd textAlign="center" mt={[4, 3, 2, 1]}>
          {workoutDay?.userName}'s Diary
        </HeadingMd>
      )}
      <CardNoShadow borderWidth="0.5px" minH="250px" w="100%" p="2" my="5">
        <PbStack mb={1} w="100%">
          {workoutDayBar}
          <BadgeWorkoutName body={workoutDay?.templateName} />
        </PbStack>

        <Box p="2">
          {workoutDay?.workoutExercises == null ? (
            <CenterColumnFlex mt="5">
              <TextXs>No exercises found, click the weight icon to get started!</TextXs>
            </CenterColumnFlex>
          ) : (
            workoutDay?.workoutExercises.map((we, idx) => (
              <Box key={idx}>
                <WorkoutExercise workoutExercise={we} date={workoutDay.date} />
              </Box>
            ))
          )}
        </Box>
      </CardNoShadow>
      {isAddExerciseOpen && (
        <ModalDrawerForm isOpen={isAddExerciseOpen} onClose={onAddExerciseClose} title="Add Exercise to Workout">
          <AddExerciseForm onClose={onAddExerciseClose} workoutDayId={workoutDay?.workoutDayId} />
        </ModalDrawerForm>
      )}
      {personalBests.length > 0 && (
        <ModalDrawerForm title="Personal Best Hit! 🎉🎉" isOpen={personalBests.length > 0} onClose={() => setPersonalBests([])}>
          <NotifiyPersonalBestAlert personalBests={personalBests} setPersonalBests={setPersonalBests} />
        </ModalDrawerForm>
      )}
      {isDeleteLogOpen && (
        <PbModalDrawer
          title="Delete Diary Log?"
          isOpen={isDeleteLogOpen}
          body="Are you sure? This cannot be undone"
          onClose={onDeleteLogClose}
          onClick={async () => deleteLog()}
          actionText="Delete"
          loading={deleteLogLoading}
        />
      )}
      {isAddWorkoutNoteOpen && (
        <ModalDrawerForm title="Add Workout Note" isOpen={isAddWorkoutNoteOpen} onClose={onAddWorkoutNoteClose}>
          <AddWorkoutNoteForm workoutDayId={workoutDay.workoutDayId} onClose={onAddWorkoutNoteClose} note={workoutDay.comment!} />
        </ModalDrawerForm>
      )}
      {isAddWorkoutTemplateOpen && (
        <ModalDrawerForm title="Create a new workout Template" isOpen={isAddWorkoutTemplateOpen} onClose={onAddWorkoutTemplateClose}>
          <AddWorkoutTemplateForm workoutDay={workoutDay} onClose={onAddWorkoutTemplateClose} />
        </ModalDrawerForm>
      )}
    </Box>
  );
};

export default WorkoutDay;
