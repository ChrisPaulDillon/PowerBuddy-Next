import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox, Select } from '@chakra-ui/react';
import { PrimaryButton } from '../../common/Buttons';
import { useSelector } from 'react-redux';
import { PbStack } from '../../common/Stacks';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { validateInput } from '../../../util/formInputs';
import { IAppState } from '../../../redux/store';
import { FormInput } from '../../common/Inputs';
import axios from 'axios';
import { UpdateExerciseAdminUrl } from '../../../api/admin/exercise';
import { IExercise } from 'powerbuddy-shared/lib';
import { Box } from '../../../chakra/Layout';

interface IProps {
  exerciseId: number;
}

const EditExerciseForm: React.FC<IProps> = ({ exerciseId }) => {
  const { exerciseTypes } = useSelector((state: IAppState) => state.state);
  const { exercises } = useSelector((state: IAppState) => state.state);
  const [exercise, setExercise] = useState<IExercise>({} as IExercise);
  const [defaultExerciseType, setDefaultExerciseType] = useState<number>();

  const exerciseTypeList = exerciseTypes.map((x) => ({
    value: x.exerciseTypeId,
    label: x.exerciseTypeName,
  }));

  useEffect(() => {
    setDefaultExerciseType(exerciseTypeList.find((x) => x.label === exercise.exerciseTypeName)?.value);
  }, [exercise, exerciseTypeList]);

  useEffect(() => {
    setExercise(exercises.find((x) => x.exerciseId === exerciseId) ?? ({} as IExercise));
  }, [exerciseId]);

  const { register, handleSubmit, formState } = useForm();

  const onSubmit = async ({ isMainExercise, exerciseName }: any) => {
    const updatedExercise = { ...exercise, isMainExercise: isMainExercise, exerciseName: exerciseName };
    await axios.put(UpdateExerciseAdminUrl(), updatedExercise);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PbStack>
          <TextXs>Exercise Name</TextXs>
          <FormInput name="exerciseName" ref={register({ validate: validateInput })} defaultValue={exercise?.exerciseName} maxW={150} ml={4} />
        </PbStack>
        <PbStack>
          <TextXs>Is Main Exercise?</TextXs>
          <Checkbox name="isMainExercise" ref={register} defaultIsChecked={exercise.isMainExercise} maxW={150} ml={4} />
        </PbStack>
        <PbStack>
          <TextXs>Exercise Type</TextXs>
          <Select placeholder="Select..." ref={register} name="exerciseType" maxW={150} defaultValue={defaultExerciseType}>
            {exerciseTypeList.map((x, idx) => (
              <option value={x.value} key={idx}>
                {x.label}
              </option>
            ))}
          </Select>
        </PbStack>
        <CenterColumnFlex mt="3">
          <PrimaryButton type="submit" loading={formState.isSubmitting}>
            UPDATE
          </PrimaryButton>
        </CenterColumnFlex>
      </form>
    </Box>
  );
};

export default EditExerciseForm;
