import React, { createContext, useContext } from 'react';
import { IProgramLog, IProgramLogDay, IProgramLogExercise, IProgramLogRepScheme, IProgramLogWeek } from '../../interfaces/programLogs';

interface IContextOutputProps {
  programLog: IProgramLog;
  programLogWeek: IProgramLogWeek;
  contentDisabled: boolean;
  DeleteLog: () => void;
  AddWeek: (programLogWeek: IProgramLogWeek) => void;
  UpdateDayNotes: (programLogDayId: number, notes: string) => void;
  AddDay: (programLogDay: IProgramLogDay) => void;
  DeleteDay: (programLogDayId) => void;
  UpdateDay: (programLogDay: IProgramLogDay) => void;
  CreateExercise: (programLogExercise: IProgramLogExercise) => void;
  UpdateExerciseNotes: (programLogExerciseId, programLogDayId, notes) => void;
  DeleteExercise: (programLogExerciseId, programLogDayId) => void;
  EditRepScheme: (programLogRepScheme: IProgramLogRepScheme, programLogDayId: number) => void;
  DeleteRepScheme: (programLogRepSchemeId, programLogExerciseId, programLogDayId) => void;
  AddRepSchemeCollectionToExercise: (programLogRepSchemes, programLogExerciseId, programLogDayId) => void;
}

const ProgramLogContext = createContext({} as IContextOutputProps);

export const useProgramLogContext = () => useContext(ProgramLogContext);

interface IContextInputProps {
  programLog: IProgramLog;
  setProgramLog: any;
  programLogWeek: IProgramLogWeek;
  setProgramLogWeek: any;
  children: any;
  contentDisabled: boolean;
}

export default function ProgramLogProvider({
  programLog,
  programLogWeek,
  setProgramLogWeek,
  setProgramLog,
  contentDisabled,
  children,
}: IContextInputProps) {
  const DeleteLog = () => {
    setProgramLogWeek({} as IProgramLogWeek);
    setProgramLog({} as IProgramLog);
  };

  const AddWeek = (programLogWeek: IProgramLogWeek) => {
    setProgramLog({ ...programLog, noOfWeeks: programLog!.noOfWeeks! + 1, programLogWeeks: [...programLog.programLogWeeks!, programLogWeek] });
  };

  const UpdateDay = (programLogDay: IProgramLogDay) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [
        ...programLogWeek.programLogDays.map((x) => {
          if (x.programLogDayId === programLogDay.programLogDayId) {
            x = programLogDay;
            return x;
          } else {
            return x;
          }
        }),
      ],
    });
  };

  const AddDay = (programLogDay: IProgramLogDay) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [...programLogWeek.programLogDays, programLogDay],
    });
  };

  const DeleteDay = (programLogDayId: number) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [...programLogWeek.programLogDays.filter((d) => d.programLogDayId! !== programLogDayId)],
    });
  };

  const UpdateDayNotes = (programLogDayId: number, notes: string) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [
        ...programLogWeek.programLogDays.map((x) => {
          if (x.programLogDayId === programLogDayId) {
            x.comment = notes;
            return x;
          } else {
            return x;
          }
        }),
      ],
    });
  };

  const CreateExercise = (programLogExercise: IProgramLogExercise) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [
        ...programLogWeek.programLogDays.map((x) => {
          if (x.programLogDayId === programLogExercise.programLogDayId) {
            x.completed = false;
            x.programLogExercises = [...x.programLogExercises!, programLogExercise]; //Update to support already existing program log exercises
            return x;
          } else {
            return x;
          }
        }),
      ],
    });
  };

  const UpdateExerciseNotes = (programLogExerciseId: number, programLogDayId: number, notes: string) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [
        ...programLogWeek.programLogDays.map((x) =>
          x.programLogDayId === programLogDayId
            ? {
                ...x,
                programLogExercises: x.programLogExercises!.map((e) =>
                  e.programLogExerciseId === programLogExerciseId ? { ...e, comment: notes } : e
                ),
              }
            : x
        ),
      ],
    });
  };

  const DeleteExercise = (programLogExerciseId: number, programLogDayId: number) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [
        ...programLogWeek.programLogDays.map((d) => {
          if (d.programLogDayId === programLogDayId) {
            return {
              ...d,
              programLogExercises: d!.programLogExercises!.filter((x) => x.programLogExerciseId !== programLogExerciseId),
            };
          } else {
            return d;
          }
        }),
      ],
    });
  };

  const EditRepScheme = (programLogRepScheme: IProgramLogRepScheme, programLogDayId: number) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [
        ...programLogWeek.programLogDays.map((d) => {
          if (d.programLogDayId === programLogDayId) {
            return {
              ...d,
              programLogExercises: d!.programLogExercises!.map((e) =>
                e.programLogExerciseId === programLogRepScheme.programLogExerciseId
                  ? {
                      ...e,
                      programLogRepSchemes: e.programLogRepSchemes?.map((r) =>
                        r.programLogRepSchemeId === programLogRepScheme.programLogRepSchemeId ? { ...r, programLogRepScheme } : r
                      ),
                    }
                  : e
              ),
            };
          } else {
            return d;
          }
        }),
      ],
    });
  };

  const DeleteRepScheme = (programLogRepSchemeId: number, programLogExerciseId: number, programLogDayId: number) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [
        ...programLogWeek.programLogDays.map((d) => {
          if (d.programLogDayId === programLogDayId) {
            return {
              ...d,
              programLogExercises: d!.programLogExercises!.map((e) =>
                e.programLogExerciseId === programLogExerciseId
                  ? {
                      ...e,
                      noOfSets: e.noOfSets - 1,
                      programLogRepSchemes: e.programLogRepSchemes?.filter((r) => r.programLogRepSchemeId !== programLogRepSchemeId),
                    }
                  : e
              ),
            };
          } else {
            return d;
          }
        }),
      ],
    });
  };

  const AddRepSchemeCollectionToExercise = (programLogRepSchemes: IProgramLogRepScheme[], programLogExerciseId: number, programLogDayId: number) => {
    setProgramLogWeek({
      ...programLogWeek,
      programLogDays: [
        ...programLogWeek.programLogDays.map((d) => {
          if (d.programLogDayId === programLogDayId) {
            return {
              ...d,
              completed: false,
              programLogExercises: d!.programLogExercises!.map((e) =>
                e.programLogExerciseId === programLogExerciseId
                  ? {
                      ...e,
                      noOfSets: e.noOfSets + programLogRepSchemes.length,
                      programLogRepSchemes: [...e.programLogRepSchemes!, ...programLogRepSchemes],
                    }
                  : e
              ),
            };
          } else {
            return d;
          }
        }),
      ],
    });
  };

  return (
    <ProgramLogContext.Provider
      value={{
        programLog,
        programLogWeek,
        contentDisabled,
        DeleteLog,
        AddWeek,
        AddDay,
        DeleteDay,
        UpdateDayNotes,
        UpdateDay,
        CreateExercise,
        UpdateExerciseNotes,
        DeleteExercise,
        EditRepScheme,
        DeleteRepScheme,
        AddRepSchemeCollectionToExercise,
      }}>
      {children}
    </ProgramLogContext.Provider>
  );
}
