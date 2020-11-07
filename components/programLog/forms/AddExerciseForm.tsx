import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Flex, Box, FormControl, FormErrorMessage, useToast, LightMode } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { SearchSelect } from '../../common/selects/SearchSelect';
import { IProgramLogExercise } from '../../../interfaces/programLogs/index';
import { PbPrimaryButton } from '../../common/Buttons';
import { IAppState } from '../../../redux/store';
import { FormNumberInput } from '../../common/Inputs';
import { TextRep, TextLg } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { useProgramLogContext } from '../ProgramLogContext';
import axios from 'axios';
import { CreateProgramLogExerciseUrl } from '../../../api/account/programLogExercise';

interface IProps {
  onClose: () => void;
  programLogDayId: number;
}

const AddExerciseAlert: React.FC<IProps> = ({ onClose, programLogDayId }) => {
  const { exercises } = useSelector((state: IAppState) => state.state);
  const [sets, setSets] = useState<number>(1);
  const [reps, setReps] = useState<number>(1);
  const [weight, setWeight] = useState<number>(0);
  const { CreateExercise } = useProgramLogContext();
  const toast = useToast();

  const exerciseList = exercises.map((x) => ({
    value: x.exerciseId,
    label: x.exerciseName,
  }));

  const { register, handleSubmit, control, errors, formState } = useForm();

  const onSubmit = async (data: any) => {
    const exercise = exercises!.find((x) => x.exerciseId === data.exercise.value);

    const programLogExercise: IProgramLogExercise = {
      programLogDayId: programLogDayId,
      exerciseId: exercise!.exerciseId,
      noOfSets: sets,
      weight: weight,
      reps: reps,
      exerciseName: exercise?.exerciseName,
    };

    try {
      const response = await axios.post(CreateProgramLogExerciseUrl(), programLogExercise);
      CreateExercise(response.data);
      toast({
        title: 'Success',
        description: 'Successfully added new exercise',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (ex) {
      toast({
        title: 'Error',
        description: 'Could not add new exercise. Do you already have this exercise for the given day?',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    onClose();
  };

  const handleSetRepChange = (data: number) => {
    if (data < 15) {
      return data + 1;
    } else {
      return 1;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.selectExercise}>
        <Box p="1">
          <SearchSelect
            values={exerciseList}
            defaultValue={{
              value: 0,
              label: 'Select an Exercise...',
            }}
            control={control}
            name="exercise"
          />
          <FormErrorMessage>{errors.selectExercise && errors.selectExercise.message}</FormErrorMessage>
        </Box>
      </FormControl>
      <Box p="1" mt="1">
        <FormNumberInput
          name="weight"
          placeholder="Enter weight...(kg)"
          onChange={(e: number) => setWeight(e)}
          w="100%"
          defaultValue={0}
          max={1000}
        />
      </Box>
      <LightMode>
        <Flex justify="center" mt="2">
          <Flex flexDir="column">
            <Box minW="100px">
              <Button size="md" rounded="100px" onClick={() => setSets(handleSetRepChange(sets))} colorScheme="blue">
                <TextRep>{sets} Sets</TextRep>
              </Button>
            </Box>
          </Flex>
          <Flex flexDir="column">
            <Box minW="100px">
              <Button size="md" rounded="100px" onClick={() => setReps(handleSetRepChange(reps))} colorScheme="blue">
                <TextRep>{reps} Reps</TextRep>
              </Button>
            </Box>
          </Flex>
        </Flex>
      </LightMode>
      <CenterColumnFlex pt="3">
        <TextLg>
          {sets}x{reps}x{weight}kg
        </TextLg>
        <Box mt="5">
          <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
            Create
          </PbPrimaryButton>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default AddExerciseAlert;
