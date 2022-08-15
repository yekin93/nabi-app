import { User } from '../models/User';
import { UserRepo } from '../repositories/UserRepository';
import { Connection } from 'mysql2/promise';
import {v4 as uuid} from 'uuid';
import { ActivationRepo } from '../repositories/ActivationRepo';
import { Session } from '../models/Session';
import log from '../utils/logger';
import { MysqlDB } from '../db/mysql2';

export class UserService { 

    private static instance: UserService;
    private db: MysqlDB;
    private userRepo: UserRepo;

    constructor(){
        this.db = MysqlDB.getInstance();
        this.userRepo = UserRepo.getInstance();
    }

    static getInstace(): UserService {
        if(!this.instance){
            this.instance = new UserService();
        }
        return this.instance;
    }

    async getAll(): Promise<User[]>{
        const conn: Connection = await this.db.getConnection();
        try{
            let users: User[] = await this.userRepo.getAll(conn);
            this.db.closeConnection(conn, true);
            return users;
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async getUserById(id: number): Promise<User> {
        let user: User;
        let conn!: Connection;
        try{
            conn = await this.db.getConnection();
            user = await this.userRepo.getUserById(conn, id);
            this.db.closeConnection(conn, true);
            return user;
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

     async insertUser(name: string, surname: string, email: string, password: string): Promise<User> {
        let conn!: Connection;
        try{
            conn = await this.db.getConnection()
            const token: string = uuid();
            const insertedId: number = await this.userRepo.insertUser(conn, name, surname, email, password);
            const user: User = await this.userRepo.getUserById(conn, insertedId);
            await ActivationRepo.createActivation(conn, user.getId, token);
            log.info(`New user created ${user.getEmail}`);
            this.db.closeConnection(conn, true);
            return user
        } catch(err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async getUserBySession(token: string): Promise<User | null> {
        let conn!: Connection;
        try {
            conn = await this.db.getConnection();
            const session: Session = await this.userRepo.getSessionByToken(conn, token);
            const user: User | null = session ? session.getUser : null;
            this.db.closeConnection(conn, true);
            return user;
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async login(email: string, password: string): Promise<string | null> {
        let conn!: Connection;
        try{
            conn = await this.db.getConnection();
            let token: string | null = null;
            const user: User = await this.userRepo.getUserByEmailAndPassword(conn, email, password);
            log.info(`login user: ${user}`);
            if(user){
                if(user.getIsActive == 0) throw new Error('User is not active, Please activate user!');
                token = uuid();
                await this.userRepo.insertSession(conn, user.getId, token);
            }
            this.db.closeConnection(conn, true);
            return token;
        } catch(err){
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async logout(token: string): Promise<void> {
        let conn!: Connection;
        try {
            conn = await this.db.getConnection();
            await this.userRepo.removeSession(conn, token);
            this.db.closeConnection(conn, true);
        } catch(err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }
}