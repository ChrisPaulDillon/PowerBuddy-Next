import { IExercise } from '../exercises';

export interface IProgramLogCalendarStats {
  workoutDates: Array<Date>;
  personalBestDates: Array<Date>;
}

export interface IProgramLogStats {
  userId?: number;
  lifetimeLogCount?: number;
  lifetimeDayCount?: number;
  lifetimeExerciseCount?: number;
  lifetimeExerciseCompletedCount?: number;
  programLogStats: Array<IProgramLog>;
}

export interface IProgramLog {
  programLogId?: number;
  userId?: string;
  templateProgramId?: number;
  noOfWeeks?: number;
  startDate: Date;
  endDate?: Date;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  active: boolean;
  programLogWeeks?: Array<IProgramLogWeek>;
  templateName?: string;
  customName?: string;
  dayCount?: number;
  exerciseCount?: number;
  exerciseCompletedCount?: number;
}

export interface IProgramLogWeek {
  programLogWeekId: number;
  programLogId: number;
  userId: string;
  weekNo: number;
  startDate: Date;
  endDate: Date;
  programLogDays: Array<IProgramLogDay>;
}

export interface IProgramLogDay {
  programLogDayId?: number;
  programLogWeekId: number;
  userId?: string;
  dayNo?: number;
  date: Date;
  comment?: string;
  completed?: boolean;
  programLogExercises?: Array<IProgramLogExercise>;
}

export interface IProgramLogExercise {
  programLogExerciseId?: number;
  programLogDayId?: number;
  exerciseId: number;
  noOfSets: number;
  weight?: number;
  reps?: number;
  comment?: string;
  completed?: boolean;
  personalBest?: boolean;
  exerciseTonnage?: number;
  exerciseName?: string;
  programLogRepSchemes?: Array<IProgramLogRepScheme>;
}

export interface IProgramLogRepScheme {
  programLogRepSchemeId?: number;
  programLogExerciseId?: number;
  setNo?: number;
  noOfReps?: number;
  weightLifted?: number;
  percentage?: number;
  comment?: number;
  isBackOffSet?: boolean;
  amrap?: boolean;
  completed?: boolean;
  repsCompleted?: number;
  personalBest?: boolean;
}