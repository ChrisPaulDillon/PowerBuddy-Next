import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flex, useToast } from '@chakra-ui/core';
import { PbPrimaryButton } from '../../common/Buttons';
import { PbStack } from '../../common/Stacks';
import { TextSm } from '../../common/Texts';
import { FormNumberInput } from '../../common/Inputs';
import { IWorkoutExercise, IWorkoutSet } from '../../../interfaces/workouts';
import { CreateWorkoutSetCollectionUrl } from '../../../api/account/workoutSet';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import Axios from 'axios';

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
        title: 'Success',
        description: 'Successfully added sets',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (ex) {
      toast({
        title: 'Error',
        description: 'Could not add sets!',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PbStack>
        <TextSm minW="60px">Sets</TextSm>
        <FormNumberInput defaultValue={1} maxW="250px" onChange={(e: number) => setNoOfSets(e)} />
      </PbStack>
      <PbStack>
        <TextSm minW="60px">Reps</TextSm>
        <FormNumberInput defaultValue={suggestedReps} maxW="250px" onChange={(e: number) => setNoOfReps(e)} />
      </PbStack>
      <PbStack>
        <TextSm minW="60px">Weight (kg)</TextSm>
        <FormNumberInput defaultValue={suggestedWeight} maxW="250px" onChange={(e: number) => setWeight(e)} />
      </PbStack>
      <Flex p="1" mt="1" justifyContent="center">
        <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
          Add
        </PbPrimaryButton>
      </Flex>
    </form>
  );
};

export default QuickAddSetsForm;
