import { ITemplateProgram } from '../interfaces/templates';
import { ILiftingStat, ILiftFeed } from '../interfaces/liftingStats';
import { IQuote, IGender, IMemberStatus } from '../interfaces/system';
import { IUser, IFriendRequest } from '../interfaces/users';
import { INotificationInteraction, IFriendsListAssoc } from '../interfaces/users/index';
import { ITemplateDifficulty, IRepSchemeType } from '../interfaces/system/index';
import { IExercise, IExerciseMuscleGroup, IExerciseType } from '../interfaces/exercises';

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
