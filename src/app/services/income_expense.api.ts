import { Find } from "../models/find";
import { IncomeExpense } from "../models/income_expense";

export interface IIncomeExpenseAPIService {
    add(req: IncomeExpense): number;
    find(req: Find): IncomeExpense[];
    findbyId(reqId: number): IncomeExpense;
    update(req: IncomeExpense): number;
    remove(reqId: number): number;
}