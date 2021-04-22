import axios from 'axios';
import React, { useState } from 'react';
import { DeleteWorkoutLogUrl } from '../../../api/account/workoutLog';
import useFireToast from '../../../hooks/useFireToast';
import { PbModalDrawer } from '../../common/ModalDrawers';
import { useWorkoutStateDisclosure } from '../store/workoutState';
import { useAppSelector } from '../../../store/index';
import { ModalForm } from '../../common/Modals';
import AddExerciseForm from '../forms/AddExerciseForm';
import AddWorkoutNoteForm from '../forms/AddWorkoutNoteForm';
import { UpdateWorkoutNoteUrl } from '../../../api/account/workoutDay';
import { useForm } from 'react-hook-form';

const AddWorkoutNoteDialog = () => {
  const workoutDay = useAppSelector((state) => state.workout?.workoutState?.workoutDay);
  const { isOpen, onClose } = useWorkoutStateDisclosure('deleteLog');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useFireToast();

  const { register, handleSubmit, formState } = useForm();

  const onAddNoteSubmit = async ({ note }) => {
    try {
      await axios.put(UpdateWorkoutNoteUrl(workoutDay?.workoutDayId, note));
      //UpdateDayNotes(note);
      toast.Success('Successfully added notes');
      //onAddWorkoutNoteClose();
    } catch (ex) {
      toast.Error('Could not add notes to workout');
    }
  };

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Add Workout Note">
      <AddWorkoutNoteForm note={workoutDay?.comment} register={register} loading={formState.isSubmitting} />
    </ModalForm>
  );
};

export default AddWorkoutNoteDialog;
