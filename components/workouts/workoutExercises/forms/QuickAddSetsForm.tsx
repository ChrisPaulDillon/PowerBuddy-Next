import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormButton } from '../../../common/Buttons';
import { FormNumberInput } from '../../../common/Inputs';
import { CreateWorkoutSetCollectionUrl } from '../../../../api/account/workoutSet';
import { useWorkoutContext } from '../../WorkoutContext';
import Axios from 'axios';
import { IWorkoutExercise, IWorkoutSet } from 'powerbuddy-shared';
import { FormLayoutFlex } from '../../../layout/Flexes';
import { FormLabel } from '../../../../chakra/Forms';
import useFireToast from '../../../../hooks/useFireToast';
import { useAppSelector } from '../../../../store';
import { useAppDispatch } from '../../../../store/index';
import { modalOnClose, quickAddSets } from '../../store/workoutState';

interface IProps {
  workoutExercise: IWorkoutExercise;
  suggestedReps: number;
  suggestedWeight: number;
  totalSets: number;
}

const QuickAddSetsForm: React.FC<IProps> = ({ workoutExercise, suggestedReps, suggestedWeight, totalSets }) => {
  const toast = useFireToast();
  const { handleSubmit, formState } = useForm();
  const kgOrLbs = useAppSelector((state) => state.workout.workoutState.kgOrLbs);

  const [noOfSets, setNoOfSets] = useState<number>(1);
  const [noOfReps, setNoOfReps] = useState<number>(suggestedReps);
  const [weight, setWeight] = useState<number>(suggestedWeight);

  const { QuickAddSetsToExercise } = useWorkoutContext();

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    let newTotalSets = Number(noOfSets) + Number(totalSets);
    if (newTotalSets > 15) {
      toast.Warning('Only a maximum of 15 sets can be added to an exercise');
      return;
    }

    let workoutSets: IWorkoutSet[] = [];

    for (var index = 0; index < noOfSets; index++) {
      const workoutSet: IWorkoutSet = {
        workoutExerciseId: workoutExercise.workoutExerciseId,
        noOfReps: noOfReps,
        weightLifted: weight,
      };
      workoutSets = [...workoutSets, workoutSet];
    }

    try {
      const response = await Axios.post(CreateWorkoutSetCollectionUrl(), workoutSets);
      dispatch(quickAddSets(response.data));
      toast.Success('Successfully added set');
      dispatch(modalOnClose('quickAddSets'));
    } catch (ex) {
      toast.Error('Could not add sets');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLayoutFlex>
        <FormLabel>Sets</FormLabel>
        <FormNumberInput defaultValue={1} onChange={(e: number) => setNoOfSets(e)} />
      </FormLayoutFlex>
      <FormLayoutFlex>
        <FormLabel>Reps</FormLabel>
        <FormNumberInput defaultValue={suggestedReps} onChange={(e: number) => setNoOfReps(e)} />
      </FormLayoutFlex>
      <FormLayoutFlex>
        <FormLabel>Weight ({kgOrLbs})</FormLabel>
        <FormNumberInput defaultValue={suggestedWeight} onChange={(e: number) => setWeight(e)} />
      </FormLayoutFlex>
      <FormButton isLoading={formState.isSubmitting}>Add</FormButton>
    </form>
  );
};

export default QuickAddSetsForm;
