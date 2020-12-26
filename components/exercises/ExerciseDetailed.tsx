import React, { useEffect, useState } from 'react';
import { Box, Flex, Divider } from '@chakra-ui/core';
import { TextSm, PageHeader, TextXs, PageSubHeader } from '../common/Texts';
import { IExercise } from '../../interfaces/exercises/index';
import { GetExerciseByIdUrl } from '../../api/public/exercise';
import { useAxios } from '../../hooks/useAxios';
import ProgressSpinner from '../common/ProgressSpinner';
import { useParams } from 'react-router';
import { BiDumbbell } from 'react-icons/all';

const ExerciseDetailed = () => {
  //@ts-ignore
  const { exerciseId } = useParams();
  const { loading, data, error } = useAxios<IExercise>(GetExerciseByIdUrl(exerciseId!));
  const [exercise, setExercise] = useState<IExercise>({} as IExercise);

  useEffect(() => {
    if (data != null) setExercise(data);
  }, [exerciseId, data, error, exercise]);

  if (loading) return <ProgressSpinner />;
  if (error) return <PageHeader Icon={BiDumbbell}>No exercise found</PageHeader>;
  return (
    <Flex flexDir="row" flexWrap="wrap-reverse" p="1" alignContent="center" alignItems="center" justifyContent="center">
      <Box>
        <Flex flexDir="column">
          <PageHeader Icon={BiDumbbell}>{exercise?.exerciseName}</PageHeader>
          <PageSubHeader>{exercise?.exerciseTypeName} Type</PageSubHeader>
        </Flex>
        <Divider borderColor="grey.800" mt="5" />
        <TextSm>Affected Muscle Group(s):</TextSm>
        {exercise?.exerciseMuscleGroups.length > 0 &&
          exercise.exerciseMuscleGroups.map((x, idx) => <TextXs key={idx}>{x.exerciseMuscleGroupName}</TextXs>)}
      </Box>
    </Flex>
  );
};

export default ExerciseDetailed;
