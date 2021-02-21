import axios from 'axios';
import React, { useState } from 'react';
import { DeleteWorkoutLogUrl } from '../../api/account/workoutLog';
import { PbModalDrawer } from '../../components/common/ModalDrawers';
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
  const toast = useFireToast();

  const deleteLog = async () => {
    setLoading(true);
    try {
      await axios.delete(DeleteWorkoutLogUrl(workoutLogId));
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
