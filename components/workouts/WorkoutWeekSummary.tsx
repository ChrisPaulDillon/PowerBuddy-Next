import { Flex, useColorMode, useDisclosure, useToast } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { CgArrowTopRight } from 'react-icons/cg';
import PbIconButton from '../common/IconButtons';
import { PbStack } from '../common/Stacks';
import { HeadingMd, TextSm, TextXs } from '../common/Texts';
import { CardSm } from '../layout/Card';
import { CenterColumnFlex, CenterRowFlex } from '../layout/Flexes';
import { BadgeWeekNo, BadgeWorkoutName } from '../shared/Badges';
import theme from '../../theme';
import { TEMPLATES_URL, WORKOUT_DAY_URL, WORKOUT_DIARY_URL } from '../../InternalLinks';
import router, { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import { PrimaryButton } from '../common/Buttons';
import useScreenSizes from '../../hooks/useScreenSizes';
import axios from 'axios';
import { ModalBackForward, ModalForward } from '../common/Modals';
import { LoginModal } from '../shared/Modals';
import { IWorkoutWeekSummary, ICreateWorkoutDayOptions, IWorkoutDaySummary, IWorkoutExerciseSummary } from 'powerbuddy-shared/lib';
import { CreateWorkoutDayUrl, GetWorkoutDayIdByDateUrl } from '../../api/account/workoutDay';
import { ToastSuccess } from '../shared/Toasts';
import { Box } from '../../chakra/Layout';

interface IProps {
  weekSummary: IWorkoutWeekSummary;
}

const WorkoutWeekSummary: React.FC<IProps> = ({ weekSummary }) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [programText, setProgramText] = useState<string>();
  const [workoutOptions, setWorkoutOptions] = useState<ICreateWorkoutDayOptions>({ workoutDate: new Date() } as ICreateWorkoutDayOptions);

  const { SCREEN_MOBILE } = useScreenSizes();

  const toast = useToast();

  const { isOpen: isCreateWorkoutOpen, onOpen: onCreateWorkoutOpen, onClose: onCreateWorkoutClose } = useDisclosure();
  const { isOpen: isTodayWorkoutOpen, onOpen: onTodayWorkoutOpen, onClose: onTodayWorkoutClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

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
    } catch (error) {
      if (error?.response?.status === 401) {
        onLoginOpen();
      }
    }
    setButtonLoading(false);
  };

  const createWorkoutDay = async () => {
    setButtonLoading(true);
    try {
      const result = await axios.post(CreateWorkoutDayUrl(), workoutOptions);
      if (result.data !== 0) {
        router.push(`${WORKOUT_DIARY_URL}/${result.data.workoutDayId}`);
        toast(ToastSuccess('Success', 'Successfully created todays workout!'));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        onLoginOpen();
      }
    }
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
      <CenterColumnFlex>
        <Box mt={2} mx={2}>
          <PrimaryButton
            size={isMobile || SCREEN_MOBILE ? 'xs' : 'sm'}
            variant="outline"
            onClick={async () => await doesUserHaveWorkoutToday()}
            loading={buttonLoading}>
            Todays Workout
          </PrimaryButton>
        </Box>
      </CenterColumnFlex>
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />}
      {isTodayWorkoutOpen && (
        <ModalBackForward
          isOpen={isTodayWorkoutOpen}
          onClose={onTodayWorkoutClose}
          forwardText="Create Single"
          backText="Create Using Template"
          body="Create one using a weightlifting program or a one off workout"
          title="No Workout Detected"
          loading={buttonLoading}
          onForwardClick={async () => await createWorkoutDay()}
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
          onClick={async () => await createWorkoutDay()}
        />
      )}
    </Box>
  );
};

const WorkoutDaySummarySingle: React.FC<IWorkoutDaySummary> = ({
  workoutDayId,
  date,
  templateName,
  weekNo,
  workoutExerciseSummaries,
  hasWorkoutData,
}) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  return (
    <CardSm m={2} bg={moment(date).isSame(new Date(), 'day') ? 'gray.500' : theme.colors.cardColor[colorMode]} minW="180px" maxW="250px" minH="sm">
      <PbStack>
        <TextSm textAlign="left" isTruncated>
          {moment(date).format('DD/MM/YYYY')}
        </TextSm>
        <PbIconButton Icon={CgArrowTopRight} label="Go to Workout" onClick={async () => await router.push(`${WORKOUT_DAY_URL}/${workoutDayId}`)} />
      </PbStack>
      {
        hasWorkoutData ? (
          <Box>
            <CenterRowFlex justify="center" py={2}>
              {templateName && (
                <Box px={1}>
                  <BadgeWorkoutName body={`${templateName}`} />
                </Box>
              )}
              {weekNo !== 0 && (
                <Box px={1}>
                  <BadgeWeekNo body={`Week ${weekNo}`} />
                </Box>
              )}
            </CenterRowFlex>
            <CenterColumnFlex mt={4}>
              {workoutExerciseSummaries?.map((x) => (
                <WorkoutExerciseSummary {...x} />
              ))}
            </CenterColumnFlex>
          </Box>
        ) : (
          <TextXs textAlign="center" py={4}>
            No Workout Data
          </TextXs>
        )
        /* <Box d="flex" alignItems="baseline">
        {completed ? <BadgeCompleted /> : <BadgeIncomplete />}
      </Box> */
      }
    </CardSm>
  );
};

const WorkoutExerciseSummary: React.FC<IWorkoutExerciseSummary> = ({ exerciseName, noOfSets }) => (
  <PbStack p={1}>
    <TextXs>{exerciseName}</TextXs>
    <TextXs>{noOfSets} Sets</TextXs>
  </PbStack>
);
export default WorkoutWeekSummary;
