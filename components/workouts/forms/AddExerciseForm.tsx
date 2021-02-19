import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LightMode } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { SelectSearchable } from '../../common/SearchSelect';
import { FormButton } from '../../common/Buttons';
import { IAppState } from '../../../redux/store';
import { FormWeightInput } from '../../common/Inputs';
import { HeadingMd, TextRep } from '../../common/Texts';
import { FormLayoutFlex } from '../../layout/Flexes';
import axios from 'axios';
import { CreateWorkoutExerciseUrl } from '../../../api/account/workoutExercise';
import { useWorkoutContext } from '../../workouts/WorkoutContext';
import useLoadExercises from '../../../hooks/redux/useLoadExercises';
import { ICreateWorkoutExercise } from 'powerbuddy-shared';
import { Box, Flex } from '../../../chakra/Layout';
import { Button, FormControl, FormErrorMessage } from '../../../chakra/Forms';
import useFireToast from '../../../hooks/useFireToast';

interface IProps {
  onClose: () => void;
  workoutDayId: number;
}

const AddExerciseForm: React.FC<IProps> = ({ onClose, workoutDayId }) => {
  useLoadExercises();
  const { exercises } = useSelector((state: IAppState) => state.state);
  const [sets, setSets] = useState<number>(1);
  const [reps, setReps] = useState<number>(1);
  const [weight, setWeight] = useState<number>(0);
  const [exerciseIdSelected, setExerciseIdSelected] = useState<number>();
  const { CreateExercise, weightType } = useWorkoutContext();
  const toast = useFireToast();

  const exerciseList = exercises.map((x) => ({
    value: x.exerciseId,
    label: x.exerciseName,
  }));

  const handleExerciseSelection = (e: any) => {
    if (e) {
      setExerciseIdSelected(parseInt(e.value));
    }
  };

  const { handleSubmit, errors, formState } = useForm();

  const onSubmit = async () => {
    const workoutExercise: ICreateWorkoutExercise = {
      workoutDayId: workoutDayId,
      exerciseId: exerciseIdSelected!,
      sets: sets,
      weight: weight,
      reps: reps,
    };

    try {
      const response = await axios.post(CreateWorkoutExerciseUrl(), workoutExercise);
      CreateExercise(response.data);
      toast.Success('Successfully added new exercise');
      onClose();
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.Error('A valid exercise must be provided');
      } else {
        toast.Error('Could not add new exercise. Do you already have this exercise for the given day?');
      }
    }
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
        <FormLayoutFlex>
          <SelectSearchable
            options={exerciseList}
            defaultValue={{
              value: 0,
              label: 'Select an Exercise...',
            }}
            onChange={handleExerciseSelection}
          />
          <FormErrorMessage>{errors.selectExercise && errors.selectExercise.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormLayoutFlex>
        <FormWeightInput
          name="weight"
          placeholder={`Enter weight...(${weightType})`}
          onChange={(e: number) => setWeight(e)}
          w="100%"
          defaultValue={0}
          max={1000}
        />
      </FormLayoutFlex>
      <LightMode>
        <Flex justify="center">
          <Button size="md" rounded="100px" onClick={() => setSets(handleSetRepChange(sets))} colorScheme="blue">
            <TextRep>{sets} Sets</TextRep>
          </Button>
          <Button size="md" rounded="100px" onClick={() => setReps(handleSetRepChange(reps))} colorScheme="blue">
            <TextRep>{reps} Reps</TextRep>
          </Button>
        </Flex>
      </LightMode>
      <Box mt={4}>
        <HeadingMd textAlign="center">
          {sets}x{reps}x{weight}
          {weightType}
        </HeadingMd>
        <FormButton type="submit" isLoading={formState.isSubmitting}>
          Create
        </FormButton>
      </Box>
    </form>
  );
};

export default AddExerciseForm;
