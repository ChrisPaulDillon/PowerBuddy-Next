import { GetStaticProps, NextPage } from 'next';
import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PageTitle } from '../../components/common/Texts';
import ExerciseCardList from '../../components/exercises/ExerciseCardList';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import useExerciseSearch from '../../hooks/exercises/useExerciseSearch';
import { PageContent, PageHead } from '../../components/layout/Page';
import axios from 'axios';
import { GetAllExercisesUrl } from '../../api/public/exercise';
import { IExercise } from 'powerbuddy-shared/lib';
import useLoadExercises from '../../hooks/redux/useLoadExercises';
import SearchBar from '../../shared/layout/SearchBar';

const Index: NextPage = ({ exercises }: any) => {
  useLoadExercises();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredExercises = useExerciseSearch(exercises, searchTerm);

  return (
    <Box>
      <PageHead
        title="Exercises"
        description="View a host of weightlifting exercises for powerlifters, weightlifters and casual gym goers alike!"
        keywords={`Weightlifting Exercises, Powerlifting Exercises, Workout Diary, PowerBuddy, Weightlifting App, Strong App, Intensity App, Powerlifting Weightlifting Templates, Liftvault Workout Program Spreadsheets, Powerlifting Routine, Olympic Weightlifting Template`}
      />
      <PageContent>
        <CenterColumnFlex>
          <PageTitle>Exercise Repository</PageTitle>
          <SearchBar onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for an Exercise..." />
        </CenterColumnFlex>
        <ExerciseCardList exercises={filteredExercises} />
      </PageContent>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get<IExercise>(GetAllExercisesUrl());

  return {
    props: {
      exercises: response.data,
    },
  };
};

export default Index;
