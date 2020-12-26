import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorResponseModel} from '../model/error-response-model';
import {AuthService} from '../services/auth.service';
import {Messages} from '../constants/messages';
import HttpStatusCode from '../constants/http-status-code';

@Component({
  selector: 'app-auth-sign-in',
  templateUrl: './auth-sign-in.component.html',
  styleUrls: ['./auth-sign-in.component.css']
})
export class AuthSignInComponent implements OnInit {

  signInForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
    }
  );
  errorResponse: ErrorResponseModel = new ErrorResponseModel();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  signIn(): void {
    this.errorResponse = new ErrorResponseModel();

    if (!this.signInForm.valid) {
      this.errorResponse.code = HttpStatusCode.BAD_REQUEST;
      return;
    }

    this.authService.signIn(this.signInForm.value, this.errorResponse);
  }

  processError(): void {
    if (this.errorResponse.code === HttpStatusCode.UNAUTHORIZED) {
      this.errorResponse.message = Messages.MESSAGE_WRONG_LOGIN_OR_PASSWORD;
    } else if (this.errorResponse.code === HttpStatusCode.BAD_REQUEST) {
      this.errorResponse.message = Messages.MESSAGE_BAD_REQUEST;
    } else if (this.errorResponse.code === HttpStatusCode.FORBIDDEN) {
      this.errorResponse.message = Messages.MESSAGE_USER_IS_NOT_ACTIVE;
    } else if (this.errorResponse.code === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      this.errorResponse.message = Messages.MESSAGE_INTERNAL_SERVER_ERROR;
    }
  }
}
