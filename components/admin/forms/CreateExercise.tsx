import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormErrorMessage, FormControl, useToast } from '@chakra-ui/core';
import { TextSm } from '../../common/Texts';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../redux/store';
import { Select } from '@chakra-ui/core';
import { TextXs } from '../../common/Texts';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import { ICExercise, IExerciseMuscleGroup } from '../../../interfaces/exercises';
import { PbStack } from '../../common/Stacks';
import { CenterColumnFlex } from '../../layout/Flexes';
import { CreateExerciseUrl } from '../../../api/account/exercise';
import axios from 'axios';

interface IProps {}

const CreateExercise: React.FC<IProps> = () => {
  const { exerciseTypes } = useSelector((state: IAppState) => state.state);
  const { exerciseMuscleGroups } = useSelector((state: IAppState) => state.state);
  const toast = useToast();

  const exerciseTypeList = exerciseTypes.map((x) => ({
    value: x.exerciseTypeId,
    label: x.exerciseTypeName,
  }));

  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = async (data: any) => {
    const exercise: ICExercise = {
      exerciseName: data.exerciseName,
      exerciseTypeId: parseInt(data.exerciseType),
    };

    try {
      await axios.post(CreateExerciseUrl(), exercise);
      toast({
        title: 'Success',
        description: 'Successfully Create Exercise',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Exercise Could Not Be Created',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex>
        <FormControl isInvalid={errors.exerciseName}>
          <PbStack>
            <TextXs>Exercise Name</TextXs>
            <FormInput name="exerciseName" ref={register({ validate: validateInput })} placeholder="Back Squat" maxW={200} />
          </PbStack>
          <FormErrorMessage>{errors.exerciseName && errors.exerciseName.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.exerciseType}>
          <PbStack>
            <TextXs>Exercise Type</TextXs>
            <Select placeholder="Select..." ref={register} name="exerciseType" maxW={200}>
              {exerciseTypeList.map((x, idx) => (
                <option value={x.value} key={idx}>
                  {x.label}
                </option>
              ))}
            </Select>
          </PbStack>
          <FormErrorMessage>{errors.exerciseType && errors.exerciseType.message}</FormErrorMessage>
        </FormControl>
        {/* <Flex
        flexDir={{
          lg: 'column',
          md: 'column',
          sm: 'column',
          xs: 'column',
        }}
        justifyContent="center"
        alignItems="center"
        p="4"
        w="100%">
        {groupedMuscleGroups!.map((e, i) => (
          <RegionMuscleGroup exerciseMuscleGroups={groupedMuscleGroups![i] as IExerciseMuscleGroup[]} />
        ))}
      </Flex> */}
        <Button colorScheme="green" type="submit" ml={3} isLoading={formState.isSubmitting}>
          Create
        </Button>
      </CenterColumnFlex>
    </form>
  );
};

interface IRegionMuscleGroup {
  exerciseMuscleGroups: IExerciseMuscleGroup[];
}

interface IRegionMuscleGroupSingle {
  exerciseMuscleGroup: IExerciseMuscleGroup;
}

const RegionMuscleGroupSingle: React.FC<IRegionMuscleGroupSingle> = ({ exerciseMuscleGroup }) => {
  return <TextXs p="2">{exerciseMuscleGroup.exerciseMuscleGroupName}</TextXs>;
};

export default CreateExercise;
