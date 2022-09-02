import { User } from '../models/User';
import { UserRepo } from '../repositories/UserRepository';
import { Connection } from 'mysql2/promise';
import {v4 as uuid} from 'uuid';
import { ActivationRepo } from '../repositories/ActivationRepo';
import { Session } from '../models/Session';
import log from '../utils/logger';
import { MysqlDB } from '../db/mysql2';
import { UserMail } from '../mail/UserMail';
import { RolePermissionRepo } from '../repositories/RolePermissionRepo';
import { Permission } from '../models/Permission';

export class UserService { 

    private static instance: UserService;
    private db: MysqlDB;
    private userRepo: UserRepo;
    private userMail: UserMail;
    private rolePermissionRepo: RolePermissionRepo;

    constructor(){
        this.db = MysqlDB.getInstance();
        this.userRepo = UserRepo.getInstance();
        this.userMail = UserMail.getInstance();
        this.rolePermissionRepo = RolePermissionRepo.getInstance();
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
            const link: string = `http://localhost:2015/api/activation/${token}`;
            await this.userMail.userConfirmation(user, link);
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
            const session: Session | null = await this.userRepo.getSessionByToken(conn, token);
            const user: User | null = session ? session.getUser : null;
            this.db.closeConnection(conn, true);
            return user;
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async login(email: string, password: string): Promise<Session | null> {
        let conn!: Connection;
        try{
            conn = await this.db.getConnection();
            let token: string | null = null;
            const user: User = await this.userRepo.getUserByEmailAndPassword(conn, email, password);
            if(user){
                if(user.getIsActive == 0) throw new Error('User is not active, Please activate user!');
                token = uuid();
                await this.userRepo.insertSession(conn, user.getId, token);
            }
            const session: Session | null = token ? await this.userRepo.getSessionByToken(conn, token) : null;
            const permissions: Permission[] | null = session ? await this.rolePermissionRepo.getPermissionsByUserId(conn, session.getUser.getId) : null;
            if(session){
                session.getUser.setPermissions = permissions;
            }
            this.db.closeConnection(conn, true);
            return session;
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