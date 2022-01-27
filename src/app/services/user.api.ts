import { Find } from '../models/find';
import { User } from '../models/user';

export interface IUserAPIService {
    add(req: User): number;
    find(req: Find): User[];
    findbyId(reqId: number): User;
    update(req: User): number;
    remove(reqId: number): number;
}