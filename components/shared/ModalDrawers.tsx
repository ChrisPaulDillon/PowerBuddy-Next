import React, { useState } from 'react';
import { PbModalDrawer } from '../common/ModalDrawer';
import { useProgramLogContext } from '../programLog/ProgramLogContext';
import { useToast } from '@chakra-ui/core';
import Axios from 'axios';
import { DeleteWorkoutLogUrl } from '../../api/account/workoutLog';

interface IModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IDeleteLogModalDrawerProps extends IModalDrawerProps {
  workoutLogId: number;
}

export const DeleteLogModalDrawer: React.FC<IDeleteLogModalDrawerProps> = ({ isOpen, onClose, workoutLogId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { DeleteLog } = useProgramLogContext();
  const toast = useToast();

  const deleteLog = async () => {
    setLoading(true);
    const response = await Axios.delete(DeleteWorkoutLogUrl(workoutLogId));
    try {
      toast({
        title: 'Success',
        description: 'Successfully Deleted Diary Entry',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
      DeleteLog();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not create Diary Log, please try again later',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
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
