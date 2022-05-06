import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentInit {
  loggedIn: boolean;
  userFirstName: string;

  constructor(private _authSvc: AuthService, private _router: Router) {
    this.loggedIn = this._authSvc.loggedIn();
    this.userFirstName = '';
  }

  ngOnInit(): void {
    let loggedUser = this._authSvc.userData();
    if (loggedUser) {
      this.userFirstName = loggedUser.firstName;
    }
  }

  ngAfterContentInit(): void {
    this.loggedIn = this._authSvc.loggedIn();
  }

  logout() {
    this._authSvc.logout();
    this._router.navigate(['/home']);
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }
  
  login() {
    this._router.navigate(['/login']);
  }
}
