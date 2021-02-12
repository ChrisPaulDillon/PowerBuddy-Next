import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { FormLayoutFlex } from '../../layout/Flexes';
import axios from 'axios';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import { DeleteWorkoutExerciseUrl } from '../../../api/account/workoutExercise';
import { ToastError, ToastSuccess } from '../../shared/Toasts';
import { FormButton } from '../../common/Buttons';
import { FormLabel } from '../../../chakra/Forms';

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
    <FormLayoutFlex>
      <FormLabel textAlign="center">Are you sure? This cannot be undone</FormLabel>
      <FormButton colorScheme="red" onClick={async () => await deleteExercise()} isLoading={loading}>
        Delete
      </FormButton>
    </FormLayoutFlex>
  );
};

export default DeleteWorkoutExerciseAlert;
