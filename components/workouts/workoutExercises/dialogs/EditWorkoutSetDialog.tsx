import { IWorkoutSet } from 'powerbuddy-shared/lib';
import React from 'react';
import { ModalDrawerForm } from '../../../common/ModalDrawers';
import { useWorkoutStateDisclosure } from '../../store/workoutState';
import EditWorkoutSetForm from '../forms/EditWorkoutSetForm';

interface IProps {
  workoutSet: IWorkoutSet;
}

const EditWorkoutSetDialog: React.FC<IProps> = ({ workoutSet }) => {
  const { isOpen, onClose } = useWorkoutStateDisclosure('updateSet');
  return (
    <ModalDrawerForm isOpen={isOpen} onClose={onClose} title="Edit Your Set">
      <EditWorkoutSetForm workoutSet={workoutSet} />
    </ModalDrawerForm>
  );
};

export default EditWorkoutSetDialog;
