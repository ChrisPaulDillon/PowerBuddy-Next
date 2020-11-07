import { IProgramLogRepScheme } from '../../interfaces/programLogs';
import React, { useState, memo, useCallback, useEffect, useRef } from 'react';
import { Box, Stack, useDisclosure } from '@chakra-ui/core';
import EditRepScheme from './forms/EditRepSchemeForm';
import moment from 'moment';
import RepSchemeTagFactory, { RepSchemeTagEnum } from './factories/RepSchemeTagFactory';
import { PbModalDrawerForm } from '../common/ModalDrawer';

interface IRepSchemeProps {
  key?: any;
  repScheme: IProgramLogRepScheme;
  date: Date;
  repSchemes: IProgramLogRepScheme[];
  programLogDayId: number;
}

const ProgramLogRepScheme: React.FC<IRepSchemeProps> = memo(({ repScheme, date, repSchemes = [], programLogDayId }) => {
  const { programLogRepSchemeId, weightLifted, noOfReps, repsCompleted, personalBest } = repScheme;
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
  }, [repScheme]);

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

    repSchemes.map((e) => {
      if (e.programLogRepSchemeId! === programLogRepSchemeId!) {
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
      <PbModalDrawerForm isOpen={isOpen} onClose={onClose} title="Edit Your Set">
        <EditRepScheme programLogDayId={programLogDayId!} programLogRepScheme={repScheme} onClose={onClose} />
      </PbModalDrawerForm>
    </Box>
  );
});

export default ProgramLogRepScheme;
