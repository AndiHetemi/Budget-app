import { Injectable } from "@angular/core";
import { Expense } from "../models/expense";
import { IExpenseAPIService } from "./expense.api";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService implements IExpenseAPIService {
    localStorage: any;
    expKey: string = 'expenses';

    constructor() {
        this.localStorage = window.localStorage;
    }

    add(req: Expense): number {
        const exp:  string = this.localStorage.getItem(this.expKey);
        let expArray: Expense[] = [];
        if (exp && exp != '') {
            expArray = JSON.parse(exp);
            const lastExp: Expense = expArray[expArray.length -1 ];
            req.id = lastExp.id+1;

        } else {
            req.id = 1;
        }
        expArray.push(req);
        this.localStorage.setItem(this.expKey, JSON.stringify(expArray));
        return req.id
    }

    find(): Expense[] {
        const expStr = this.localStorage.getItem(this.expKey);
        const expArray: Expense [] = JSON.parse(expStr);
        return expArray;
    }
    
    findbyId(reqId: number): Expense {
        const exp =  this.localStorage.getItem(this.expKey);
        const expArray: Expense[] = JSON.parse(exp);
        for (let ex of expArray) {
            if (ex.id == reqId) {
                return ex;
            }
        }
        return  new Expense();
    }

    update(req: Expense): number {
        const exp = this.localStorage.getItem(this.expKey);
        const expArray: Expense[] = JSON.parse(exp);
        for (let ex of expArray){
            if (ex.id == req.id) {
                ex = req;
                this.localStorage.setItem(this.expKey, JSON.stringify(expArray));
                return req.id;
            }
        }
        return 0;
    }
 
    remove(reqId: number): number {
        const exp = this.localStorage.getItem(this.expKey);
        let expArray: Expense[] = JSON.parse(exp);
        let expIndex = expArray.findIndex(exp => exp.id === reqId);
        if (expIndex > -1) {
            expArray.splice(expIndex, 1);
            this.localStorage.setItem(this.expKey, JSON.stringify(expArray));
            return reqId;   
        }
        return 0;
    }
    
}