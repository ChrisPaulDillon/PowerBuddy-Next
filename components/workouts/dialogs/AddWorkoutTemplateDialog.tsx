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
  const { isOpen, onClose } = useWorkoutStateDisclosure('addWorkoutTemplate');
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useFireToast();

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Add Workout Template">
      <AddWorkoutTemplateForm />
    </ModalForm>
  );
};

export default AddWorkoutTemplateDialog;
