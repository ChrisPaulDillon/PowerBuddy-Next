export interface IPersonalBestDetailed {
  exerciseName: string;
  lifeTimeTonnage: number;
  liftingStats: Array<ILiftingStat>;
  liftFeed: Array<ILiftFeed>;
}

export interface ILiftingStatGrouped {
  exerciseName: string;
  liftingStats: Array<ILiftingStat>;
}

export interface ILiftingStat {
  liftingStatId?: number;
  userId: string;
  exerciseId: number;
  repRange: number;
  weight: number;
  goalWeight?: number;
  percentageToGoal?: number;
  lastUpdated: Date;
  exerciseName?: string;
}

export interface ILiftingStatAudit {
  liftingStatAuditId: number;
  userId: string;
  exerciseId: number;
  dateChanged: Date;
  repRange: number;
}

export interface ILiftFeed {
  liftingStatAuditId: number;
  userName: string;
  liftingStatId: number;
  userId: string;
  exerciseName: string;
  repRange: number;
  weight: number;
  dateChanged: Date;
  exerciseId: number;
}
