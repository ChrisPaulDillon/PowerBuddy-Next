import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ExerciseCardList from './ExerciseCardList';
import { Box } from '@chakra-ui/core';
import { IAppState } from '../../redux/store';
import SearchBar from '../shared/SearchBar';
import useExerciseSearch from '../../hooks/exercises/useExerciseSearch';
import { PageHeader } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import { GiRun } from 'react-icons/all';
import ProgressSpinner from '../common/ProgressSpinner';

const ExerciseIndexPage = () => {
  const { exercises } = useSelector((state: IAppState) => state.state);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredExercises = useExerciseSearch(exercises, searchTerm);

  if (exercises.length === 0) return <ProgressSpinner />;

  return (
    <Box>
      <CenterColumnFlex>
        <PageHeader Icon={GiRun}>Exercise Repository</PageHeader>
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for an Exercise..." />
      </CenterColumnFlex>
      <ExerciseCardList exercises={filteredExercises} />
    </Box>
  );
};

export default ExerciseIndexPage;
