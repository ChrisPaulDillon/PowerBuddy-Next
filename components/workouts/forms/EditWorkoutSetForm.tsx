import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormNumberInput } from '../../common/Inputs';
import { FormButton } from '../../common/Buttons';
import axios from 'axios';
import { DeleteWorkoutSetUrl, UpdateWorkoutSetUrl } from '../../../api/account/workoutSet';
import { IWorkoutSet } from 'powerbuddy-shared';
import { Box } from '../../../chakra/Layout';
import { FormLayoutFlex } from '../../layout/Flexes';
import { FormLabel } from '../../../chakra/Forms';
import useFireToast from '../../../hooks/useFireToast';
import { useAppSelector } from '../../../store';
import { useAppDispatch } from '../../../store/index';
import { deleteSet, editSet, modalOnClose } from '../store/workoutState';

interface IProps {
  workoutSet: IWorkoutSet;
}

export interface IUpdateSetAction {
  workoutSet: IWorkoutSet;
  workoutExerciseId: number;
}

export interface IDeleteSetAction {
  workoutSetId: number;
  workoutExerciseId: number;
}


  const EditWorkoutSetForm: React.FC<IProps> = ({ workoutSet}) => {
  const workoutDay = useAppSelector((state) => state.workout?.workoutState?.workoutDay);
  const { weightLifted, noOfReps } = workoutSet;
  const toast = useFireToast();
  const kgOrLbs = useAppSelector((state) => state.workout.workoutState.kgOrLbs);
  const [noOfRepsUpdated, setNoOfRepsUpdated] = useState<number>(noOfReps);
  const [weightUpdated, setWeightUpdated] = useState<number>(weightLifted);

  const { handleSubmit, formState } = useForm();

  const dispatch = useAppDispatch();

  const onEditSubmit = async () => {
    const updatedWorkoutSet = {...workoutSet, weightLifted: weightUpdated, noOfReps: noOfRepsUpdated}

    try {
      await axios.put(UpdateWorkoutSetUrl(workoutDay?.workoutDayId), updatedWorkoutSet);
      dispatch(editSet({workoutSet: updatedWorkoutSet, workoutExerciseId: updatedWorkoutSet.workoutExerciseId} as IUpdateSetAction));
      toast.Success('Successfully Updated Set');
      dispatch(modalOnClose('updateSet'));
    } catch (ex) {
      toast.Error('Could not update set, please try again later');
    }
  };

  const onDeleteSubmit = async () => {
    const { workoutExerciseId, workoutSetId } = workoutSet;
    try {
      await axios.delete(DeleteWorkoutSetUrl(workoutSetId));
      dispatch(deleteSet({workoutSetId, workoutExerciseId} as IDeleteSetAction));
      toast.Success('Successfully deleted set');
      dispatch(modalOnClose('updateSet'));
    } catch (ex) {
      toast.Error('Could not delete set, please try again later');
    }
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
        <FormLayoutFlex>
          <FormLabel minW="100px">Reps</FormLabel>
          <FormNumberInput name="reps" defaultValue={noOfReps} onChange={(e: number) => updateReps(e)} />
        </FormLayoutFlex>
        <FormLayoutFlex>
          <FormLabel minW="100px">Weight ({kgOrLbs})</FormLabel>
          <FormNumberInput name="weight" defaultValue={weightLifted} onChange={(e: number) => updateWeight(e)} />
        </FormLayoutFlex>
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
