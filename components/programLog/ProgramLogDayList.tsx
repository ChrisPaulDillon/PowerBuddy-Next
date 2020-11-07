import React, { useEffect, useState } from 'react';
import { Box, Flex, useDisclosure, useToast } from '@chakra-ui/core';
import { IProgramLogDay } from '../../interfaces/programLogs/index';
import { HeadingMd, TextSm } from '../common/Texts';
import { CardNoShadow } from '../layout/Card';
import { ProgramLogExerciseMobile, ProgramLogExerciseWeb } from './ProgramLogExercise';
import Moment from 'moment';
import { CenterColumnFlex, CenterRowFlex } from '../layout/Flexes';
import { FaCheckCircle, FaRegCommentAlt, BiDumbbell, BsFillSquareFill } from 'react-icons/all';
import moment from 'moment';
import { TextXs } from '../common/Texts';
import PbIconButton from '../common/IconButtons';
import { useProgramLogContext } from './ProgramLogContext';
import { ILiftingStat } from '../../interfaces/liftingStats';
import ProgramLogDayModalFactory, { DayModalEnum } from './factories/ProgramLogDayModalFactory';
import { LogViewEnum } from '.';
import NotifiyPersonalBestAlert from './alerts/NotifyPersonalBestAlert';
import axios from 'axios';
import { UpdateProgramLogDayUrl } from '../../api/account/programLogDay';
import { PbModalDrawerForm } from '../common/ModalDrawer';
import useScreenSizes from '../../hooks/useScreenSizes';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCube } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/effect-cube/effect-cube.scss';

interface IProps {
  logView: LogViewEnum;
}

const ProgramLogDayList: React.FC<IProps> = () => {
  const { programLogWeek } = useProgramLogContext();
  const { SCREEN_MOBILE } = useScreenSizes();
  const [initialDay, setInitialDay] = useState<number>(0);

  SwiperCore.use([EffectCube]);

  useEffect(() => {
    setInitialDay(programLogWeek.programLogDays.find((x) => moment(x.date).isSame(new Date(), 'day') === true)?.programLogDayId!);
  }, [programLogWeek]);

  if (programLogWeek && programLogWeek.programLogDays && programLogWeek.programLogDays.length <= 0)
    return (
      <CenterColumnFlex mt="4">
        <TextSm>No days found for this week, add a day by using the options menu</TextSm>
      </CenterColumnFlex>
    );

  if (SCREEN_MOBILE)
    return (
      <Swiper initialSlide={initialDay} effect="cube">
        {programLogWeek.programLogDays.map((pld) => (
          <SwiperSlide key={pld.programLogDayId!}>
            <ProgramLogDay key={pld.programLogDayId} programLogDay={pld} />
          </SwiperSlide>
        ))}
      </Swiper>
    );

  return (
    <Box w="100%">
      {programLogWeek.programLogDays.map((pld) => (
        <ProgramLogDay key={pld.programLogDayId} programLogDay={pld} />
      ))}
    </Box>
  );
};

interface ISingleProps {
  programLogDay: IProgramLogDay;
}

export const ProgramLogDay: React.FC<ISingleProps> = ({ programLogDay }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dayEnabled] = useState<boolean>(moment(programLogDay.date).isAfter(new Date()) ? true : false);
  const [dateHighlighted] = useState<boolean>(moment(programLogDay.date).isSame(new Date(), 'day') ? true : false);
  const [notesHighlighted] = useState<boolean>(programLogDay.comment != null ? true : false);
  const [personalBests, setPersonalBests] = useState<ILiftingStat[]>([]);
  const [modalOption, setModalOption] = useState<DayModalEnum>(DayModalEnum.None);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { contentDisabled } = useProgramLogContext();
  const { SCREEN_MOBILE } = useScreenSizes();

  const toast = useToast();
  const { UpdateDay } = useProgramLogContext();

  const openModal = (modalOption: DayModalEnum) => {
    setModalOption(modalOption);
    onModalOpen();
  };

  const updateProgramLogDay = async () => {
    setLoading(true);
    programLogDay.completed = true;
    try {
      const response = await axios.put(UpdateProgramLogDayUrl(programLogDay.programLogDayId!), programLogDay);
      if (response.data != null) {
        setPersonalBests(response.data);
      }
      UpdateDay(programLogDay);
      toast({
        title: 'Success',
        description: 'Diary Entry is now marked as complete',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not mark Diary Entry as complete',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoading(false);
  };

  return (
    <Box>
      <CardNoShadow borderWidth="0.5px" rounded="lg" overflow="hidden" textAlign="center" minH="250px" w="100%" p="2" my="5" mx="1">
        <CenterColumnFlex mb="1" alignItems="center" justifyContent="center" justify="center">
          <Flex>
            {dateHighlighted ? <HeadingMd>Todays Workout</HeadingMd> : <HeadingMd>{Moment(programLogDay.date).format('dddd Do MMM YYYY')}</HeadingMd>}
          </Flex>
          <CenterRowFlex justifyContent="center">
            <PbIconButton
              label="Add a new exercise"
              Icon={BiDumbbell}
              color="blue.500"
              fontSize="25px"
              onClick={() => openModal(DayModalEnum.AddExercise)}
              isDisabled={contentDisabled}
            />
            <PbIconButton
              label="Complete Day"
              Icon={FaCheckCircle}
              color={programLogDay.completed ? 'green.500' : 'gray.500'}
              onClick={() => updateProgramLogDay()}
              isLoading={loading}
              isDisabled={dayEnabled || contentDisabled}
            />
            <PbIconButton
              label="Comment"
              Icon={FaRegCommentAlt}
              color={notesHighlighted ? 'green.500' : 'gray.500'}
              onClick={() => openModal(DayModalEnum.AddNotes)}
              isDisabled={contentDisabled}
            />
          </CenterRowFlex>
        </CenterColumnFlex>
        <Box p="2">
          {programLogDay && programLogDay.programLogExercises!.length <= 0 ? (
            <CenterColumnFlex mt="5">
              <TextXs>No exercises found, click the weight icon to get started!</TextXs>
            </CenterColumnFlex>
          ) : SCREEN_MOBILE ? (
            programLogDay.programLogExercises!.map((ple) => (
              <CenterRowFlex>
                <ProgramLogExerciseMobile ple={ple} date={programLogDay.date} />
              </CenterRowFlex>
            ))
          ) : (
            programLogDay.programLogExercises!.map((ple) => (
              <CenterRowFlex>
                <ProgramLogExerciseWeb ple={ple} date={programLogDay.date} />
              </CenterRowFlex>
            ))
          )}
        </Box>
      </CardNoShadow>
      <ProgramLogDayModalFactory
        isOpen={isModalOpen}
        onClose={onModalClose}
        modalType={modalOption}
        programLogDayId={programLogDay.programLogDayId!}
        comment={programLogDay.comment!}
      />
      {personalBests.length > 0 && (
        <PbModalDrawerForm title="Personal Best Hit! 🎉🎉" isOpen={personalBests.length > 0} onClose={() => setPersonalBests([])}>
          <NotifiyPersonalBestAlert personalBests={personalBests} setPersonalBests={setPersonalBests} />
        </PbModalDrawerForm>
      )}
    </Box>
  );
};

export default ProgramLogDayList;
