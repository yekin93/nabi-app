import { User } from '../models/User';
import { IUser } from '../interfaces/IUser';
import { Connection } from 'mysql2/promise';
import { Session } from '../models/Session';
import log from '../utils/logger';
import { IUserRepo } from './interface/IUserRepo';
log.profile('User Respository');

export class UserRepo implements IUserRepo {

    private static instance: UserRepo;

    static getInstance(): UserRepo {
        if(!this.instance){
            this.instance = new UserRepo();
        }
        return this.instance;
    }

    async getAll(conn: Connection): Promise<User[]> {
        const [rows] = await conn.execute<IUser[]>(`SELECT ${User.sql()} FROM user`);
        const user: User[] = [];
        rows.map((row: IUser) => user.push(User.row(row)));
        return user;
    }
    async getUserById(conn: Connection, id: number): Promise<User> {
        let user!: User;
        const [rows] = await conn.execute<IUser[]>(`SELECT ${User.sql()} FROM user WHERE user.id = ? AND user.is_deleted = 0`, [id]);
        rows.map((row: IUser) => user = User.row(row));
        return user;
    }
    async insertUser(conn: Connection, name: string, surname: string, email: string, password: string): Promise<number> {
        const [ResultSetHeader]: any  = await conn.execute('INSERT INTO user(name, surname, email, password, modified_time, created_time) VALUES (?, ?, ?, PASSWORD2(?), NOW(), NOW())', [name, surname, email, password]);
        return ResultSetHeader['insertId'];
    }
    async activateUserById(conn: Connection, id: number): Promise<void> {
        await conn.execute('UPDATE user SET is_active = 1, modified_time = NOW() WHERE user.id = ?', [id]);
    }
    async getUserByEmailAndPassword(conn: Connection, email: string, password: string): Promise<User> {
        let user!: User;
        const query = `SELECT ${User.sql()} FROM user WHERE email = ? AND password = PASSWORD2(?) AND is_deleted = 0`;
        log.info(`getUserByEmailAndPassword sql: ${query}`);
        const [rows] = await conn.execute<IUser[]>(query, [email, password]);
        rows.map((row: IUser) => {
            user = User.row(row);
        });
        return user;
    }
    async getSessionByToken(conn: Connection, token: string): Promise<Session | null> {
        let session: Session | null = null;
        let user: User | null = null;
        let query = `SELECT ${Session.sql()}, ${User.sql()} FROM session LEFT JOIN user ON session.user_id = user.id WHERE session.is_deleted = 0 AND session.token = ?`;
        log.info('getSessionByToken sql:'+ query);
        const [rows] = await conn.execute<any[]>(query, [token]);
        rows.map(row => {
            session = Session.row(row);
            user = User.row(row);
            session.setUser = user;
        });
        return session;
    }
    async insertSession(conn: Connection, userId: number, token: string): Promise<void> {
        await conn.execute(`INSERT INTO session (user_id, token, created_time) VALUES (?, ?, NOW())`, [userId, token]);
    }

    async removeSession(conn: Connection, token: string): Promise<void> {
       const query = 'UPDATE session SET is_deleted = 1 WHERE session.token = ?';
       await conn.execute(query, [token]);
    }
}