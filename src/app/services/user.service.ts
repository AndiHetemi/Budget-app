import { Injectable } from "@angular/core";
import { hashString } from "../helpers/hash";
import { Find } from "../models/find";
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
            req.id = lastus.id+1;
        } else {
            req.id = 1;
        }
        // hash newPassword then save it
        req.hashPassword = hashString(req.newPassword);
        users.push(req);
        this.localStorage.setItem(this.userKey, JSON.stringify(users));
        return req.id;
    }

    find(req: Find): User[] {
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
                response.push(userArray[i]);
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
        const usStr = this.localStorage.getItem(this.userKey);
        const userArray: User [] = JSON.parse(usStr);
        if (userArray) {
            for (let us of userArray){
                if (us.id == req.id) {
                    us = req;
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
                this.localStorage.setItem (this.userKey, JSON.stringify(userArray));
                return reqId;
            }
        }
        return 0;
    }
}