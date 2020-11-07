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

interface IProps {
  programLogDayId: number;
  programLogRepScheme: IProgramLogRepScheme;
  onClose: () => void;
}

const EditRepSchemeForm: React.FC<IProps> = ({ programLogDayId, programLogRepScheme, onClose }) => {
  const { weightLifted, noOfReps } = programLogRepScheme;
  const toast = useToast();
  const { EditRepScheme, DeleteRepScheme } = useProgramLogContext();

  const [noOfRepsUpdated, setNoOfRepsUpdated] = useState<number>(noOfReps!);
  const [weightUpdated, setWeightUpdated] = useState<number>(weightLifted!);

  const { register, handleSubmit, formState } = useForm();

  console.log(weightUpdated);

  const onEditSubmit = async () => {
    programLogRepScheme.weightLifted = weightUpdated;
    programLogRepScheme.noOfReps = noOfRepsUpdated;

    try {
      await axios.put(UpdateProgramLogRepSchemeUrl(), programLogRepScheme);
      EditRepScheme(programLogRepScheme, programLogDayId);
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
    const { programLogExerciseId, programLogRepSchemeId } = programLogRepScheme!;
    try {
      await axios.delete(DeleteProgramLogRepSchemeUrl(programLogRepSchemeId!));
      DeleteRepScheme(programLogRepSchemeId, programLogExerciseId, programLogDayId);
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

export default EditRepSchemeForm;
