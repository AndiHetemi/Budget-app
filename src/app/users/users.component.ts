import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FindUser } from '../models/find_user';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedDeleteUserId: number;
  findUsers: FindUser;
  totalLength: number;

  constructor(private _router: Router, private _userSvc: UserService) { 
    this.users = [];
    this.selectedDeleteUserId = 0;
    this.findUsers = new FindUser();
    this.totalLength = 0;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.users = this._userSvc.find(this.findUsers);
    this.loadDataCount();
  }

  loadDataCount() {
    this.totalLength = this._userSvc.count();
  }

  pageChange(page: number) {
    this.findUsers.page = page;
    this.loadData();
  }

  goToAddUserPage() {
    this._router.navigate(['/users/add']);
  }

  goToEditPage(userId: number) {
    this._router.navigate([`/users/edit/${userId}`]);
  }
  
  removeUser() {
    if (this.selectedDeleteUserId == 0) {
      return;
    }
    let resId = this._userSvc.remove(this.selectedDeleteUserId);
    if (resId != 0) {
      this.loadData();
      let modalDeleteCloseBtn = <HTMLButtonElement>document.getElementById("closeModalButton");
      if (modalDeleteCloseBtn) {
        modalDeleteCloseBtn.click();
      }
    }
  }

  setSelectedUserId(userId: number) {
    this.selectedDeleteUserId = userId;
  }
}
