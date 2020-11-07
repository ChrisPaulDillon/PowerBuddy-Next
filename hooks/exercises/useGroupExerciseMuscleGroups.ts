import { useState, useEffect } from 'react';
import { ILiftingStat } from '../../interfaces/liftingStats/index';
import { IExerciseMuscleGroup } from '../../interfaces/exercises';

const useGroupMuscleGroups = (exerciseMuscleGroups: IExerciseMuscleGroup[]) => {
  const [exerciseGrouped, setGroupedExercises] = useState<IExerciseMuscleGroup[]>(exerciseMuscleGroups);

  useEffect(() => {
    if (exerciseMuscleGroups.length > 0) {
      setGroupedExercises(
        exerciseMuscleGroups.reduce((acc: any, curr: any) => {
          if (!acc[curr.region]) acc[curr.region] = []; //If this type wasn't previously stored
          acc[curr.region].push(curr);
          return acc;
        }, {} as ILiftingStat)
      );
    }
  }, [exerciseMuscleGroups]);

  return Object.values(exerciseGrouped ?? {});
};

export default useGroupMuscleGroups;
