import { IErrorResponse } from './IErrorResponse';


export class ApiResponse<T> {
    [x: string]: any;
    private data: T;
    private success: boolean;
  
    constructor(data: T) {
      this.data = data;
      console.log(this.data);
      
    }
}
  