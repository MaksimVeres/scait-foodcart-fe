import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {UserSignInModel} from '../model/user-sign-in-model';
import {ErrorResponseModel} from '../model/error-response-model';
import {UserSignUpModel} from '../model/user-sign-up-model';
import {Router} from '@angular/router';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static AUTH_ENDPOINT = environment.api_url + '/auth';
  private static JWT_ITEM = 'jwt';

  constructor(private http: HttpService,
              private router: Router) {
  }

  signIn(user: UserSignInModel, errorResponse: ErrorResponseModel): void {
    this.authorizeRequest(AuthService.AUTH_ENDPOINT + '/sign-in', user, errorResponse);
  }

  signUp(user: UserSignUpModel, errorResponse: ErrorResponseModel): void {
    this.authorizeRequest(AuthService.AUTH_ENDPOINT + '/sign-up', user, errorResponse);
  }

  authorizeRequest(url: string, body, errorResponse: ErrorResponseModel): void {
    this.http.doPost(url, body, this.authSuccessCallback(), errorResponse);
  }

  setToken(token: string): void {
    localStorage.setItem(AuthService.JWT_ITEM, token);
  }

  getToken(): string {
    return localStorage.getItem(AuthService.JWT_ITEM);
  }

  get isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  logOut(): void {
    localStorage.removeItem(AuthService.JWT_ITEM);
    this.router.navigate(['']);
  }

  authSuccessCallback(): any {
    return (response) => {
      this.setToken(response.token);
      this.router.navigate(['']);
    };
  }

  authErrorCallback(errorResponse: ErrorResponseModel): any {
    return (error) => {
      errorResponse.code = error.status;
    };
  }
}
