export interface ITemplateDifficulty {
  templateDifficultyId: number;
  templateDifficultyName: string;
}

export interface IRepSchemeType {
  repSchemeTypeId: number;
  repSchemeName: string;
}

export interface IQuote {
  quoteId: number;
  quoteStr: string;
  author: string;
  year: number;
  active: boolean;
}

export interface IGender {
  genderId: number;
  genderName: string;
}

export interface IMemberStatus {
  memberStatusId: number;
  memberStatusName: string;
}
