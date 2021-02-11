import React from 'react';
import { useDisclosure, Flex } from '@chakra-ui/react';
import { HeadingMd, TextSm } from '../common/Texts';
import moment from 'moment';
import { CenterColumnFlex, CenterRowFlex } from '../layout/Flexes';
import { PbStack } from '../common/Stacks';
import { CardSm } from '../layout/Card';
import { CgArrowTopRight } from 'react-icons/all';
import PbIconButton from '../common/IconButtons';
import { TrashIconButton } from '../shared/IconButtons';
import { DeleteLogModalDrawer } from '../shared/ModalDrawers';
import { TagExerciseCount, TagProgramDaysCount, TagProgramWeeksCount } from '../shared/Tags';
import { BadgeCompleted, BadgeInProgress } from '../shared/Badges';
import { useRouter } from 'next/router';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { Box } from '../../chakra/Layout';

const LogHistoryList = ({ workoutLogStats }) => {
  if (workoutLogStats.length <= 0) return <TextSm>No individual templates found, have you created one yet?</TextSm>;

  return (
    <CenterRowFlex p="4">
      {workoutLogStats.map((workoutLog) => (
        <LogHistorySingle workoutLog={workoutLog} />
      ))}
    </CenterRowFlex>
  );
};

const LogHistorySingle = ({ workoutLog }) => {
  const router = useRouter();
  const { isOpen: isDeleteLogOpen, onOpen: onDeleteLogOpen, onClose: onDeleteLogClose } = useDisclosure();
  const { customName, templateName, startDate, endDate, noOfWeeks, dayCount, exerciseCount, workoutLogId } = workoutLog;
  return (
    <CardSm m="4">
      <PbStack>
        <Box>{moment(endDate).isAfter(new Date()) ? <BadgeInProgress /> : <BadgeCompleted />}</Box>
        <HeadingMd pt={1}>{customName ?? templateName}</HeadingMd>
        <Flex>
          <TrashIconButton label="Delete Diary" onClick={onDeleteLogOpen} isDisabled={false} />
          <PbIconButton Icon={CgArrowTopRight} label="View This Program" onClick={() => router.push(`${WORKOUT_DIARY_URL}/${workoutLogId}`)} />
        </Flex>
      </PbStack>
      <CenterColumnFlex>
        {' '}
        <TextSm py={2}>
          {' '}
          {moment(startDate).format('DD/MM/YYYY')} - {moment(endDate).format('DD/MM/YYYY')}
        </TextSm>
        <Flex py={2}>
          <Box px={1}>
            <TagProgramWeeksCount body={`${noOfWeeks} Weeks`} />
          </Box>
          <Box px={1}>
            <TagProgramDaysCount body={`${dayCount} Days`} />
          </Box>
          <Box px={1}>
            <TagExerciseCount body={`${exerciseCount} Exercises`} />
          </Box>
        </Flex>
      </CenterColumnFlex>
      {isDeleteLogOpen && <DeleteLogModalDrawer isOpen={isDeleteLogOpen} onClose={onDeleteLogClose} workoutLogId={workoutLogId} />}
    </CardSm>
  );
};

export default LogHistoryList;
