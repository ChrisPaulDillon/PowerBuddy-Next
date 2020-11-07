import { ILiftFeed } from '../liftingStats';

export interface IUser {
  userId?: string;
  email: string;
  userName: string;
  bodyWeight?: number;
  password: string;
  firstName?: string;
  lastName?: string;
  liftingLevel?: string;
  sportType?: string;
  isPublic?: boolean;
  isBanned?: boolean;
  firstVisit?: boolean;
  userSetting?: IUserSetting;
  pendingFriendRequest?: boolean;
  quotesEnabled?: boolean;
  gender?: string;
  memberStatusId?: number;
}

export interface IPublicUser {
  userId?: string;
  userName: string;
  bodyWeight?: number;
  liftingLevel?: string;
  sportType?: string;
  isPublic?: boolean;
  isBanned?: boolean;
  pendingFriendRequestTo?: boolean;
  pendingFriendRequestFrom?: boolean;
  gender?: string;
  memberStatusId?: number;
  liftFeed?: ILiftFeed[];
}

export interface IUserSetting {
  userSettingId?: number;
  usingMetric: boolean;
  bodyWeight: boolean;
  activeQuotes: boolean;
}

export interface INotificationInteraction {
  notificationInteractionId?: number;
  notificationId?: number;
  hasRead: boolean;
}

export interface IFriendsListAssoc {
  friendsListId: number;
  otherUserId: string;
  userName: string;
}

export interface IFriendRequest {
  friendRequestId: number;
  userId: string;
  userName: string;
  hasAccepted?: boolean;
}
