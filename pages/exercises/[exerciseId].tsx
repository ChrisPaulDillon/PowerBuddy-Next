import React from 'react';
import { GetAllExercisesUrl, GetExerciseByIdUrl } from '../../api/public/exercise';
import { PageSubHeader, PageTitle, TextSm, TextXs } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { PageContent, PageHead } from '../../components/layout/Page';
import { IExercise } from 'powerbuddy-shared';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Box } from '../../chakra/Layout';
import { Divider } from '../../chakra/DataDisplay';

const ExerciseDetailed = ({ exercise }: any) => {
  return (
    <Box>
      <PageHead title={exercise?.exerciseName} description="View weightlifting exercises on PowerBuddy" />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get<IExercise[]>(GetAllExercisesUrl());

  const paths = res.data.map((exercise) => ({
    params: { exerciseId: exercise.exerciseId.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const exerciseId = params.exerciseId as string;
  const res = await axios.get<IExercise>(GetExerciseByIdUrl(parseInt(exerciseId)));

  return { props: { exercise: res.data } };
};

export default ExerciseDetailed;
