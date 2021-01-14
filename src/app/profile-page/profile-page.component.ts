import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResultConsumer} from '../model/result-consumer';
import {UserModel} from '../model/user-model';
import {ErrorResponseModel} from '../model/error-response-model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  result: ResultConsumer<UserModel> = new ResultConsumer<UserModel>();

  constructor(private activateRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.result.error = new ErrorResponseModel();
    const snapshot = this.activateRoute.snapshot;
    const uuid = snapshot.paramMap.get('uuid');
    if (!uuid) {
      this.router.navigate(['articles']);
    } else {
      this.userService.getUserByUuid(uuid, this.result);
    }
  }

  ngOnInit(): void {
  }

  getImagePath(): string {
    return this.userService.getImagePath(this.result.value.uuid);
  }
}
