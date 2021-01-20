import { IQuote, IGender, IMemberStatus } from 'powerbuddy-shared';
import { ITemplateDifficulty, IRepSchemeType } from 'powerbuddy-shared';
import { IExercise, IExerciseMuscleGroup, IExerciseType } from 'powerbuddy-shared';

export interface IReduxState {
  genders: IGender[];
  memberStatus: IMemberStatus[];
  exercises: IExercise[];
  exerciseMuscleGroups: IExerciseMuscleGroup[];
  exerciseTypes: IExerciseType[];
  templateDifficulties: ITemplateDifficulty[];
  repSchemeTypes: IRepSchemeType[];
  quotes: IQuote[];
}

export const initialState: IReduxState = {
  genders: [],
  memberStatus: [],
  exercises: [],
  exerciseMuscleGroups: [],
  exerciseTypes: [],
  templateDifficulties: [],
  repSchemeTypes: [],
  quotes: [],
};

export default initialState;
