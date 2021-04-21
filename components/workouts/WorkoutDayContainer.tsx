import { Box, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import { ILiftingStat } from 'powerbuddy-shared';
import React, { useState } from 'react';

import { UpdateWorkoutNoteUrl } from '../../api/account/workoutDay';
import { DeleteWorkoutLogUrl } from '../../api/account/workoutLog';
import useFireToast from '../../hooks/useFireToast';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { BreadcrumbBase, IBreadcrumbInput } from '../common/Breadcrumbs';
import { ModalDrawerForm, PbModalDrawer } from '../common/ModalDrawers';
import { PbStack } from '../common/Stacks';
import { HeadingMd } from '../common/Texts';
import { CardNoShadow } from '../layout/Card';
import { BadgeWorkoutName } from '../../shared/layout/Badges';
import NotifiyPersonalBestAlert from './alerts/NotifyPersonalBestAlert';
import AddWorkoutNoteForm from './forms/AddWorkoutNoteForm';
import AddWorkoutTemplateForm from './forms/AddWorkoutTemplateForm';
import { useWorkoutContext } from './WorkoutContext';
import WorkoutExercise from './workoutExercises/WorkoutExercise';
import { useForm } from 'react-hook-form';
import { Text } from '../../chakra/Typography';
import { useAppSelector } from '../../store/index';
import WorkoutDayBar from './WorkoutDayBar';
import SharedDialogs from './dialogs/SharedDialogs';

interface IProps {

}

const WorkoutDayContainer: React.FC<IProps> = () => {
  const workoutDay = useAppSelector((state) => state.workout?.workoutState?.workoutDay)

  const [] = useState<boolean>(workoutDay?.comment != null ? true : false);

  const [dateHighlighted] = useState<boolean>(moment(workoutDay?.date).isSame(new Date(), 'day') ? true : false);

  const [personalBests, setPersonalBests] = useState<ILiftingStat[]>([]);
  const [deleteLogLoading, setDeleteLogLoading] = useState<boolean>(false);

  const { contentDisabled, UpdateDayNotes } = useWorkoutContext();

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


  const onAddNoteSubmit = async ({ note }) => {
    try {
      await axios.put(UpdateWorkoutNoteUrl(workoutDay?.workoutDayId, note));
      UpdateDayNotes(note);
      toast.Success('Successfully added notes');
      onAddWorkoutNoteClose();
    } catch (ex) {
      toast.Error('Could not add notes to workout');
    }
  };


  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: WORKOUT_DIARY_URL, name: 'Workout Diary' },
    { href: '#', name: dateHighlighted ? 'Todays Workout' : moment(workoutDay.date).format('dddd Do MMM') },
  ];

  const { register, handleSubmit, formState } = useForm();

  return (
    <Box>
      <BreadcrumbBase values={breadcrumbInput} />
      {workoutDay?.userName && <HeadingMd mt={[7, 7, 0, 0]}>{workoutDay?.userName}'s Diary</HeadingMd>}
      <CardNoShadow borderWidth="0.5px" minH="250px" w="100%" p="2" my="5">
        <PbStack mb={1} w="100%">
          <WorkoutDayBar />
          <BadgeWorkoutName body={workoutDay?.templateName} />
        </PbStack>

        <Box p="2">
          {workoutDay?.workoutExercises?.length <= 0 ? (
            <Text textAlign="center" mt={6}>
              No exercises found, click the weight icon to get started!
            </Text>
          ) : (
            workoutDay?.workoutExercises.map((we, idx) => (
              <Box key={idx}>
                <WorkoutExercise workoutExercise={we} date={workoutDay.date} />
              </Box>
            ))
          )}
        </Box>
      </CardNoShadow>
      <SharedDialogs />
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
          <form onSubmit={handleSubmit(onAddNoteSubmit)}>
            <AddWorkoutNoteForm register={register} loading={formState.isSubmitting} note={workoutDay?.comment} />
          </form>
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

export default WorkoutDayContainer;
