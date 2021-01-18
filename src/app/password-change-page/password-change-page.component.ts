import {Component, OnInit} from '@angular/core';
import {ErrorResponseModel} from '../model/error-response-model';
import {Messages} from '../constants/messages';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import HttpStatusCode from '../constants/http-status-code';

@Component({
  selector: 'app-password-change-page',
  templateUrl: './password-change-page.component.html',
  styleUrls: ['./password-change-page.component.css']
})
export class PasswordChangePageComponent implements OnInit {

  passwordChangeObject = {password: '', repeatedPassword: ''};
  error: ErrorResponseModel = new ErrorResponseModel();

  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  changePassword(): void {
    this.error = new ErrorResponseModel();
    if (this.passwordChangeObject.password !== this.passwordChangeObject.repeatedPassword) {
      this.error.message = Messages.MESSAGE_PASSWORDS_DONT_MATCH;
      return;
    }
    this.userService.updatePassword(this.passwordChangeObject.password, this.error);
  }

  processError(): void {
    if (this.error.code === HttpStatusCode.FORBIDDEN || this.error.code === HttpStatusCode.UNAUTHORIZED) {
      this.authService.logOut();
      this.router.navigate(['auth/sign-in']);
    } else if (this.error.code === HttpStatusCode.BAD_REQUEST) {
      this.error.message = Messages.MESSAGE_WRONG_PASSWORD;
    } else if (this.error.code) {
      this.error.message = Messages.MESSAGE_SOMETHING_WENT_WRONG;
    }
  }
}
