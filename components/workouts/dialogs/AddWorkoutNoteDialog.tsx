import axios from 'axios';
import React from 'react';
import useFireToast from '../../../hooks/useFireToast';
import { modalOnClose, updateDayNote, useWorkoutStateDisclosure } from '../store/workoutState';
import { useAppSelector, useAppDispatch } from '../../../store/index';
import { ModalForward } from '../../common/Modals';
import AddWorkoutNoteForm from '../forms/AddWorkoutNoteForm';
import { UpdateWorkoutNoteUrl } from '../../../api/account/workoutDay';
import { useForm } from 'react-hook-form';

const AddWorkoutNoteDialog = () => {
  const workoutDay = useAppSelector((state) => state.workout?.workoutState?.workoutDay);
  const { isOpen, onClose } = useWorkoutStateDisclosure('addWorkoutNote');
  const toast = useFireToast();

  const { register, handleSubmit, formState } = useForm();
  const dispatch = useAppDispatch();

  const onAddNoteSubmit = async ({ note }) => {
    try {
      await axios.put(UpdateWorkoutNoteUrl(workoutDay?.workoutDayId, note));
      dispatch(updateDayNote(note));
      dispatch(modalOnClose('addWorkoutNote'));
      toast.Success('Successfully added notes');
      //onAddWorkoutNoteClose();
    } catch (ex) {
      toast.Error('Could not add notes to workout');
    }
  };

  return (
    <ModalForward isOpen={isOpen} onClose={onClose} title="Add Workout Note" onClick={() => onAddNoteSubmit} actionText="Submit">
      <AddWorkoutNoteForm note={workoutDay?.comment} register={register} loading={formState.isSubmitting} />
    </ModalForward>
  );
};

export default AddWorkoutNoteDialog;