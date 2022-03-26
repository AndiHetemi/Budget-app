import { UserAuth } from "../models/user_auth";

export interface IAuthAPIService {
    login(req: UserAuth): number;
    logout(): void;
    loggedIn(): boolean;
}