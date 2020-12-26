import { IExercise } from '../exercises';

export interface ITemplateProgramFeed {
  templateProgramId: number;
  username: number;
  templateName: string;
  dateCreated: Date;
}

export interface ITemplateProgram {
  templateProgramId: number;
  name: string;
  description?: string;
  difficulty: string;
  noOfWeeks: number;
  noOfDaysPerWeek: number;
  templateType: string;
  weightProgressionType: string;
  activeUsersCount: number;
}

export interface ITemplateProgramExtended {
  templateProgramId: number;
  name: string;
  description?: string;
  difficulty: string;
  noOfWeeks: number;
  noOfDaysPerWeek: number;
  templateType: string;
  weightProgressionType: string;
  activeUsersCount: number;
  templateExerciseCollection: ITemplateExerciseCollection[];
  templateWeeks: ITemplateWeek[];
}

export interface ITemplateWeek {
  templateWeekId: number;
  templateId: number;
  weekNo: number;
  templateDays: ITemplateDay[];
}

export interface ITemplateDay {
  templateDayId: number;
  templateWeekId: number;
  templateId: number;
  dayNo: number;
  templateExercises: ITemplateExercise[];
}

export default interface ITemplateExercise {
  templateExerciseId: number;
  templateDayId: number;
  exerciseId: number;
  percentage?: number;
  noOfSets: number;
  repSchemeFormat: string;
  repSchemeType: string;
  hasBackOffSets: boolean;
  backOffSetFormat?: string;
  exercise: IExercise;
  templateRepSchemes: ITemplateRepScheme[];
}

export interface ITemplateRepScheme {
  templateRepSchemeId: number;
  templateExerciseId: number;
  percentage?: number;
  setNo: number;
  noOfReps: number;
  weightLifted: number;
  isBackOffSet: boolean;
  amrap: boolean;
}

export interface ITemplateExerciseCollection {
  templateExerciseCollectionId: number;
  templateProgramId: number;
  exerciseId: number;
  exerciseName: string;
}

export interface IDaysSelected {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  startDate: Date;
  counter: number;
}
