import React from 'react';
import { ModalForm } from '../../../common/Modals';
import { useWorkoutStateDisclosure } from '../../store/workoutState';
import DeleteWorkoutExerciseAlert from '../../alerts/DeleteWorkoutExerciseAlert';

interface IProps {
  workoutExerciseId: number;
  note?: string;
}

const DeleteExerciseDialog: React.FC<IProps> = ({ workoutExerciseId, note }) => {
  const { isOpen, onClose } = useWorkoutStateDisclosure('deleteExercise');

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Delete Exercise?">
      <DeleteWorkoutExerciseAlert workoutExerciseId={workoutExerciseId} onClose={onClose} />
    </ModalForm>
  );
};

export default DeleteExerciseDialog;
