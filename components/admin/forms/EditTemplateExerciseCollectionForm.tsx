import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CenterColumnFlex } from '../../layout/Flexes';
import React from 'react';

const EditTemplateExerciseCollectionForm = ({}) => {
  const dispatcher = useDispatch();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const onSubmit = (data: any) => {
    // const exerciseTypeList = exerciseTypes.map((x) => ({
    //   value: x.exerciseTypeId,
    //   label: x.exerciseTypeName,
    // }));

    return (
      <CenterColumnFlex>
        {/* <PageHead>Create a new Exercise</PageHead>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box p="1">
          <FormInput
            ref={register}
            name="exerciseName"
            placeholder="Enter exercise name..."
          />
        </Box>
        <Box p="1" mt="1">
          <FixedSelect
            values={exerciseTypeList}
            defaultValue={{
              value: 0,
              label: "Search...",
            }}
            control={control}
            name="exerciseTypeId"
          />
        </Box>
        <Flex p="1" mt="1" justifyContent="center">
          <PbPrimaryButton type="submit">Create</PbPrimaryButton>
        </Flex>
      </form> */}
      </CenterColumnFlex>
    );
  };
};

export default EditTemplateExerciseCollectionForm;
