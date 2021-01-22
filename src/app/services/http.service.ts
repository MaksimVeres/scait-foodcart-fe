import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorResponseModel} from '../model/error-response-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  doGetCatchingError(url: string, param, successCallback, errorResponse: ErrorResponseModel): void {
    this.http.get<any>(url, {params: param})
      .subscribe(
        response => {
          successCallback(response);
        },
        error => {
          errorResponse.code = error.status;
        }
      );
  }

  doGet(url: string, param, successCallback: any, errorCallback: any): void {
    this.http.get<any>(url, {params: param})
      .subscribe(
        response => {
          successCallback(response);
        },
        error => {
          errorCallback(error);
        }
      );
  }

  doPost(url: string, body, successCallback, errorResponse: ErrorResponseModel): void {
    this.http.post<any>(url, body)
      .subscribe(response => {
          successCallback(response);
        },
        error => {
          errorResponse.code = error.status;
        });
  }

  doPut(url: string, body, successCallback, errorResponse: ErrorResponseModel): void {
    this.http.put<any>(url, body)
      .subscribe(response => {
          successCallback(response);
        },
        error => {
          errorResponse.code = error.status;
        });
  }

  doPatch(url: string, param, successCallback: any, errorResponse: ErrorResponseModel): void {
    this.http.patch<any>(url, {params: param})
      .subscribe(
        response => {
          successCallback(response);
        },
        error => {
          errorResponse.code = error.status;
        }
      );
  }
}
