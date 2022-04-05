import { Injectable } from "@angular/core";
import { hashString } from "../helpers/hash";
import { FindUser } from "../models/find_user";
import { User } from "../models/user";
import { IUserAPIService } from "./user.api";

@Injectable({
    providedIn: 'root'
})
export class UserService implements IUserAPIService {
    localStorage: any;
    userKey: string;

    constructor() {
        this.localStorage = window.localStorage;
        this.userKey = 'users';
    }
    
    add(req: User): number {
        const usStr:  string = this.localStorage.getItem(this.userKey);
        let users: User[] = [];
        if (usStr && usStr != '') {
            users = JSON.parse(usStr);
            const lastus: User = users[users.length - 1];
            if (users.length != 0) {
                req.id = lastus.id+1;
            } else {
                req.id = 1;
            }
        } else {
            req.id = 1;
        }
        // hash password then save it
        req.hashPassword = hashString(req.password);
        req.password = '';
        users.push(req);
        this.localStorage.setItem(this.userKey, JSON.stringify(users));
        return req.id;
    }

    find(req: FindUser): User[] {
        let response: User[] = [];
        const usStr = this.localStorage.getItem(this.userKey);
        const userArray: User[] = JSON.parse(usStr);
        if (!userArray){
            return response;
        }
        let limit = req.pageSize;
        let offset = (req.page -1) * limit;
        for (let i = offset; i < limit+offset; i++) {
            if (userArray.length > i){
                if (req.username != '') {
                    if (userArray[i].username == req.username) {
                        response.push(userArray[i]);
                    }
                } else {
                    response.push(userArray[i]);
                }
            }
        }
        return response;
    }

    findbyId(reqId: number): User {
        const usStr =  this.localStorage.getItem(this.userKey);
        const userArray: User[] = JSON.parse(usStr);
        if (userArray){
            for (let us of userArray) {
                if (us.id == reqId){
                    return us
                }
            } 
        }
        return new User();
    }

    update(req: User): number {
        if (req.id == 0) {
            return 0;
        }
        const usStr = this.localStorage.getItem(this.userKey);
        const userArray: User [] = JSON.parse(usStr);
        if (userArray) {
            for (let us of userArray) {
                if (us.id == req.id) {
                    us.firstName = req.firstName;
                    us.lastName = req.lastName;
                    us.email = req.email;
                    us.username = req.username;
                    us.hashPassword = hashString(req.password);
                    us.password = '';
                    this.localStorage.setItem(this.userKey, JSON.stringify(userArray));
                    return req.id;
                }
            }   
        }
        return 0;
    }

    remove(reqId: number): number {
        const us = this.localStorage.getItem(this.userKey);
        let userArray: User[] = JSON.parse(us);
        if (userArray) {
            let userIndex = userArray.findIndex(us => us.id === reqId);
            if(userIndex > -1) {
                userArray.splice(userIndex, 1);
                this.localStorage.setItem(this.userKey, JSON.stringify(userArray));
                return reqId;
            }
        }
        return 0;
    }
}