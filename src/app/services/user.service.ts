import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {ResultConsumer} from '../model/result-consumer';
import {UserModel} from '../model/user-model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

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
}
