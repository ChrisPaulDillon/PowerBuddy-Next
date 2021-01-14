import React, { createContext, useContext } from 'react';
import { IWorkoutDay, IWorkoutExercise, IWorkoutSet } from 'powerbuddy-shared';

interface IContextOutputProps {
  workoutDay: IWorkoutDay;
  contentDisabled: boolean;
  UpdateDayNotes: (notes: string) => void;
  DeleteDay: () => void;
  UpdateDay: (workoutDay: IWorkoutDay) => void;
  CreateExercise: (workoutExercise: IWorkoutExercise) => void;
  UpdateExerciseNotes: (workoutExerciseId, notes) => void;
  DeleteExercise: (workoutExerciseId) => void;
  EditSet: (workoutSet: IWorkoutSet, workoutExerciseId: number) => void;
  DeleteSet: (programLogRepSchemeId, workoutExerciseId) => void;
  QuickAddSetsToExercise: (workoutSets: IWorkoutSet[], workoutExerciseId: number) => void;
}

const WorkoutContext = createContext({} as IContextOutputProps);

export const useWorkoutContext = () => useContext(WorkoutContext);

interface IContextInputProps {
  workoutDay: IWorkoutDay;
  setWorkoutDay: any;
  children: any;
  contentDisabled: boolean;
}

export default function WorkoutProvider({ workoutDay, setWorkoutDay, contentDisabled, children }: IContextInputProps) {
  const DeleteDay = () => {
    setWorkoutDay({} as IWorkoutDay);
  };

  const UpdateDay = (workoutDay: IWorkoutDay) => {
    setWorkoutDay(workoutDay);
  };

  const UpdateDayNotes = (notes: string) => {
    setWorkoutDay({ ...workoutDay, comment: notes });
  };

  const CreateExercise = (workoutExercise: IWorkoutExercise) => {
    setWorkoutDay({
      ...workoutDay,
      workoutExercises: [...workoutDay.workoutExercises!, workoutExercise],
    });
  };

  const UpdateExerciseNotes = (workoutExerciseId: number, notes: string) => {
    setWorkoutDay({
      ...workoutDay,
      workoutExercises: [
        ...workoutDay.workoutExercises!.map((x) =>
          x.workoutExerciseId === workoutExerciseId
            ? {
                ...x,
                comment: notes,
              }
            : x
        ),
      ],
    });
  };

  const DeleteExercise = (workoutExerciseId: number) => {
    setWorkoutDay({
      ...workoutDay,
      workoutExercises: [...workoutDay.workoutExercises!.filter((x) => x.workoutExerciseId !== workoutExerciseId)],
    });
  };

  const EditSet = (workoutSet: IWorkoutSet, workoutExerciseId: number) => {
    setWorkoutDay({
      ...workoutDay,
      workoutExercises: [
        ...workoutDay.workoutExercises!.map((e) => {
          if (e.workoutExerciseId === workoutExerciseId) {
            return { ...e, workoutSets: e.workoutSets?.map((r) => (r.workoutSetId === workoutSet.workoutSetId ? (r = workoutSet) : r)) };
          } else {
            return e;
          }
        }),
      ],
    });
  };

  const DeleteSet = (workoutSetId: number, workoutExerciseId: number) => {
    setWorkoutDay({
      ...workoutDay,
      workoutExercises: [
        ...workoutDay.workoutExercises!.map((d) => {
          if (d.workoutExerciseId === workoutExerciseId) {
            return {
              ...d,
              workoutSets: d.workoutSets?.filter((r) => r.workoutSetId !== workoutSetId),
            };
          } else {
            return d;
          }
        }),
      ],
    });
  };

  const QuickAddSetsToExercise = (workoutSets: IWorkoutSet[], workoutExerciseId: number) => {
    setWorkoutDay({
      ...workoutDay,
      workoutExercises: [
        ...workoutDay.workoutExercises!.map((d) => {
          if (d.workoutExerciseId === workoutExerciseId) {
            return {
              ...d,
              noOfSets: d.noOfSets + workoutSets.length,
              workoutSets: [...d.workoutSets!, ...workoutSets],
            };
          } else {
            return d;
          }
        }),
      ],
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutDay,
        contentDisabled,
        DeleteDay,
        UpdateDayNotes,
        UpdateDay,
        CreateExercise,
        UpdateExerciseNotes,
        DeleteExercise,
        EditSet,
        DeleteSet,
        QuickAddSetsToExercise,
      }}>
      {children}
    </WorkoutContext.Provider>
  );
}
