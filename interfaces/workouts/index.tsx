import { IWeightInput } from '../../components/templatePrograms/interfaces';

export interface IWorkoutLogTemplateInput {
  userId: string;
  templateProgramId: number;
  startDate: Date;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  dayCount: number;
  weightInputs: Array<IWeightInput>;
  incremementalWeightInputs?: Array<IWeightInput>;
}
export interface IWorkoutLogTemplateInput {
  userId: string;
  templateProgramId: number;
  startDate: Date;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  dayCount: number;
  weightInputs: Array<IWeightInput>;
  incremementalWeightInputs?: Array<IWeightInput>;
}

export interface IWorkoutLog {
  userId: string;
  templateProgramId: number;
  startDate: Date;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  workoutDays?: Array<IWorkoutDay>;
}

export interface IWorkoutDay {
  workoutDayId: number;
  workoutLogId?: number;
  weekNo?: number;
  userId: string;
  date: Date;
  comment: string;
  completed?: boolean;
  templateName?: string;
  workoutExercises?: Array<IWorkoutExercise>;
}

export interface IWorkoutExercise {
  workoutExerciseId: number;
  workoutDayId: number;
  exerciseId: number;
  comment: string;
  exerciseName: string;
  exerciseTonnage: number;
  workoutSets: Array<IWorkoutSet>;
  noOfSets: number;
}

export interface ICreateWorkoutExercise {
  workoutDayId: number;
  exerciseId: number;
  sets: number;
  weight: number;
  reps: number;
}

export interface IWorkoutSet {
  workoutSetId?: number;
  workoutExerciseId: number;
  noOfReps: number;
  weightLifted?: number;
  amrap?: boolean;
  repsCompleted?: number;
  personalBest?: boolean;
  liftingStatAuditId?: number;
}

export interface IWorkoutWeekSummary {
  templateName: string;
  weekNo: number;
  workoutDays: Array<IWorkoutDaySummary>;
}

export interface IWorkoutDaySummary {
  workoutDayId: number;
  weekNo: number;
  date: Date;
  templateName: string;
  personalBestCount: number;
  completed: boolean;
  workoutExerciseCount: number;
  workoutExerciseSummaries: Array<IWorkoutExerciseSummary>;
  hasWorkoutData: boolean;
}

export interface IWorkoutExerciseSummary {
  exerciseName: string;
  noOfSets: number;
}

export interface ICreateWorkoutDayOptions {
  workoutDate: Date;
  workoutLogId?: number;
  weekNo?: number;
}

export interface IWorkoutLogStats {
  userId?: string;
  lifetimeLogCount?: number;
  lifetimeDayCount?: number;
  lifetimeExerciseCount?: number;
  workoutLogStats: Array<IWorkoutLog>;
}
