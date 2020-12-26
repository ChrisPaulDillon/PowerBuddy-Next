import React, { useState } from 'react';
import { Button, Box, useToast } from '@chakra-ui/core';
import { TextSm } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import axios from 'axios';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import { DeleteWorkoutExerciseUrl } from '../../../api/account/workoutExercise';

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
      toast({
        title: 'Success',
        description: 'Successfully Deleted Exercise',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not create Delete Exercise. Exercise has not been deleted',
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
      <CenterColumnFlex>
        <TextSm>Are you sure? This cannot be undone</TextSm>
        <Button mt="4" colorScheme="red" onClick={async () => await deleteExercise()} ml={3} isLoading={loading}>
          Delete
        </Button>
      </CenterColumnFlex>
    </Box>
  );
};

export default DeleteWorkoutExerciseAlert;