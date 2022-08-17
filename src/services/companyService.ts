import { Connection } from "mysql2/promise"
import { MysqlDB } from '../db/mysql2';
import { Company } from "../models/Company";
import { CompanyRepo } from "../repositories/CompanyRepo";
import { ICompanyService } from "./interfaces/ICompanyService";
import log from '../utils/logger';
import { User } from "../models/User";
import { getFileExt } from "../utils/fileUtil";



export class CompanyService implements ICompanyService {


    private db: MysqlDB;

    private static instance: CompanyService;
    private companyRepo!: CompanyRepo;

    constructor(){
        this.companyRepo = CompanyRepo.getInstance();
        this.db = MysqlDB.getInstance();
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
            await this.companyRepo.activateCompanyById(conn, id);
            this.db.closeConnection(conn, true);
        } catch (err) {
            this.db.closeConnection(conn, false);
            throw err;
        }
    }
}