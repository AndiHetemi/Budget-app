import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FindUser } from '../models/find_user';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  public addEditForm: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public username: FormControl;
  public email: FormControl;
  public password: FormControl;
  public submitted: boolean;
  sameUsernameError: boolean;
  saveSuccess: boolean;
  isEditMode: boolean;
  userIdParam: string;

  constructor(private _router: Router, private _userSvc: UserService, private _activatedRoute: ActivatedRoute) {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.username = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.submitted = false;
    this.addEditForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password
    });
    this.sameUsernameError = false;
    this.saveSuccess = false;
    this.isEditMode = false;
    this.userIdParam = '';
  }

  get f(): any { return this.addEditForm.controls; }

  ngOnInit(): void {
    this.userIdParam = this._activatedRoute.snapshot.params['userId'];
    if (this.userIdParam && this.userIdParam != '') {
      this.isEditMode = true;
    }
    if (this.isEditMode) {
      let userIdInt = parseInt(this.userIdParam);
      let user = this._userSvc.findbyId(userIdInt);
      if (user.id != 0) {
        this.addEditForm.get('firstName')?.setValue(user.firstName);
        this.addEditForm.get('lastName')?.setValue(user.lastName);
        this.addEditForm.get('username')?.setValue(user.username);
        this.addEditForm.get('email')?.setValue(user.email);
      } else {
        this._router.navigate(['/users']);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    this.sameUsernameError = false;
    this.saveSuccess = false;
    // find users with username if exists return
    if (!this.isEditMode) {
      let findUsr = new FindUser();
      findUsr.username = this.username.value;
      let usrs = this._userSvc.find(findUsr);
      if (usrs.length != 0) {
        this.sameUsernameError = true;
        return;
      }
    }

    let userReq = new User();
    userReq.firstName = this.firstName.value;
    userReq.lastName = this.lastName.value;
    userReq.username = this.username.value;
    userReq.email = this.email.value;
    userReq.password = this.password.value;
    if (this.isEditMode) {
      userReq.id = parseInt(this.userIdParam);
      let updateResId = this._userSvc.update(userReq);
      if (updateResId != 0) {
        this.saveSuccess = true;
        return;
      }
    }
    let resId = this._userSvc.add(userReq);
    if (resId != 0) {
      this.saveSuccess = true;
      return
    }
  }
}
