import { useDisclosure } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { HeadingMd } from '../common/Texts';
import { CenterRowFlex } from '../layout/Flexes';
import { TEMPLATES_URL, WORKOUT_DIARY_URL } from '../../InternalLinks';
import router from 'next/router';
import { PrimaryButton } from '../common/Buttons';
import axios from 'axios';
import { ModalBackForward, ModalForward } from '../common/Modals';
import { IWorkoutWeekSummary, ICreateWorkoutDayOptions } from 'powerbuddy-shared/lib';
import { CreateWorkoutDayUrl, GetWorkoutDayIdByDateUrl } from '../../api/account/workoutDay';
import { Box, Flex } from '../../chakra/Layout';
import useFireToast from '../../hooks/useFireToast';
import WorkoutDaySummarySingle from './WorkoutDaySummarySingle';

interface IProps {
  weekSummary: IWorkoutWeekSummary;
}

const WorkoutWeekSummary: React.FC<IProps> = ({ weekSummary }) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [programText, setProgramText] = useState<string>();
  const [workoutOptions, setWorkoutOptions] = useState<ICreateWorkoutDayOptions>({ workoutDate: new Date() } as ICreateWorkoutDayOptions);

  const toast = useFireToast();

  const { isOpen: isCreateWorkoutOpen, onOpen: onCreateWorkoutOpen, onClose: onCreateWorkoutClose } = useDisclosure();
  const { isOpen: isTodayWorkoutOpen, onOpen: onTodayWorkoutOpen, onClose: onTodayWorkoutClose } = useDisclosure();

  const doesUserHaveWorkoutToday = async () => {
    setButtonLoading(true);
    try {
      const result = await axios.get(GetWorkoutDayIdByDateUrl());
      if (result.data.workoutDayId !== 0) {
        router.push(`${WORKOUT_DIARY_URL}/${result.data.workoutDayId}`);
      } else if (!result.data.workoutLogId) {
        onTodayWorkoutOpen(); //No workout log was found, give options of fresh create
      } else {
        const workoutOptions: ICreateWorkoutDayOptions = {
          workoutDate: new Date(),
          workoutLogId: result.data.workoutLogId,
          weekNo: result.data.weekNo,
        };
        setWorkoutOptions(workoutOptions);
        setProgramText(result?.data?.templateName);
        onCreateWorkoutOpen(); //Workout log was found, give the option to create a workout day for that log
      }
    } catch (error) {}
    setButtonLoading(false);
  };

  const createWorkoutDay = async () => {
    setButtonLoading(true);
    try {
      const result = await axios.post(CreateWorkoutDayUrl(), workoutOptions);
      if (result.data !== 0) {
        router.push(`${WORKOUT_DIARY_URL}/${result.data}`);
        toast.Success('Successfully created todays workout!');
      }
    } catch (error) {}
    setButtonLoading(false);
    onTodayWorkoutClose();
    onCreateWorkoutClose();
  };

  return (
    <Box>
      <CenterRowFlex justify="center">
        {weekSummary?.workoutDays &&
          weekSummary?.workoutDays.map((x, idx) => (
            <Flex flexDir="column" key={idx}>
              <HeadingMd textAlign="center">{moment(x.date).format('dddd')}</HeadingMd>
              <WorkoutDaySummarySingle {...x} />{' '}
            </Flex>
          ))}
      </CenterRowFlex>
      <Box m={2}>
        <PrimaryButton onClick={async () => doesUserHaveWorkoutToday()} isLoading={buttonLoading} isFullWidth>
          Todays Workout
        </PrimaryButton>
      </Box>
      {isTodayWorkoutOpen && (
        <ModalBackForward
          isOpen={isTodayWorkoutOpen}
          onClose={onTodayWorkoutClose}
          forwardText="Create Single"
          backText="Create Using Template"
          body="Create one using a weightlifting program or a one off workout"
          title="No Workout Detected"
          loading={buttonLoading}
          onForwardClick={async () => createWorkoutDay()}
          onBackClick={() => {
            router.push(TEMPLATES_URL);
            onTodayWorkoutClose();
          }}
        />
      )}
      {isCreateWorkoutOpen && (
        <ModalForward
          isOpen={isCreateWorkoutOpen}
          onClose={onCreateWorkoutClose}
          actionText="Add"
          body={`You are currently running the program ${programText}, add this workout to this program?`}
          title="No Workout Detected"
          loading={buttonLoading}
          onClick={async () => createWorkoutDay()}
        />
      )}
    </Box>
  );
};

export default WorkoutWeekSummary;
