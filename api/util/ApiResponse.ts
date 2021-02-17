import { IErrorResponse } from './IErrorResponse';


export interface IAPIResponse<T> {
  Version: string;
  StatusCode: number;
  Data: T;
}