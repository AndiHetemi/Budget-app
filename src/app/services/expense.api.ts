import { Expense } from "../models/expense";

export interface IExpenseAPIService {
    add(req: Expense): number;
    find(): Expense[];
    findbyId(reqId: number): Expense;
    update(req: Expense): number;
    remove(reqId: number): number;
}