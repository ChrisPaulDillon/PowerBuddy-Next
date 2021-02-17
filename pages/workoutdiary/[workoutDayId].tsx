import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { HeadingMd, TextXs } from '../../components/common/Texts';
import { CenterColumnFlex, CenterRowFlex } from '../../components/layout/Flexes';
import { DeleteWorkoutLogUrl } from '../../api/account/workoutLog';
import { IWorkoutDay } from 'powerbuddy-shared';
import moment from 'moment';
import { AiOutlineMore } from 'react-icons/ai';
import { BiDumbbell } from 'react-icons/bi';
import { FaRegCommentAlt, FcCheckmark } from 'react-icons/all';
import { MdWarning } from 'react-icons/md';
import { UpdateWorkoutUrl } from '../../api/account/workoutDay';
import { IBreadcrumbInput, BreadcrumbBase } from '../../components/common/Breadcrumbs';
import TTIconButton from '../../components/common/IconButtons';
import MenuBase, { IMenuItem } from '../../components/common/Menus';
import { ModalDrawerForm, PbModalDrawer } from '../../components/common/ModalDrawers';
import { PbStack } from '../../components/common/Stacks';
import { CardNoShadow } from '../../components/layout/Card';
import { BadgeWorkoutName } from '../../components/shared/Badges';
import WorkoutProvider from '../../components/workouts/WorkoutContext';
import WorkoutExercise from '../../components/workouts/WorkoutExercise';
import { ILiftingStat } from 'powerbuddy-shared';
import AddWorkoutNoteForm from '../../components/workouts/forms/AddWorkoutNoteForm';
import NotifiyPersonalBestAlert from '../../components/workouts/alerts/NotifyPersonalBestAlert';
import AddExerciseForm from '../../components/workouts/forms/AddExerciseForm';
import { PageContent, PageHead } from '../../components/layout/Page';
import { ToastError, ToastSuccess } from '../../components/shared/Toasts';
import { GiRun } from 'react-icons/all';
import AddWorkoutTemplateForm from '../../components/workouts/forms/AddWorkoutTemplateForm';
import { Box, Flex } from '../../chakra/Layout';
import { GetAllPublicWorkoutIdsRequest, GetWorkoutDayByIdRequest } from '../../api/public/workoutDay';
import { useUserContext } from '../../components/users/UserContext';

interface IProps {
  workoutDayData: IWorkoutDay;
}

const WorkoutDay: NextPage<IProps> = ({ workoutDayData }) => {
  const { userId } = useUserContext();
  console.log(userId);

  // const { loading: dayLoading, data: dayData, statusCode: dayCode } = useAxios<IWorkoutDay>(GetWorkoutDayByIdUrl(parseInt(workoutDayId as string)));
  const [loading, setLoading] = useState<boolean>(false);
  const [workoutDay, setWorkoutDay] = useState<IWorkoutDay>(workoutDayData);
  const [dayEnabled] = useState<boolean>(moment(workoutDayData?.date).isAfter(new Date()) ? true : false);
  const [dateHighlighted, setDateHighlighted] = useState<boolean>(moment(workoutDayData?.date).isSame(new Date(), 'day') ? true : false);
  const [personalBests, setPersonalBests] = useState<ILiftingStat[]>([]);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [deleteLogLoading, setDeleteLogLoading] = useState<boolean>(false);
  const [noteLoading] = useState<boolean>(false);
  const [notesHighlighted] = useState<boolean>(workoutDayData?.comment != null ? true : false);
  const [contentDisabled, setContentDisabled] = useState<boolean>(false);

  const { isOpen: isAddExerciseOpen, onOpen: onAddExerciseOpen, onClose: onAddExerciseClose } = useDisclosure();
  const { isOpen: isDeleteLogOpen, onOpen: onDeleteLogOpen, onClose: onDeleteLogClose } = useDisclosure();
  const { isOpen: isAddWorkoutNoteOpen, onOpen: onAddWorkoutNoteOpen, onClose: onAddWorkoutNoteClose } = useDisclosure();
  const { isOpen: isAddWorkoutTemplateOpen, onOpen: onAddWorkoutTemplateOpen, onClose: onAddWorkoutTemplateClose } = useDisclosure();

  const toast = useToast();

  useEffect(() => {
    if (workoutDayData) {
      setWorkoutDay(workoutDayData);
      setDateHighlighted(moment(workoutDayData.date).isSame(new Date(), 'day') ? true : false);
    }
  }, [workoutDayData]);

  useEffect(() => {
    if (workoutDayData) {
      if (workoutDayData?.userId !== userId) {
        setContentDisabled(true);
      } else {
        setContentDisabled(false);
      }
    }
  }, [workoutDayData, userId]);

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
      {
        title: 'Create Workout Template',
        Icon: GiRun,
        onClick: onAddWorkoutTemplateOpen,
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

  return (
    <Box w="100%" mt={3}>
      <PageHead title="Workout" description="PowerBuddy Workout Diary, track personal bests and powerlifting progress" />
      <WorkoutProvider workoutDay={workoutDay} setWorkoutDay={setWorkoutDay} contentDisabled={contentDisabled}>
        <PageContent>
          <BreadcrumbBase values={breadcrumbInput} />
          <HeadingMd textAlign="center">{workoutDay?.userName}'s Diary</HeadingMd>
          <CardNoShadow borderWidth="0.5px" minH="250px" w="100%" p="2" my="5">
            <PbStack mb={1} w="100%">
              <Flex justify={{ lg: 'left', md: 'left', sm: 'center' }} w="100%">
                <CenterRowFlex justifyContent="center" ml={3}>
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
                </CenterRowFlex>
              </Flex>
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
              onClick={async () => await deleteLog()}
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
        </PageContent>
      </WorkoutProvider>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await GetAllPublicWorkoutIdsRequest();

  const paths = res?.data.map((workoutDayId) => ({
    params: { workoutDayId: workoutDayId.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workoutDayId = params.workoutDayId as string;
  const res = await GetWorkoutDayByIdRequest(parseInt(workoutDayId));

  return { props: { workoutDayData: res.data } };
};

export default WorkoutDay;
