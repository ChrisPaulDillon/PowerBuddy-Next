import React, { useState } from 'react';
import { ModalForm } from '../../../common/Modals';
import { deleteExercise, useWorkoutStateDisclosure } from '../../store/workoutState';
import { FormLabel } from '@chakra-ui/react';
import { FormButton } from '../../../common/Buttons';
import { FormLayoutFlex } from '../../../layout/Flexes';
import axios from 'axios';
import { DeleteWorkoutExerciseUrl } from '../../../../api/account/workoutExercise';
import { useAppDispatch } from '../../../../store/index';
import useFireToast from '../../../../hooks/useFireToast';

interface IProps {
  workoutExerciseId: number;
  note?: string;
}

const DeleteExerciseDialog: React.FC<IProps> = ({ workoutExerciseId, note }) => {
  const { isOpen, onClose } = useWorkoutStateDisclosure('deleteExercise');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const toast = useFireToast();

  const deleteExerciseAsync = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(DeleteWorkoutExerciseUrl(workoutExerciseId));
      if (response.data) {
        dispatch(deleteExercise(workoutExerciseId));
      }
      toast.Success('Successfully Deleted Exercise');
      onClose();
    } catch (error) {
      toast.Error('Could not create Delete Exercise. Exercise has not been deleted');
    }
    setLoading(false);
  };

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Delete Exercise?">
      <FormLayoutFlex>
        <FormLabel textAlign="center">Are you sure? This cannot be undone</FormLabel>
        <FormButton colorScheme="red" onClick={async () => await deleteExerciseAsync()} isLoading={loading}>
          Delete
        </FormButton>
      </FormLayoutFlex>
    </ModalForm>
  );
};

export default DeleteExerciseDialog;
