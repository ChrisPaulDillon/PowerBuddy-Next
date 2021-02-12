import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { FormNumberInput } from '../../common/Inputs';
import { FormButton } from '../../common/Buttons';
import { PbStack } from '../../common/Stacks';
import { TextSm } from '../../common/Texts';
import axios from 'axios';
import { DeleteWorkoutSetUrl, UpdateWorkoutSetUrl } from '../../../api/account/workoutSet';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import { IWorkoutSet } from 'powerbuddy-shared';
import { ToastError, ToastSuccess } from '../../shared/Toasts';
import { Box } from '../../../chakra/Layout';

interface IProps {
  workoutDayId: number;
  workoutSet: IWorkoutSet;
  onClose: () => void;
}

const EditWorkoutSetForm: React.FC<IProps> = ({ workoutDayId, workoutSet, onClose }) => {
  const { weightLifted, noOfReps } = workoutSet;
  const toast = useToast();

  const [noOfRepsUpdated, setNoOfRepsUpdated] = useState<number>(noOfReps!);
  const [weightUpdated, setWeightUpdated] = useState<number>(weightLifted!);

  const { EditSet, DeleteSet, weightType } = useWorkoutContext();

  const { handleSubmit, formState } = useForm();

  const onEditSubmit = async () => {
    workoutSet.weightLifted = weightUpdated;
    workoutSet.noOfReps = noOfRepsUpdated;

    try {
      await axios.put(UpdateWorkoutSetUrl(workoutDayId), workoutSet);
      EditSet(workoutSet, workoutSet.workoutExerciseId);
      toast(ToastSuccess('Success', 'Successfully Updated Set'));
    } catch (ex) {
      toast(ToastError('Error', 'Could not update set, please try again later'));
    }
    onClose();
  };

  const onDeleteSubmit = async () => {
    const { workoutExerciseId, workoutSetId } = workoutSet!;
    try {
      await axios.delete(DeleteWorkoutSetUrl(workoutSetId!));
      DeleteSet(workoutSetId, workoutExerciseId);
      toast(ToastSuccess('Success', 'Successfully Deleted Set'));
    } catch (ex) {
      toast(ToastError('Error', 'Could not delete set, please try again later'));
    }
    onClose();
  };

  const updateWeight = (e: number) => {
    if (e) {
      setWeightUpdated(e);
    }
  };

  const updateReps = (e: number) => {
    if (e) {
      setNoOfRepsUpdated(e);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onEditSubmit)}>
        <PbStack>
          <TextSm minW="100px">Reps</TextSm>
          <FormNumberInput name="reps" defaultValue={noOfReps} onChange={(e: number) => updateReps(e)} />
        </PbStack>
        <PbStack>
          <TextSm minW="100px">Weight ({weightType})</TextSm>
          <FormNumberInput name="weight" defaultValue={weightLifted} onChange={(e: number) => updateWeight(e)} />
        </PbStack>
        <FormButton isLoading={formState.isSubmitting}>Update</FormButton>
      </form>
      <form onSubmit={handleSubmit(onDeleteSubmit)}>
        <FormButton isLoading={formState.isSubmitting} colorScheme="red" type="submit">
          Delete
        </FormButton>
      </form>
    </Box>
  );
};

export default EditWorkoutSetForm;
