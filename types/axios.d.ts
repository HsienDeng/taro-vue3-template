import * as axios from 'axios';

declare module 'axios' {
  export interface AxiosResponse<T> {
    code: number;
    message: string;
    data: T;
    [keys: string]: any;
  }
}
