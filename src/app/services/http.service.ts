import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorResponseModel} from '../model/error-response-model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
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
}
