import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flex, useToast } from '@chakra-ui/core';
import { IProgramLogRepScheme, IProgramLogExercise } from '../../../interfaces/programLogs/index';
import { PbPrimaryButton } from '../../common/Buttons';
import { PbStack } from '../../common/Stacks';
import { TextSm } from '../../common/Texts';
import { FormNumberInput } from '../../common/Inputs';
import { useProgramLogContext } from '../ProgramLogContext';
import axios from 'axios';
import { CreateProgramLogRepSchemeCollectionUrl } from '../../../api/account/programLogRepScheme';

interface IProps {
  ple: IProgramLogExercise;
  suggestedReps: number;
  suggestedWeight: number;
  totalSets: number;
  onClose: () => void;
}

const QuickAddSetsForm: React.FC<IProps> = ({ ple, suggestedReps, suggestedWeight, totalSets, onClose }) => {
  const toast = useToast();
  const { AddRepSchemeCollectionToExercise } = useProgramLogContext();
  const { handleSubmit, formState } = useForm();

  const [noOfSets, setNoOfSets] = useState<number>(1);
  const [noOfReps, setNoOfReps] = useState<number>(suggestedReps);
  const [weight, setWeight] = useState<number>(suggestedWeight);

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

    let programLogRepSchemes: IProgramLogRepScheme[] = [];

    for (var index = 0; index < noOfSets; index++) {
      const programRepScheme: IProgramLogRepScheme = {
        programLogExerciseId: ple.programLogExerciseId,
        noOfReps: noOfReps,
        weightLifted: weight,
      };
      programLogRepSchemes = [...programLogRepSchemes, programRepScheme];
    }
    const { programLogDayId, programLogExerciseId } = ple;

    try {
      const result = await axios.post(CreateProgramLogRepSchemeCollectionUrl(), programLogRepSchemes);
      AddRepSchemeCollectionToExercise(result.data, programLogExerciseId, programLogDayId);
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
