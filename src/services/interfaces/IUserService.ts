import { User } from "../../models/User";

export interface IUserService {
    getAll(): Promise<Array<User>>;
}