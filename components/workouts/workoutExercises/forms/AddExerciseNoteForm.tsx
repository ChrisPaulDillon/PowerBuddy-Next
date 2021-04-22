import React from 'react';
import { useForm } from 'react-hook-form';
import { validateInput } from '../../../../util/formInputs';
import { FormInput } from '../../../common/Inputs';
import axios from 'axios';
import { UpdateWorkoutExerciseNoteUrl } from '../../../../api/account/workoutExercise';
import { useWorkoutContext } from '../../WorkoutContext';
import { FormControl, FormErrorMessage } from '../../../../chakra/Forms';
import { FormButton } from '../../../common/Buttons';
import { FormLayoutFlex } from '../../../layout/Flexes';
import useFireToast from '../../../../hooks/useFireToast';
import { useAppDispatch } from '../../../../store/index';
import { modalOnClose, updateExerciseNote } from '../../store/workoutState';

export interface UpdateExerciseNoteAction {
  workoutExerciseId: number;
  notes: string;
}

interface IProps {
  workoutExerciseId: number;
  note: string | undefined;
}

const AddExerciseNoteForm: React.FC<IProps> = ({ workoutExerciseId, note }) => {
  const toast = useFireToast();

  const { register, handleSubmit, errors, formState } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = async ({ notes }: any) => {
    try {
      await axios.put(UpdateWorkoutExerciseNoteUrl(workoutExerciseId, notes));
      dispatch(updateExerciseNote({ workoutExerciseId, notes } as UpdateExerciseNoteAction));
      dispatch(modalOnClose('addExerciseNote'));
      toast.Success('Successfully added notes');
    } catch (ex) {
      toast.Error('Could not add notes to exercise');
    }
  };

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

export default AddExerciseNoteForm;
