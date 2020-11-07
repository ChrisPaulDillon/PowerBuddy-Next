import { IWeightInput } from '../../templatePrograms/interfaces';

export interface IProgramLogInputScratch {
  noOfWeeks: number;
  startDate: Date;
  endDate: Date;
  userId: string;
  customName: string;
}

export interface IProgramLogInputTemplate {
  userId: string;
  templateProgramId: number;
  noOfWeeks: number;
  startDate: Date;
  endDate: Date;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  active: boolean;
  dayCount: number;
  weightInputs: Array<IWeightInput>;
}
