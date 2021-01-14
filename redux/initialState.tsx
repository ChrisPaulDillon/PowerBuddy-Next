import { ITemplateProgram } from 'powerbuddy-shared';
import { ILiftingStat, ILiftFeed } from 'powerbuddy-shared';
import { IQuote, IGender, IMemberStatus } from 'powerbuddy-shared';
import { IUser, IFriendRequest } from 'powerbuddy-shared';
import { INotificationInteraction, IFriendsListAssoc } from 'powerbuddy-shared';
import { ITemplateDifficulty, IRepSchemeType } from 'powerbuddy-shared';
import { IExercise, IExerciseMuscleGroup, IExerciseType } from 'powerbuddy-shared';

export interface IReduxState {
  genders: IGender[];
  memberStatus: IMemberStatus[];
  templates: ITemplateProgram[];
  template: ITemplateProgram;
  exercises: IExercise[];
  exerciseMuscleGroups: IExerciseMuscleGroup[];
  exerciseTypes: IExerciseType[];
  templateDifficulties: ITemplateDifficulty[];
  repSchemeTypes: IRepSchemeType[];
  quotes: IQuote[];
  isAuthenticated: boolean;
  user: IUser;
  userFriendsList: IFriendsListAssoc[];
  userFriendRequests: IFriendRequest[];
  notifications: INotificationInteraction[];
}

export const initialState: IReduxState = {
  isAuthenticated: false,
  user: {} as IUser,
  userFriendsList: [],
  userFriendRequests: [],
  notifications: [],
  genders: [],
  memberStatus: [],
  templates: [],
  template: {} as ITemplateProgram,
  exercises: [],
  exerciseMuscleGroups: [],
  exerciseTypes: [],
  templateDifficulties: [],
  repSchemeTypes: [],
  quotes: [],
};

export default initialState;
