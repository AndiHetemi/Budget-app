import { Category } from "../models/category";
import { Find } from "../models/find";

export interface ICategoryAPIService {
    add(req: Category): number;
    find(req: Find): Category[];
    findById(reqId: number): Category;
    update(req: Category): number;
    remove(reqId: number): number;
    count(): number;
}