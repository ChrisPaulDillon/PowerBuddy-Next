import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, useDisclosure, useToast } from '@chakra-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { TextXs } from '../../components/common/Texts';
import { CenterColumnFlex, CenterRowFlex } from '../../components/layout/Flexes';
import { DeleteWorkoutLogUrl } from '../../api/account/workoutLog';
import { useAxios } from '../../hooks/useAxios';
import { IWorkoutDay } from 'powerbuddy-shared';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import moment from 'moment';
import { AiOutlineMore } from 'react-icons/ai';
import { BiDumbbell } from 'react-icons/bi';
import { FaRegCommentAlt, FaCheckCircle } from 'react-icons/fa';
import { MdWarning } from 'react-icons/md';
import { GetWorkoutDayByIdUrl, UpdateWorkoutUrl } from '../../api/account/workoutDay';
import { IBreadcrumbInput, BreadcrumbBase } from '../../components/common/Breadcrumbs';
import PbIconButton from '../../components/common/IconButtons';
import MenuBase, { IMenuItem } from '../../components/common/Menus';
import { ModalDrawerForm, PbModalDrawer } from '../../components/common/ModalDrawer';
import { PbStack } from '../../components/common/Stacks';
import { CardNoShadow } from '../../components/layout/Card';
import { BadgeWorkoutName } from '../../components/shared/Badges';
import WorkoutProvider from '../../components/workouts/WorkoutContext';
import WorkoutExercise from '../../components/workouts/WorkoutExercise';
import { ILiftingStat } from 'powerbuddy-shared';
import { ErrorMessage } from '../../components/common/Error';
import AddWorkoutNoteForm from '../../components/workouts/forms/AddWorkoutNoteForm';
import NotifiyPersonalBestAlert from '../../components/workouts/alerts/NotifyPersonalBestAlert';
import AddExerciseForm from '../../components/workouts/forms/AddExerciseForm';
import { PageContent, PageHead } from '../../components/layout/Page';
import { ToastError, ToastSuccess } from '../../components/shared/Toasts';

const WorkoutDay: NextPage = () => {
  const router = useRouter();
  const { workoutDayId } = router.query;
  const { loading: dayLoading, data: dayData, statusCode: dayCode } = useAxios<IWorkoutDay>(GetWorkoutDayByIdUrl(parseInt(workoutDayId as string)));
  const [workoutDay, setWorkoutDay] = useState<IWorkoutDay>({} as IWorkoutDay);
  const [loading, setLoading] = useState<boolean>(false);
  const [dayEnabled] = useState<boolean>(moment(workoutDay.date).isAfter(new Date()) ? true : false);
  const [dateHighlighted, setDateHighlighted] = useState<boolean>(moment(workoutDay.date).isSame(new Date(), 'day') ? true : false);
  const [personalBests, setPersonalBests] = useState<ILiftingStat[]>([]);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [deleteLogLoading, setDeleteLogLoading] = useState<boolean>(false);
  const [noteLoading] = useState<boolean>(false);
  const [] = useState<boolean>(workoutDay.comment != null ? true : false);
  const [contentDisabled] = useState<boolean>(false);

  const { isOpen: isAddExerciseOpen, onOpen: onAddExerciseOpen, onClose: onAddExerciseClose } = useDisclosure();
  const { isOpen: isDeleteLogOpen, onOpen: onDeleteLogOpen, onClose: onDeleteLogClose } = useDisclosure();
  const { isOpen: isAddWorkoutNoteOpen, onOpen: onAddWorkoutNoteOpen, onClose: onAddWorkoutNoteClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    if (dayData) {
      setWorkoutDay(dayData);
      setDateHighlighted(moment(dayData.date).isSame(new Date(), 'day') ? true : false);
    }
  }, [dayData]);

  useEffect(() => {
    setMenuItems([
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
    ]);
  }, []);

  const deleteLog = async () => {
    setDeleteLogLoading(true);
    try {
      await axios.delete(DeleteWorkoutLogUrl(workoutDay.workoutLogId!));
      toast(ToastSuccess('Success', 'Successfully deleted program log'));
      onDeleteLogClose();
    } catch (error) {
      toast(ToastError('Error', 'Could not delete log, please try again later'));
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
      toast(ToastSuccess('Success', 'Diary Entry is now marked as complete'));
    } catch (err) {
      toast(ToastError('Error', 'Could not mark Diary Entry as complete'));
      workoutDay.completed = false;
    }
    setLoading(false);
  };

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: WORKOUT_DIARY_URL, name: 'Workout Diary' },
    { href: '#', name: dateHighlighted ? 'Todays Workout' : moment(workoutDay.date).format('dddd Do MMM') },
  ];

  //   const deleteLog = async () => {
  //     setDeleteLogLoading(true);

  //     const response = await deleteLogApiCall({ workoutId });
  //     if (response?.status === 200) {
  //       onDeleteLogClose();
  //     }
  //     setDeleteLogLoading(false);
  //   };

  if (dayLoading) return <ProgressSpinner />;

  if (dayCode === 404 && !dayLoading)
    return <ErrorMessage title="No Workout Found" description="Have you followed a broken link?" statusCode={404} />;

  return (
    <Box w="100%">
      <PageHead title="Workout" description="PowerBuddy Workout Diary, track personal bests and powerlifting progress" />
      <WorkoutProvider workoutDay={workoutDay} setWorkoutDay={setWorkoutDay} contentDisabled={contentDisabled}>
        <PageContent>
          <BreadcrumbBase values={breadcrumbInput} />
          <CardNoShadow borderWidth="0.5px" rounded="lg" overflow="hidden" textAlign="center" minH="250px" w="100%" p="2" my="5">
            <PbStack mb={1} w="100%">
              <Flex justify={{ lg: 'left', md: 'left', sm: 'left', xs: 'center' }} w="100%">
                <CenterRowFlex justifyContent="center" ml={3}>
                  <PbIconButton
                    label="Complete Workout"
                    Icon={FaCheckCircle}
                    color={workoutDay.completed ? 'green.500' : 'gray.500'}
                    onClick={() => updateWorkoutDay()}
                    isLoading={loading}
                    isDisabled={dayEnabled || contentDisabled}
                  />
                  <PbIconButton
                    label="Add New Exercise"
                    Icon={BiDumbbell}
                    color="blue.500"
                    fontSize="25px"
                    onClick={onAddExerciseOpen}
                    isDisabled={contentDisabled}
                  />

                  <MenuBase
                    button={<PbIconButton label="Additional Options" Icon={AiOutlineMore} onClick={() => undefined} isDisabled={contentDisabled} />}
                    menuItems={menuItems}
                  />
                </CenterRowFlex>
              </Flex>
              <BadgeWorkoutName body={workoutDay.templateName!} />
            </PbStack>

            <Box p="2">
              {workoutDay?.workoutExercises == null ? (
                <CenterColumnFlex mt="5">
                  <TextXs>No exercises found, click the weight icon to get started!</TextXs>
                </CenterColumnFlex>
              ) : (
                workoutDay.workoutExercises!.map((we, idx) => (
                  <Box key={idx}>
                    <WorkoutExercise workoutExercise={we} date={workoutDay.date} />
                  </Box>
                ))
              )}
            </Box>
          </CardNoShadow>
          {isAddExerciseOpen && (
            <ModalDrawerForm isOpen={isAddExerciseOpen} onClose={onAddExerciseClose} title="Add Exercise to Workout">
              <AddExerciseForm onClose={onAddExerciseClose} workoutDayId={workoutDay.workoutDayId!} />
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
              onClick={async () => await deleteLog()}
              actionText="Delete"
              loading={deleteLogLoading}
            />
          )}
          {isAddWorkoutNoteOpen && (
            <ModalDrawerForm title="Add Workout Note" isOpen={isAddWorkoutNoteOpen} onClose={onAddWorkoutNoteClose}>
              <AddWorkoutNoteForm workoutDayId={workoutDay.workoutDayId!} onClose={onAddWorkoutNoteClose} note={workoutDay.comment!} />
            </ModalDrawerForm>
          )}
        </PageContent>
      </WorkoutProvider>
    </Box>
  );
};
export default WorkoutDay;
