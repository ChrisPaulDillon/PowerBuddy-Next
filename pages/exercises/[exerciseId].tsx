import { Flex, Box, Divider } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { GetExerciseByIdUrl } from '../../api/public/exercise';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { PageSubHeader, PageTitle, TextSm, TextXs } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { PageContent, PageHeader } from '../../components/layout/Page';
import { useAxios } from '../../hooks/useAxios';
import { IExercise } from 'powerbuddy-shared';

const ExerciseDetailed = () => {
  const router = useRouter();
  const { exerciseId } = router.query;
  const { loading, data, error } = useAxios<IExercise>(GetExerciseByIdUrl(parseInt(exerciseId as string)));
  const [exercise, setExercise] = useState<IExercise>({} as IExercise);

  useEffect(() => {
    if (data != null) setExercise(data);
  }, [exerciseId, data, error, exercise]);

  if (loading) return <ProgressSpinner />;
  //   if (error) return <PageTitle>No exercise found</PageTitle>;

  return (
    <Box>
      <PageHeader title={exercise?.exerciseName} />
      <PageContent>
        <CenterColumnFlex>
          <PageTitle>{exercise?.exerciseName}</PageTitle>
          <PageSubHeader>{exercise?.exerciseTypeName} Type</PageSubHeader>

          <Divider borderColor="grey.800" mt="5" />
          <TextSm py={2}>Affected Muscle Groups</TextSm>
          {exercise?.exerciseMuscleGroups?.length > 0 &&
            exercise?.exerciseMuscleGroups.map((x, idx) => <TextXs key={idx}>{x.exerciseMuscleGroupName}</TextXs>)}
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default ExerciseDetailed;
