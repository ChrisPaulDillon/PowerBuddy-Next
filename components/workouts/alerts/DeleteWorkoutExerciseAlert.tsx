import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { TextSm } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import axios from 'axios';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import { DeleteWorkoutExerciseUrl } from '../../../api/account/workoutExercise';
import { ToastError, ToastSuccess } from '../../shared/Toasts';
import { Box } from '../../../chakra/Layout';
import { FormButton } from '../../common/Buttons';

interface IProps {
  onClose: () => void;
  workoutExerciseId: number;
}

const DeleteWorkoutExerciseAlert: React.FC<IProps> = ({ onClose, workoutExerciseId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { DeleteExercise } = useWorkoutContext();
  const toast = useToast();

  const deleteExercise = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(DeleteWorkoutExerciseUrl(workoutExerciseId));
      if (response.data) {
        DeleteExercise(workoutExerciseId);
      }
      toast(ToastSuccess('Success', 'Successfully Deleted Exercise'));
      onClose();
    } catch (error) {
      toast(ToastError('Error', 'Could not create Delete Exercise. Exercise has not been deleted'));
    }
    setLoading(false);
  };

  return (
    <Box>
      <CenterColumnFlex>
        <TextSm>Are you sure? This cannot be undone</TextSm>
        <FormButton colorScheme="red" onClick={async () => await deleteExercise()} ml={3} isLoading={loading}>
          Delete
        </FormButton>
      </CenterColumnFlex>
    </Box>
  );
};

export default DeleteWorkoutExerciseAlert;
