import { Budget } from "../models/budget";

export interface IBudgetAPIService {
    add(req: Budget): void;
    find(): Budget;
    update(req: Budget): void; 

}