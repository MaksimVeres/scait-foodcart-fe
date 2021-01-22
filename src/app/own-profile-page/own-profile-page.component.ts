import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ResultConsumer} from '../model/result-consumer';
import {UserModel} from '../model/user-model';
import {UserService} from '../services/user.service';
import HttpStatusCode from '../constants/http-status-code';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Messages} from '../constants/messages';
import {ErrorResponseModel} from '../model/error-response-model';

@Component({
  selector: 'app-own-profile-page',
  templateUrl: './own-profile-page.component.html',
  styleUrls: ['./own-profile-page.component.css']
})
export class OwnProfilePageComponent implements OnInit {

  private static PARAMETER_IMAGE = 'image';
  result: ResultConsumer<UserModel> = new ResultConsumer<UserModel>();
  imageUploadError: ErrorResponseModel = new ErrorResponseModel();
  loginChangeError: ErrorResponseModel = new ErrorResponseModel();
  uploadForm: FormGroup;
  login = '';

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.result.error = new ErrorResponseModel();
    if (!authService.isLoggedIn) {
      this.router.navigate(['auth/sign-in']);
    }
    this.userService.getMyUser(this.result);
  }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      image: ['']
    });
  }

  onFileSelect(event): void {
    this.imageUploadError = new ErrorResponseModel();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get(OwnProfilePageComponent.PARAMETER_IMAGE).setValue(file);
    }
  }

  onImageSubmit(): void {
    const formData = new FormData();
    formData.append(OwnProfilePageComponent.PARAMETER_IMAGE, this.uploadForm.get(OwnProfilePageComponent.PARAMETER_IMAGE).value);
    this.userService.uploadImage(
      formData,
      this.imageUploadError
    );
  }

  onLoginSubmit(): void {
    this.userService.updateLogin(this.login, this.loginChangeError);
  }

  getImagePath(): string {
    return this.userService.getImagePath(this.result.value.uuid);
  }

  processProfileLoadError(): void {
    if (this.result.error.code === HttpStatusCode.FORBIDDEN || this.result.error.code === HttpStatusCode.UNAUTHORIZED) {
      this.authService.logOut();
      this.router.navigate(['auth/sign-in']);
    }
  }

  processImageError(): void {
    if (this.imageUploadError.code === HttpStatusCode.FORBIDDEN || this.imageUploadError.code === HttpStatusCode.UNAUTHORIZED) {
      this.authService.logOut();
      this.router.navigate(['auth/sign-in']);
    } else if (this.imageUploadError.code === HttpStatusCode.BAD_REQUEST) {
      this.imageUploadError.message = Messages.MESSAGE_NO_FILE_SELECTED;
    } else {
      this.imageUploadError.message = Messages.MESSAGE_SOMETHING_WENT_WRONG;
    }
  }

  processLoginChangeError(): void {
    if (this.loginChangeError.code === HttpStatusCode.FORBIDDEN || this.loginChangeError.code === HttpStatusCode.UNAUTHORIZED) {
      this.authService.logOut();
      this.router.navigate(['auth/sign-in']);
    } else if (this.loginChangeError.code === HttpStatusCode.BAD_REQUEST) {
      this.loginChangeError.message = Messages.MESSAGE_BAD_LOGIN;
    } else if (this.loginChangeError.code === HttpStatusCode.CONFLICT) {
      this.loginChangeError.message = Messages.MESSAGE_SUCH_LOGIN_ALREADY_EXISTS;
    } else {
      this.loginChangeError.message = Messages.MESSAGE_SOMETHING_WENT_WRONG;
    }
  }

  toChangePasswordPage(): void {
    this.router.navigate(['user/my/password-change']);
  }
}
