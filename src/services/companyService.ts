import { Connection } from "mysql2/promise"
import { MysqlDB } from '../db/mysql2';
import { Company } from "../models/Company";
import { CompanyRepo } from "../repositories/CompanyRepo";
import { ICompanyService } from "./interfaces/ICompanyService";
import log from '../utils/logger';
import { User } from "../models/User";
import { getFileExt } from "../utils/fileUtil";
import {v4 as uuid} from 'uuid';
import { CompanySession } from "../models/CompanySession";
import { CompanyApplication } from "../models/CompanyApplication";
import { CompanyMail } from "../mail/CompanyMail";



export class CompanyService implements ICompanyService {


    private db: MysqlDB;

    private static instance: CompanyService;
    private companyRepo!: CompanyRepo;
    private companyMail!: CompanyMail;

    constructor(){
        this.companyRepo = CompanyRepo.getInstance();
        this.db = MysqlDB.getInstance();
        this.companyMail = CompanyMail.getInstance();
    }
    

    async getNotAcceptedCompaynApplication(): Promise<CompanyApplication[]> {
        let conn!: Connection;
        try {
            
            conn = await this.db.getConnection();
            const companyApplications: CompanyApplication[] = await this.companyRepo.getNotAcceptedCompanyApplications(conn);
            this.db.closeConnection(conn, true);
            return companyApplications;
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }
    
    static getInstance(): CompanyService {
        if(!this.instance){
            this.instance = new CompanyService();
        }
        return this.instance;
    }

    async newCompany(company: Company, password: string, file: any): Promise<Company> {
        let conn!: Connection;
        try{
            conn = await this.db.getConnection();
            const companyId: number = await this.companyRepo.newCompany(conn, company, password);
            if(file){
                const fileExt: string | null = getFileExt(file.originalname);
                if(fileExt){
                    await this.companyRepo.insertCompanyAvatar(conn, companyId, file.filename, fileExt);
                }
            }
            const newCompany: Company = await this.companyRepo.getById(conn, companyId);
            this.db.closeConnection(conn, true);
            return newCompany;
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }
    
     
    async activateCompanyById(loggedinUser: User, id: number): Promise<void> {
        let conn!: Connection;
        try {
            conn = await this.db.getConnection();
            const company: Company = await this.companyRepo.getById(conn, id);
            if(company.getIsActive == 1) throw new Error('This company already activated');
            await this.companyRepo.activateCompanyById(conn, company.getId);
            this.db.closeConnection(conn, true);
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async getCompanyBySessionId(token: string): Promise<Company | null> {
        let conn!: Connection;
        try{
            conn = await this.db.getConnection();
            const companySession: CompanySession | null = await this.companyRepo.getCompanyBySessionId(conn,token);
            const company: Company | null = companySession ? companySession.getCompany : null;
            this.db.closeConnection(conn, true);
            return company;
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

   async companyApplication(companyApplication: CompanyApplication): Promise<void> {
        let conn!: Connection;
        try {
            conn = await this.db.getConnection();
            await this.companyRepo.companyApplication(conn, companyApplication);
            log.info('New company application is created...');
            await this.companyMail.companyApplicationMail(companyApplication);
            this.db.closeConnection(conn, true);
        } catch(err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    

    async login(email: string, password: string): Promise<CompanySession | null> {
        let conn!: Connection;
        try {
            conn = await this.db.getConnection();

            let token: string | null = null;
            const company: Company | null = await this.companyRepo.getCompanyByEmailAndPassword(conn, email, password);
            if(company) {
                if(company.getIsActive === 0) throw new Error("Company is not active, Please activate...");
                token = uuid();
                await this.companyRepo.insertCompanySession(conn, token, company.getId);
            }
            const companySession: CompanySession | null = token ? await this.companyRepo.getCompanyBySessionId(conn, token) : null;
            this.db.closeConnection(conn, true);
            return companySession;
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async logout(token: string): Promise<void> {
        let conn!: Connection;
        try {
            conn = await this.db.getConnection();
            await this.companyRepo.removeSession(conn, token);
            this.db.closeConnection(conn, true);
        } catch (err){
            this.db.closeConnection(conn, false);
            throw err;
        }
    }

    async getCompanyApplicationById(id: number): Promise<CompanyApplication | null> {
       let conn!: Connection;
       try {
            conn = await this.db.getConnection();
            const companyApplication: CompanyApplication | null = await this.companyRepo.getCompanyApplicationById(conn, id);
            this.db.closeConnection(conn, true);
            return companyApplication;
       } catch (err) {
           this.db.closeConnection(conn, false);
           throw err;
       }
    }

}