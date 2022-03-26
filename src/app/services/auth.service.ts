import { Injectable } from "@angular/core";
import { hashString } from "../helpers/hash";
import { User } from "../models/user";
import { UserAuth } from "../models/user_auth";
import { IAuthAPIService } from "./auth.api";

@Injectable({
    providedIn: 'root'
})
export class AuthService implements IAuthAPIService {
    localStorage: any;
    userKey: string;
    userDataKey: string;

    constructor() {
        this.localStorage = window.localStorage;
        this.userKey = 'users';
        this.userDataKey = 'userData';
    }

    login(req: UserAuth): number {
        const userStr = this.localStorage.getItem(this.userKey);
        const userArray: User[] = JSON.parse(userStr);
        if (!userArray) {
            return 0;
        }
        for (let us of userArray) {
            if (us.username == req.username) {
                const userHashPwd = us.hashPassword;
                // hash req password then check if it matches with this us.hashPassword
                const hashReqPwd = hashString(req.password);
                if (userHashPwd == hashReqPwd) {
                    this.localStorage.setItem(this.userDataKey, JSON.stringify(us));
                    return us.id;
                }
            }
        }
        return 0;
    }
    
    logout(): void {
        this.localStorage.removeItem(this.userDataKey);
    }

    loggedIn(): boolean {
        const loggedIn = this.localStorage.getItem(this.userDataKey);
        if (!loggedIn) {
            return false;
        }
        return true;
    }
}
    