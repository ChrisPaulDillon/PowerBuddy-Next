import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormErrorMessage, FormControl, useToast } from '@chakra-ui/react';
import { CenterColumnFlex } from '../../layout/Flexes';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import axios from 'axios';
import { UpdateWorkoutExerciseNoteUrl } from '../../../api/account/workoutExercise';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import { ToastError, ToastSuccess } from '../../shared/Toasts';

interface IProps {
  onClose: () => void;
  workoutExerciseId: number;
  workoutDayId: number;
  note: string | undefined;
}

const AddExerciseNoteForm: React.FC<IProps> = ({ onClose, workoutExerciseId, note }) => {
  const { UpdateExerciseNotes } = useWorkoutContext();
  const toast = useToast();

  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = async ({ notes }: any) => {
    try {
      await axios.put(UpdateWorkoutExerciseNoteUrl(workoutExerciseId, notes));
      UpdateExerciseNotes(workoutExerciseId, notes);
      toast(ToastSuccess('Success', 'Successfully added notes'));
    } catch (ex) {
      toast(ToastError('Error', 'Could not add notes to exercise'));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex>
        <FormControl isInvalid={errors.notes}>
          <FormInput ref={register({ validate: validateInput })} name="notes" defaultValue={note} />
          <FormErrorMessage>{errors.notes && errors.notes.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="green" type="submit" ml={3} isLoading={formState.isSubmitting} mt="4">
          Add
        </Button>
      </CenterColumnFlex>
    </form>
  );
};

export default AddExerciseNoteForm;
