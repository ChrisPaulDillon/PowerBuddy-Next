export interface IExercise {
  exerciseId: number;
  exerciseTypeId: number;
  exerciseName: string;
  exerciseTypeName: string;
  isProgrammable: boolean;
  exerciseType: IExerciseType;
  exerciseMuscleGroups: Array<IExerciseMuscleGroupAssoc>;
  isMainExercise?: boolean;
}

export interface ICExercise {
  exerciseTypeId: number;
  exerciseName: string;
}

export interface IExerciseMuscleGroupAssoc {
  exerciseMuscleGroupAssocId: number;
  exerciseMuscleGroupName: string;
  isPrimary: boolean;
  exerciseId: number;
}

export interface IExerciseMuscleGroup {
  exerciseMuscleGroupId: number;
  exerciseMuscleGroupName: string;
  region: string;
}

export interface IExerciseType {
  exerciseTypeId: number;
  exerciseTypeName: string;
}
