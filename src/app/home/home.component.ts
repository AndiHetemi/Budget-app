import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean;

  constructor(private _authSvc: AuthService, private router: Router) {
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.loggedIn = this._authSvc.loggedIn();
  }

  login() {
    this.router.navigate(['/login']);
  }
}