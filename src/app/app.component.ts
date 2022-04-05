import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  loggedIn: boolean;

  constructor(private _authSvc: AuthService, private _router: Router) {
    this.loggedIn = this._authSvc.loggedIn();
  }

  ngAfterContentInit(): void {
    this.loggedIn = this._authSvc.loggedIn(); 
  }

  logout() {
    this._authSvc.logout();
    this._router.navigate(['/login']);
    window.location.reload();
  }
}
