import { FindUser } from '../models/find_user';
import { User } from '../models/user';

export interface IUserAPIService {
    add(req: User): number;
    find(req: FindUser): User[];
    findbyId(reqId: number): User;
    update(req: User): number;
    remove(reqId: number): number;
}