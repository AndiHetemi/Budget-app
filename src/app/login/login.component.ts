import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuth } from '../models/user_auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public username: FormControl;
  public password: FormControl;
  submitted: boolean;
  loginError: boolean;
  
  constructor(private _authSvc: AuthService, private _router: Router) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
    this.submitted = false;
    this.loginError = false;
  }

  ngOnInit(): void {
    if (this._authSvc.loggedIn()) {
      this._router.navigate(['/home']);
    }
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit() {
    this.loginError = false;
    this.submitted = true;
    const authReq = new UserAuth();
    authReq.username = this.username.value;
    authReq.password = this.password.value;
    const id = this._authSvc.login(authReq);
    if (id == 0) {
      this.loginError = true;
      return;
    }
    // logged in successful
    this._router.navigate(['/home']);
  }
}
