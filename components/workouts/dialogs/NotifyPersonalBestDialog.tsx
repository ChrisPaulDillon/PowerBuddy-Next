import React from 'react';
import { setPersonalBests, useWorkoutStateDisclosure } from '../store/workoutState';
import { useAppSelector, useAppDispatch } from '../../../store/index';
import { ModalForm } from '../../common/Modals';
import { FormLabel } from '../../../chakra/Forms';
import { Box, Button } from '@chakra-ui/react';
import { TextSm, ITextSm } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';

const NotifyPersonalBestDialog = () => {
  const personalBests = useAppSelector((state) => state.workout?.workoutState?.personalBests);
  const kgOrLbs = useAppSelector((state) => state.workout.workoutState.kgOrLbs);

  const dispatch = useAppDispatch();

  return (
    <ModalForm isOpen={personalBests.length > 0} onClose={() => dispatch(setPersonalBests([]))} title="Personal Best Hit! 🎉🎉">
      <Box>
        <FormLabel mb="4">Congrats! You have just hit a personal best on the following lifts:</FormLabel>
        {personalBests.map((x, idx) => (
          <TextSm p="1" key={idx}>
            {x.exerciseName} - {x.weight}
            {kgOrLbs} - {x.repRange} Reps
          </TextSm>
        ))}
        <ITextSm mt={6}>This has been automatically been updated in Personal Bests!</ITextSm>
        <CenterColumnFlex>
          <Button onClick={() => setPersonalBests([])}>Continue</Button>
        </CenterColumnFlex>
      </Box>
    </ModalForm>
  );
};

export default NotifyPersonalBestDialog;
