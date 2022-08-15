import { Connection } from "mysql2/promise";
import { Session } from "../../models/Session";
import { User } from "../../models/User";

export interface IUserRepo {
    getAll(conn: Connection): Promise<User[]>;
    getUserById(conn: Connection, id: number): Promise<User>;
    insertUser(conn: Connection, name: string, surname: string, email: string, password: string): Promise<number>;
    activateUserById(conn: Connection, id: number): Promise<void>;
    getUserByEmailAndPassword(conn: Connection, email: string, password: string): Promise<User>;
    getSessionByToken(conn: Connection, token: string): Promise<Session>;
    insertSession(conn: Connection, userId: number, token: string): Promise<void>
    removeSession(conn: Connection, token: string): Promise<void>;
}