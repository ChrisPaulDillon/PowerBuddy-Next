import axios from 'axios';
import React, { useState } from 'react';
import { DeleteWorkoutLogUrl } from '../../../api/account/workoutLog';
import useFireToast from '../../../hooks/useFireToast';
import { PbModalDrawer } from '../../common/ModalDrawers';
import { useWorkoutStateDisclosure } from '../store/workoutState';
import { useAppSelector } from '../../../store/index';

const DeleteWorkoutLogDialog = () => {
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
    <PbModalDrawer
      title="Delete Diary Entry"
      isOpen={isOpen}
      onClose={onClose}
      actionText="Delete Log"
      actionColour="red"
      onClick={deleteLog}
      loading={loading}
      body="Are you sure? This cannot be undone"
    />
  );
};

export default DeleteWorkoutLogDialog;
