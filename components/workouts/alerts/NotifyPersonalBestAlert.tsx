import React, { Dispatch, SetStateAction } from 'react';
import { TextSm, ITextSm } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { ILiftingStat } from 'powerbuddy-shared';
import { useWorkoutContext } from '../WorkoutContext';
import { Box } from '../../../chakra/Layout';
import { Button, FormLabel } from '../../../chakra/Forms';

interface IProps {
  personalBests: ILiftingStat[];
  setPersonalBests: Dispatch<SetStateAction<ILiftingStat[]>>;
}

const NotifiyPersonalBestAlert: React.FC<IProps> = ({ personalBests, setPersonalBests }) => {
  const { weightType } = useWorkoutContext();
  return (
    <Box>
      <FormLabel mb="4">Congrats! You have just hit a personal best on the following lifts:</FormLabel>
      {personalBests.map((x, idx) => (
        <TextSm p="1" key={idx}>
          {x.exerciseName} - {x.weight}
          {weightType} - {x.repRange} Reps
        </TextSm>
      ))}
      <ITextSm mt={6}>This has been automatically been updated in Personal Bests!</ITextSm>
      <CenterColumnFlex>
        <Button onClick={() => setPersonalBests([])}>Continue</Button>
      </CenterColumnFlex>
    </Box>
  );
};

export default NotifiyPersonalBestAlert;
