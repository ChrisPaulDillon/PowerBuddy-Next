import React from 'react';
import { useForm } from 'react-hook-form';

import { FormLayoutFlex } from '../../layout/Flexes';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import axios from 'axios';
import { UpdateWorkoutNoteUrl } from '../../../api/account/workoutDay';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import { FormControl, FormErrorMessage } from '../../../chakra/Forms';
import { FormButton } from '../../common/Buttons';
import useFireToast from '../../../hooks/useFireToast';

interface IProps {
  onClose: () => void;
  workoutDayId: number;
  note: string | undefined;
}

const AddWorkoutNoteForm: React.FC<IProps> = ({ note, workoutDayId, onClose }) => {
  const { UpdateDayNotes } = useWorkoutContext();
  const toast = useFireToast();

  const onSubmit = async ({ notes }: any) => {
    try {
      await axios.put(UpdateWorkoutNoteUrl(workoutDayId, notes));
      UpdateDayNotes(notes);
      toast.Success('Successfully added notes');
    } catch (ex) {
      toast.Error('Could not add notes to workout');
    }
    onClose();
  };

  const { register, handleSubmit, errors, formState } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.notes}>
        <FormLayoutFlex>
          <FormInput ref={register({ validate: validateInput })} name="notes" defaultValue={note} />
          <FormErrorMessage>{errors.notes && errors.notes.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormButton isLoading={formState.isSubmitting}>Add</FormButton>
    </form>
  );
};

export default AddWorkoutNoteForm;
