import { Find } from "../models/find";
import { Income } from "../models/income";

export interface IIncomeAPIService {
    add(req: Income): number;
    find(req: Find): Income[];
    findbyId(reqId: number): Income;
    update(req: Income): number;
    remove(reqId: number): number;
}