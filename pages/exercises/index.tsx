import { NextPage } from 'next';
import { Box } from '@chakra-ui/core';
import React, { useState } from 'react';
import { GiRun } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { PageTitle } from '../../components/common/Texts';
import ExerciseCardList from '../../components/exercises/ExerciseCardList';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import SearchBar from '../../components/shared/SearchBar';
import useExerciseSearch from '../../hooks/exercises/useExerciseSearch';
import { IAppState } from '../../redux/store';
import useLoadExercises from '../../hooks/redux/useLoadExercises';

const Index: NextPage = () => {
  useLoadExercises();
  const { exercises } = useSelector((state: IAppState) => state.state);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredExercises = useExerciseSearch(exercises, searchTerm);

  if (exercises.length === 0) return <ProgressSpinner />;

  return (
    <Box>
      <CenterColumnFlex>
        <PageTitle>Exercise Repository</PageTitle>
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for an Exercise..." />
      </CenterColumnFlex>
      <ExerciseCardList exercises={filteredExercises} />
    </Box>
  );
};

export default Index;
