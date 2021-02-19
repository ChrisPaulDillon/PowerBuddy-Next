import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { FormButton } from '../../common/Buttons';
import { FormNumberInput } from '../../common/Inputs';
import { CreateWorkoutSetCollectionUrl } from '../../../api/account/workoutSet';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import Axios from 'axios';
import { IWorkoutExercise, IWorkoutSet } from 'powerbuddy-shared';
import { ToastError, ToastSuccess } from '../../shared/Toasts';
import { FormLayoutFlex } from '../../layout/Flexes';
import { FormLabel } from '../../../chakra/Forms';
import { ToastCustomSuccess } from '../../common/CustomToasts';

interface IProps {
  workoutExercise: IWorkoutExercise;
  suggestedReps: number;
  suggestedWeight: number;
  totalSets: number;
  onClose: () => void;
}

const QuickAddSetsForm: React.FC<IProps> = ({ workoutExercise, suggestedReps, suggestedWeight, totalSets, onClose }) => {
  const toast = useToast();
  const { handleSubmit, formState } = useForm();
  const { weightType } = useWorkoutContext();

  const [noOfSets, setNoOfSets] = useState<number>(1);
  const [noOfReps, setNoOfReps] = useState<number>(suggestedReps);
  const [weight, setWeight] = useState<number>(suggestedWeight);

  const { QuickAddSetsToExercise } = useWorkoutContext();

  const onSubmit = async () => {
    let newTotalSets = Number(noOfSets) + Number(totalSets);
    if (newTotalSets > 15) {
      toast({
        title: 'Warning',
        description: 'Only a maximum of 15 sets can be added to an exercise',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
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
      QuickAddSetsToExercise(response.data, workoutExercise.workoutExerciseId);
      toast({
        position: 'top-left',
        render: () => <ToastCustomSuccess description="Successfully added sets" />,
      });
      onClose();
    } catch (ex) {
      toast(ToastError('Error', 'Could not add sets!'));
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
        <FormLabel>Weight ({weightType})</FormLabel>
        <FormNumberInput defaultValue={suggestedWeight} onChange={(e: number) => setWeight(e)} />
      </FormLayoutFlex>
      <FormButton isLoading={formState.isSubmitting}>Add</FormButton>
    </form>
  );
};

export default QuickAddSetsForm;
