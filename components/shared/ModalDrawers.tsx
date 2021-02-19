import React, { useState } from 'react';
import { PbModalDrawer } from '../common/ModalDrawers';

import Axios from 'axios';
import { DeleteWorkoutLogUrl } from '../../api/account/workoutLog';
import { useWorkoutContext } from '../workouts/WorkoutContext';
import useFireToast from '../../hooks/useFireToast';

interface IModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IDeleteLogModalDrawerProps extends IModalDrawerProps {
  workoutLogId: number;
}

export const DeleteLogModalDrawer: React.FC<IDeleteLogModalDrawerProps> = ({ isOpen, onClose, workoutLogId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { DeleteDay } = useWorkoutContext();
  const toast = useFireToast();

  const deleteLog = async () => {
    setLoading(true);
    const response = await Axios.delete(DeleteWorkoutLogUrl(workoutLogId));
    try {
      toast.Success('Successfully Deleted Diary Entry');
      //DeleteLog();
    } catch (error) {
      toast.Error('Could not create Diary Log, please try again later');
    }
    setLoading(false);
    onClose();
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
      body="Are you sure? This cannot be undone"></PbModalDrawer>
  );
};
