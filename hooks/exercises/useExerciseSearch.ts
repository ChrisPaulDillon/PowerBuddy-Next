import { IExercise } from '../../interfaces/exercises/index';
import React, { useState, useEffect } from 'react';
import usePrevious from '../util/usePrevious';

const useExerciseSearch = (exercises: IExercise[], searchTerm: string) => {
  const [filteredExercises, setFilteredExercises] = useState<IExercise[]>(exercises);

  useEffect(() => {
    setFilteredExercises(exercises.filter((ex) => ex.exerciseName.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [exercises, searchTerm]);

  return filteredExercises;
};

export default useExerciseSearch;
