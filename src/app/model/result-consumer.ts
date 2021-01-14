import {ErrorResponseModel} from './error-response-model';

export class ResultConsumer<T> {

  value: T;
  error: ErrorResponseModel;
}
