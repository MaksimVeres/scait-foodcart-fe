import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {ResultConsumer} from '../model/result-consumer';
import {UserModel} from '../model/user-model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {ErrorResponseModel} from '../model/error-response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static ENDPOINT = environment.api_url + '/user';

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private router: Router) {
  }

  getUserByUuid(uuid: string, resultConsumer: ResultConsumer<UserModel>): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['auth/sign-in']);
      return;
    }
    const api = UserService.ENDPOINT + '/' + uuid;
    this.httpService.doGet(api, null, this.userGetCallback(resultConsumer), this.userGetErrorCallback(resultConsumer));
  }

  getMyUser(resultConsumer: ResultConsumer<UserModel>): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['auth/sign-in']);
      return;
    }
    const api = UserService.ENDPOINT + '/my';
    this.httpService.doGet(api, null, this.userGetCallback(resultConsumer), this.userGetErrorCallback(resultConsumer));
  }

  uploadImage(formData: FormData, errorResponseModel: ErrorResponseModel): void {
    this.httpService.doPost(this.getImageUploadPath(), formData,
      (response) => {
        console.log('Image uploaded');
      },
      errorResponseModel
    );
  }

  updateLogin(login: string, errorResponseModel: ErrorResponseModel): void {
    const api = UserService.ENDPOINT + '/my/login?login=' + login;
    this.httpService.doPatch(api, null, (response) => {
        console.log('Login changed');
        alert('Login changed. Please log in again');
        this.authService.logOut();
        this.router.navigate(['auth/sign-in']);
      },
      errorResponseModel);
  }

  updatePassword(password: string, errorResponseModel: ErrorResponseModel): void {
    const api = UserService.ENDPOINT + '/my/password';
    this.httpService.doPost(api, {password}, (response) => {
        console.log('Password changed');
        alert('Password changed. Please log in again');
        this.authService.logOut();
        this.router.navigate(['auth/sign-in']);
      },
      errorResponseModel);
  }

  userGetCallback(resultConsumer: ResultConsumer<UserModel>): any {
    return (response) => {
      resultConsumer.value = response;
    };
  }

  userGetErrorCallback(resultConsumer: ResultConsumer<UserModel>): any {
    return (error) => {
      resultConsumer.error.code = error.status;
    };
  }

  getImagePath(uuid: string): string {
    return UserService.ENDPOINT + '/' + uuid + '/image';
  }

  getImageUploadPath(): string {
    return UserService.ENDPOINT + '/my/image';
  }
}
