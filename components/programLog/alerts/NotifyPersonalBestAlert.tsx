import React, { Dispatch, SetStateAction } from 'react';
import { Button, Box } from '@chakra-ui/core';
import { ILiftingStat } from './../../../interfaces/liftingStats/index';
import { TextSm, ITextSm } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';

interface IProps {
  personalBests: ILiftingStat[];
  setPersonalBests: Dispatch<SetStateAction<ILiftingStat[]>>;
}

const NotifiyPersonalBestAlert: React.FC<IProps> = ({ personalBests, setPersonalBests }) => {
  return (
    <Box>
      <TextSm mb="4">Congrats! You have just hit a personal best on the following lifts:</TextSm>
      {personalBests.map((x) => (
        <TextSm p="1">
          {x.exerciseName} - {x.weight}kg - {x.repRange} Reps
        </TextSm>
      ))}
      <ITextSm mt="5">This has been automatically been updated in Personal Bests!</ITextSm>
      <CenterColumnFlex>
        <Button onClick={() => setPersonalBests([])}>Continue</Button>
      </CenterColumnFlex>
    </Box>
  );
};

export default NotifiyPersonalBestAlert;
