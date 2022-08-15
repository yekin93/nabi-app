import { ActivationRepo } from "../repositories/ActivationRepo";
import {v4 as uuidv4} from 'uuid';
import { Activation } from "../models/Activation";
import { UserRepo } from "../repositories/UserRepository";
import { Connection } from 'mysql2/promise';
import { MysqlDB } from "../db/mysql2";

export class ActivationService {

    private userRepo: UserRepo;
    private db: MysqlDB;
    private static instance: ActivationService;

    constructor(){
        this.db = MysqlDB.getInstance();
        this.userRepo = UserRepo.getInstance();
    }

    static getInstance(): ActivationService {
        if(!this.instance){
            this.instance = new ActivationService();
        }
        return this.instance;
    }

    async createActivation(userId: number): Promise<void> {
        const token: string = uuidv4();
        const conn: Connection = await this.db.getConnection();
        try {
            await ActivationRepo.createActivation(conn, userId, token);
            this.db.closeConnection(conn, true);
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async activateUser(token: string): Promise<void> {
        const conn: Connection = await this.db.getConnection();
        try {
            const activation: Activation = await ActivationRepo.getActivationByToken(conn, token);
            await this.userRepo.activateUserById(conn, activation.getUserId);
            this.db.closeConnection(conn, true);
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
       
    } 
}