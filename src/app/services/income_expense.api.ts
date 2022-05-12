import { FindIncomeExpense } from "../models/find_income_expense";
import { IncomeExpense } from "../models/income_expense";

export interface IIncomeExpenseAPIService {
    add(req: IncomeExpense): number;
    find(req: FindIncomeExpense): IncomeExpense[];
    findbyId(reqId: number): IncomeExpense;
    update(req: IncomeExpense): number;
    remove(reqId: number): number;
    count(): number;
}