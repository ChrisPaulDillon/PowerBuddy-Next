import { ILoginUserAction, ICreateFirstVisitStatsAction, ILoadUserProfileActions } from './area/account/userActions';
import { ILoadExercisesAction, ILoadExerciseMuscleGroupsAction, ILoadExerciseTypesAction } from './area/public/exerciseActions';
import { ILoadQuotesAction, IGetAllGendersAction, IGetAllMemberStatusAction } from './area/public/systemActions';

export type ReduxActions =
  | ILoadExercisesAction
  | ILoadExerciseMuscleGroupsAction
  | ILoadExerciseTypesAction
  | ILoadQuotesAction
  | IGetAllGendersAction
  | IGetAllMemberStatusAction
  | ILoginUserAction
  | ICreateFirstVisitStatsAction
  | ILoadUserProfileActions;
