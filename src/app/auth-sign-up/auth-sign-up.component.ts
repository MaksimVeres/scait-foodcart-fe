import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ErrorResponseModel} from '../model/error-response-model';
import HttpStatusCode from '../constants/http-status-code';
import {Messages} from '../constants/messages';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrls: ['./auth-sign-up.component.css']
})
export class AuthSignUpComponent implements OnInit {

  signUpForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      login: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      password: new FormControl('', Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
    }
  );
  errorResponse: ErrorResponseModel = new ErrorResponseModel();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    this.errorResponse = new ErrorResponseModel();

    if (!this.signUpForm.valid) {
      console.log('INVALID');
      this.errorResponse.code = HttpStatusCode.BAD_REQUEST;
      return;
    }

    this.authService.signUp(this.signUpForm.value, this.errorResponse);
  }

  processError(): void {
    console.log('error = '+ this.errorResponse.code);
    if (this.errorResponse.code === HttpStatusCode.BAD_REQUEST) {
      this.errorResponse.message = Messages.MESSAGE_WRONG_REGISTER_DATA;
    } else if (this.errorResponse.code === HttpStatusCode.FORBIDDEN) {
      this.errorResponse.message = Messages.MESSAGE_FORBIDDEN;
    } else if (this.errorResponse.code === HttpStatusCode.CONFLICT) {
      this.errorResponse.message = Messages.MESSAGE_SUCH_USER_ALREADY_EXISTS;
    } else if (this.errorResponse.code === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      this.errorResponse.message = Messages.MESSAGE_INTERNAL_SERVER_ERROR;
    }
  }
}
