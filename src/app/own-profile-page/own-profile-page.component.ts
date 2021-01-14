import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ResultConsumer} from '../model/result-consumer';
import {UserModel} from '../model/user-model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-own-profile-page',
  templateUrl: './own-profile-page.component.html',
  styleUrls: ['./own-profile-page.component.css']
})
export class OwnProfilePageComponent implements OnInit {

  result: ResultConsumer<UserModel> = new ResultConsumer<UserModel>();

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
    if (!authService.isLoggedIn) {
      this.router.navigate(['auth/sign-in']);
    }
    this.userService.getMyUser(this.result);
  }

  ngOnInit(): void {
  }

  getImagePath(): string {
    return this.userService.getImagePath(this.result.value.uuid);
  }
}
