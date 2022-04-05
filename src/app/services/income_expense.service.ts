import { Injectable } from "@angular/core";
import { Find } from "../models/find";
import { IncomeExpense } from "../models/income_expense";
import { IIncomeExpenseAPIService } from "./income_expense.api";

@Injectable({
    providedIn: 'root'
})
export class IncomeExpenseService implements IIncomeExpenseAPIService {
    localStorage: any;
    incomeKey: string;

    constructor() {
        this.localStorage = window.localStorage;
        this.incomeKey = 'incomes';
    }
    
    add(req: IncomeExpense): number {
        const inc:  string = this.localStorage.getItem(this.incomeKey);
        let incArray: IncomeExpense[] = [];
        if (inc && inc != '') {
            incArray = JSON.parse(inc);
            const lastinc: IncomeExpense = incArray[incArray.length - 1];
            req.id = lastinc.id+1;
        } else {
            req.id = 1;
        }
        incArray.push(req);
        this.localStorage.setItem(this.incomeKey, JSON.stringify(incArray));
        return req.id;
    }

    find(req: Find): IncomeExpense[] { 
        let response: IncomeExpense[] = [];
        const incStr = this.localStorage.getItem(this.incomeKey);
        const incArray: IncomeExpense[] = JSON.parse(incStr);
        if (!incArray) {
            return response;
        }
        // handle pagination
        let limit = req.pageSize;
        let offset = (req.page - 1) * limit;
        for (let i = offset; i < limit+offset; i++) {
            if (incArray.length > i) {
                response.push(incArray[i]);
            }
        }
        return response;
    }

    findbyId(reqId: number): IncomeExpense {
        const incStr = this.localStorage.getItem(this.incomeKey);
        const incArray: IncomeExpense[] = JSON.parse(incStr);
        if (incArray) {
            for (let inc of incArray) {
                if (inc.id == reqId) {
                    return inc;
                }
            }
        }
        return new IncomeExpense();
    }
    
    update(req: IncomeExpense): number {
        const incStr = this.localStorage.getItem(this.incomeKey);
        const incArray: IncomeExpense[] = JSON.parse(incStr);
        if (incArray) {
            for (let inc of incArray) {
                if (inc.id == req.id) {
                    inc = req;
                    this.localStorage.setItem(this.incomeKey, JSON.stringify(incArray));
                    return req.id;
                }
            }
        } 
        return 0;
    }

    remove(reqId: number): number {
        const inc = this.localStorage.getItem(this.incomeKey);
        let incArray: IncomeExpense[] = JSON.parse(inc);
        if (incArray) {
            let incIndex = incArray.findIndex(inc => inc.id === reqId);
            if (incIndex > -1) {
                incArray.splice(incIndex, 1);
                this.localStorage.setItem(this.incomeKey, JSON.stringify(incArray));
                return reqId;
            }
        }
        return 0;
    }
}