import { ModalForm } from '../../common/Modals';
import AddExerciseForm from '../forms/AddExerciseForm';
import { useWorkoutStateDisclosure } from '../store/workoutState';

const AddExerciseDialog = () => {
  const { isOpen, onClose } = useWorkoutStateDisclosure('addExercise');

  return (
    <ModalForm isOpen={isOpen} onClose={onClose} title="Add an Exercise">
      <AddExerciseForm />
    </ModalForm>
  );
};

export default AddExerciseDialog;
