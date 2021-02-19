import React from 'react';
import { FaCrown, FaBan } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { Button, IconButton } from '../../../chakra/Forms';
import { Box } from '../../../chakra/Layout';
import PbTag from '../../common/Tags';
import { TextRep } from '../../common/Texts';
import { PbToolTip } from '../../common/ToolTips';
import { useWorkoutContext } from '../WorkoutContext';

export enum RepSchemeTagEnum {
  PersonalBest,
  Normal,
  Disabled,
  BodyWeight,
  None,
}

interface IProps {
  weightLifted: number;
  noOfReps: number;
  currentReps: number;
  repColor: string;
  repTagType: RepSchemeTagEnum;
  setEditRepAlert: any;
  setRepsAchieved: any;
}

const RepSchemeTagFactory: React.FC<IProps> = ({ weightLifted, noOfReps, currentReps, repColor, repTagType, setEditRepAlert, setRepsAchieved }) => {
  return (
    <Box>
      {
        {
          [RepSchemeTagEnum.PersonalBest]: <PersonalBestRepSchemeTag weightLifted={weightLifted} noOfReps={noOfReps} />,
          [RepSchemeTagEnum.Disabled]: <DisabledRepSchemeTag setEditRepAlert={setEditRepAlert} weightLifted={weightLifted} noOfReps={noOfReps} />,
          [RepSchemeTagEnum.Normal]: (
            <NormalRepSchemeTag
              setEditRepAlert={setEditRepAlert}
              setRepsAchieved={setRepsAchieved}
              weightLifted={weightLifted}
              noOfReps={noOfReps}
              currentReps={currentReps}
              repColor={repColor}
            />
          ),
          [RepSchemeTagEnum.None]: <Box />,
        }[repTagType]
      }
    </Box>
  );
};

const NormalRepSchemeTag = ({ setEditRepAlert, setRepsAchieved, weightLifted, noOfReps, currentReps, repColor }: any) => {
  const { contentDisabled, weightType } = useWorkoutContext();

  return (
    <PbTag rounded="full" maxH="25px">
      {!contentDisabled && (
        <IconButton as={MdModeEdit} aria-label="" size="1em" onClick={() => (!contentDisabled ? setEditRepAlert(true) : null)} color="gray" />
      )}
      <TextRep
        minW={[
          '65px', // 0-30em
          '70px', // 30em-48em
          '80px', // 48em-62em
          '80px', // 62em+
        ]}>
        {weightLifted <= 0 ? 'BW x' : weightLifted + `${weightType} x`}
        {noOfReps}
      </TextRep>
      <PbToolTip label="Click to set how many reps were achieved on this set">
        <Button size="xs" rounded="50px" onClick={() => (!contentDisabled ? setRepsAchieved() : null)} colorScheme={repColor} bgColor={repColor}>
          <TextRep>{currentReps}</TextRep>
        </Button>
      </PbToolTip>
    </PbTag>
  );
};

const PersonalBestRepSchemeTag = ({ weightLifted, noOfReps }: any) => {
  const { weightType } = useWorkoutContext();

  return (
    <PbTag rounded="full" maxH="25px">
      <TextRep
        minW={[
          '65px', // 0-30em
          '70px', // 30em-48em
          '80px', // 48em-62em
          '80px', // 62em+
        ]}>
        {weightLifted}
        {weightType} x{noOfReps}
      </TextRep>
      <PbToolTip label="New Lifetime PR Hit!">
        <IconButton icon={<FaCrown />} colorScheme="yellow" fontSize="17px" aria-label="" isRound variant="ghost" size="sm" />
      </PbToolTip>
    </PbTag>
  );
};

const DisabledRepSchemeTag = ({ setEditRepAlert, weightLifted, noOfReps }: any) => {
  const { weightType } = useWorkoutContext();

  return (
    <PbTag rounded="full" maxH="25px">
      <IconButton as={MdModeEdit} aria-label="" size="1em" onClick={() => setEditRepAlert(true)} />
      <TextRep
        minW={[
          '65px', // 0-30em
          '70px', // 30em-48em
          '80px', // 48em-62em
          '80px', // 62em+
        ]}>
        {weightLifted}
        {weightType} x{noOfReps}
      </TextRep>
      <PbToolTip label="Cannot mark future exercises">
        <IconButton icon={<FaBan />} fontSize="15px" aria-label="" variant="ghost" size="sm" isRound />
      </PbToolTip>
    </PbTag>
  );
};

export default RepSchemeTagFactory;
