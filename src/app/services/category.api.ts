import { Category } from "../models/category";

export interface ICategoryAPIService {
    add(req: Category): number;
    find(): Category[];
    findById(reqId: number): Category;
    update(req: Category): number;
    remove(reqId: number): number;
}