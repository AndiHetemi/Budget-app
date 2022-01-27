import { convertUpdateArguments } from "@angular/compiler/src/compiler_util/expression_converter";
import { Injectable } from "@angular/core";
import { Budget } from "../models/budget";
import { IBudgetAPIService } from "./budget.api";


@Injectable({
    providedIn: 'root'
})
export class BudgetService implements IBudgetAPIService {
    localStorage: any;
    budgetKey: string;
    
    constructor() {
        this.localStorage = window.localStorage;
        this.budgetKey = 'budget';
    }
    
    add(req: Budget): void {
        this.localStorage.setItem(this.budgetKey, JSON.stringify(req));
    
    } 

    find(): Budget {
        let budgetStr: string = this.localStorage.getItem(this.budgetKey);
        let budgetObj: Budget = JSON.parse(budgetStr);
        return budgetObj;
    }
    
    update(req: Budget): void {
        this.localStorage.setItem(this.budgetKey, JSON.stringify(req));
    }
    
}