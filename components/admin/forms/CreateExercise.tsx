import React from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../redux/store';
import { Select } from '@chakra-ui/react';
import { TextXs } from '../../common/Texts';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import { PbStack } from '../../common/Stacks';
import { CenterColumnFlex } from '../../layout/Flexes';
import { CreateExerciseUrl } from '../../../api/account/exercise';
import axios from 'axios';
import { ICExercise, IExerciseMuscleGroup } from 'powerbuddy-shared';
import { ToastError, ToastSuccess } from '../../shared/Toasts';
import { Button } from '../../../chakra/Forms';

interface IProps {}

const CreateExercise: React.FC<IProps> = () => {
  const { exerciseTypes } = useSelector((state: IAppState) => state.state);
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
      toast(ToastSuccess('Success', 'Successfully Create Exercise'));
    } catch (error) {
      toast(ToastError('Error', 'Exercise Could Not Be Created'));
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

interface IRegionMuscleGroupSingle {
  exerciseMuscleGroup: IExerciseMuscleGroup;
}

export default CreateExercise;
