import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, useToast } from '@chakra-ui/core';
import { FormNumberInput } from '../../common/Inputs';
import { IProgramLogRepScheme } from '../../../interfaces/programLogs/index';
import { PbPrimaryButton } from '../../common/Buttons';
import { PbStack } from '../../common/Stacks';
import { TextSm } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { useProgramLogContext } from '../ProgramLogContext';
import { DeleteProgramLogRepSchemeUrl, UpdateProgramLogRepSchemeUrl } from '../../../api/account/programLogRepScheme';
import axios from 'axios';
import { IWorkoutSet } from '../../../interfaces/workouts';
import { DeleteWorkoutSetUrl, UpdateWorkoutSetUrl } from '../../../api/account/workoutSet';
import { useWorkoutContext } from '../../workouts/WorkoutContext';

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

  const { EditSet, DeleteSet } = useWorkoutContext();

  const { register, handleSubmit, formState } = useForm();

  const onEditSubmit = async () => {
    workoutSet.weightLifted = weightUpdated;
    workoutSet.noOfReps = noOfRepsUpdated;

    try {
      await axios.put(UpdateWorkoutSetUrl(workoutDayId), workoutSet);
      EditSet(workoutSet, workoutSet.workoutExerciseId);
      toast({
        title: 'Success',
        description: 'Successfully Updated Set',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (ex) {
      toast({
        title: 'Error',
        description: 'Could not update set, please try again later',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    onClose();
  };

  const onDeleteSubmit = async () => {
    const { workoutExerciseId, workoutSetId } = workoutSet!;
    try {
      await axios.delete(DeleteWorkoutSetUrl(workoutSetId!));
      DeleteSet(workoutSetId, workoutExerciseId);
      toast({
        title: 'Success',
        description: 'Successfully Deleted Set',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (ex) {
      toast({
        title: 'Error',
        description: 'Could not delete set, please try again later',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
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
          <TextSm minW="100px">Weight</TextSm>
          <FormNumberInput name="weight" defaultValue={weightLifted} onChange={(e: number) => updateWeight(e)} />
        </PbStack>
        <CenterColumnFlex mt="3">
          <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
            UPDATE
          </PbPrimaryButton>
        </CenterColumnFlex>
      </form>
      <form onSubmit={handleSubmit(onDeleteSubmit)}>
        <PbPrimaryButton loading={formState.isSubmitting} colorScheme="red" type="submit">
          DELETE
        </PbPrimaryButton>
      </form>
    </Box>
  );
};

export default EditWorkoutSetForm;
