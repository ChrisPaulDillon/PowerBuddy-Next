import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormErrorMessage, FormControl, useToast } from '@chakra-ui/react';
import { CenterColumnFlex } from '../../layout/Flexes';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import axios from 'axios';
import { UpdateWorkoutNoteUrl } from '../../../api/account/workoutDay';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import { ToastError, ToastSuccess } from '../../shared/Toasts';
import { Box } from '../../../chakra/Layout';

interface IProps {
  onClose: () => void;
  workoutDayId: number;
  note: string | undefined;
}

const AddWorkoutNoteForm: React.FC<IProps> = ({ note, workoutDayId, onClose }) => {
  const { UpdateDayNotes } = useWorkoutContext();
  const toast = useToast();

  const onSubmit = async ({ notes }: any) => {
    try {
      await axios.put(UpdateWorkoutNoteUrl(workoutDayId, notes));
      UpdateDayNotes(notes);
      toast(ToastSuccess('Success', 'Successfully added notes'));
    } catch (ex) {
      toast(ToastError('Error', 'Could not add notes to workout'));
    }
    onClose();
  };

  const { register, handleSubmit, errors, formState } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex p="1" mt="1" justifyContent="center">
        <FormControl isInvalid={errors.notes}>
          <FormInput ref={register({ validate: validateInput })} name="notes" defaultValue={note} />
          <FormErrorMessage>{errors.notes && errors.notes.message}</FormErrorMessage>
        </FormControl>
        <Box mt="3">
          <Button colorScheme="green" type="submit" ml={3} isLoading={formState.isSubmitting}>
            Add
          </Button>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default AddWorkoutNoteForm;
