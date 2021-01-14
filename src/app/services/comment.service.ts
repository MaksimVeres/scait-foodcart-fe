import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpService} from './http.service';
import {CommentCreateModel} from '../model/comment-create-model';
import {ErrorResponseModel} from '../model/error-response-model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private static ENDPOINT = environment.api_url + '/comments';

  constructor(private httpService: HttpService,
              private authService: AuthService,
              private router: Router) {
  }

  createComment(articleUuid: string, model: CommentCreateModel, error: ErrorResponseModel): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['auth/sign-in']);
      return;
    }
    const api = CommentService.ENDPOINT + '/articles/' + articleUuid;
    this.httpService.doPost(api, model, this.createCommentSuccessCallback(), error);
  }

  createCommentSuccessCallback(): any {
    return (response) => {
      window.location.reload();
    };
  }
}
