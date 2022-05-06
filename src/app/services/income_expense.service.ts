import { Injectable } from "@angular/core";
import { FindIncomeExpense } from "../models/find_income_expense";
import { IncomeExpense } from "../models/income_expense";
import { IIncomeExpenseAPIService } from "./income_expense.api";

@Injectable({
    providedIn: 'root'
})
export class IncomeExpenseService implements IIncomeExpenseAPIService {
    localStorage: any;
    incomeExpenseKey: string;

    constructor() {
        this.localStorage = window.localStorage;
        this.incomeExpenseKey = 'incomesExpenses';
    }
    
    add(req: IncomeExpense): number {
        const inc:  string = this.localStorage.getItem(this.incomeExpenseKey);
        let incArray: IncomeExpense[] = [];
        if (inc && inc != '') {
            incArray = JSON.parse(inc);
            const lastinc: IncomeExpense = incArray[incArray.length - 1];
            if (incArray.length != 0) {
                req.id = lastinc.id+1;
            } else {
                req.id = 1;
            }
        } else {
            req.id = 1;
        }
        incArray.push(req);
        this.localStorage.setItem(this.incomeExpenseKey, JSON.stringify(incArray));
        return req.id;
    }

    find(req: FindIncomeExpense): IncomeExpense[] { 
        let response: IncomeExpense[] = [];
        const incStr = this.localStorage.getItem(this.incomeExpenseKey);
        const incArray: IncomeExpense[] = JSON.parse(incStr);
        if (!incArray) {
            return response;
        }
        // handle pagination
        let limit = req.pageSize;
        let offset = (req.page - 1) * limit;
        for (let i = offset; i < limit+offset; i++) {
            if (incArray.length > i) {
                if (req.type) {
                    if (req.type == incArray[i].type) {
                        response.push(incArray[i]);
                    }
                }
                if (!req.type) {
                    response.push(incArray[i]);
                }  
            }
        }
        return response;
    }

    findbyId(reqId: number): IncomeExpense {
        const incStr = this.localStorage.getItem(this.incomeExpenseKey);
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
        const incExpStr = this.localStorage.getItem(this.incomeExpenseKey);
        const incExpArray: IncomeExpense[] = JSON.parse(incExpStr);
        if (incExpArray) {
            for (let incExp of incExpArray) {
                if (incExp.id == req.id) {
                    incExp.amount = req.amount;
                    incExp.description = req.description;
                    incExp.categoryId = req.categoryId;
                    incExp.updatedAt = req.updatedAt;
                    this.localStorage.setItem(this.incomeExpenseKey, JSON.stringify(incExpArray));
                    return req.id;
                }
            }
        } 
        return 0;
    }

    remove(reqId: number): number {
        const inc = this.localStorage.getItem(this.incomeExpenseKey);
        let incArray: IncomeExpense[] = JSON.parse(inc);
        if (incArray) {
            let incIndex = incArray.findIndex(inc => inc.id === reqId);
            if (incIndex > -1) {
                incArray.splice(incIndex, 1);
                this.localStorage.setItem(this.incomeExpenseKey, JSON.stringify(incArray));
                return reqId;
            }
        }
        return 0;
    }
}