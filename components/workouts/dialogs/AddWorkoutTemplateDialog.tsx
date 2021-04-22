import axios from 'axios';
import React, { useState } from 'react';
import { DeleteWorkoutLogUrl } from '../../../api/account/workoutLog';
import useFireToast from '../../../hooks/useFireToast';
import { useWorkoutStateDisclosure } from '../store/workoutState';
import { useAppSelector } from '../../../store/index';
import { ModalForm } from '../../common/Modals';
import AddWorkoutTemplateForm from '../forms/AddWorkoutTemplateForm';

const AddWorkoutTemplateDialog = () => {
  const workoutDay = useAppSelector((state) => state.workout?.workoutState?.workoutDay);
  const { isOpen, onClose } = useWorkoutStateDisclosure('deleteLog');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useFireToast();

  const deleteLog = async () => {
    setLoading(true);
    try {
      await axios.delete(DeleteWorkoutLogUrl(workoutDay?.workoutLogId));
      toast.Success('Successfully Deleted Diary Entry');
      onClose();
    } catch (error) {
      toast.Error('Could not create Diary Log, please try again later');
    }
    setLoading(false);
  };

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Add Workout Template">
      <AddWorkoutTemplateForm />
    </ModalForm>
  );
};

export default AddWorkoutTemplateDialog;
