import { Connection } from "mysql2/promise";
import { Company } from "../models/Company";
import { ICompanyRepo } from "./interface/ICompanyRepo";
import log from '../utils/logger';

export class CompanyRepo implements ICompanyRepo {

    private static instance: CompanyRepo;

    static getInstance(): CompanyRepo {
        if(!this.instance){
            this.instance = new CompanyRepo();
        }
        return this.instance;
    }

   async newCompany(conn: Connection, company: Company, password: string): Promise<number> {
        const query: string = 'INSERT INTO company (name, email, password, modified_time, created_time) VALUES (?, ?, PASSWORD2(?), NOW(), NOW())';
        const [ResultSetHeader]: any = await conn.execute(query, [company.getName, company.getEmail, password]);
        return ResultSetHeader.insertId;
    }

    async getById(conn: Connection, id: number): Promise<Company> {
        let company!: Company;
        const query = `SELECT ${Company.sql()} FROM company 
                        LEFT JOIN company_avatar ON company.id = company_avatar.company_id
                        WHERE company.id = ?`;
        const [rows] = await conn.execute<any[]>(query, [id]);
        rows.map(row => company = Company.row(row));
        return company;
    }

    async activateCompanyById(conn: Connection, id: number): Promise<void> {
       const query: string = `UPDATE company SET is_active = 1, modified_time = NOW() WHERE id = ?`;
       await conn.execute(query, [id]);
    }

    async getCompanyAvatarIdByCompanyId(conn: Connection, companyId: number): Promise<number> {
        
        return 1;
    }

    async insertCompanyAvatar(conn: Connection, companyId: number, fileName: string, fileExt: string): Promise<void> {
        const query: string = `INSERT INTO company_avatar (company_id, filename, file_ext, modified_time, created_time) VALUES (?, ?, ?, NOW(), NOW())`;
        log.info(`companyId: ${companyId} - fileName: ${fileName} - fileExt: ${fileExt}`);
        await conn.execute(query, [companyId, fileName, fileExt]);
    }

    async updateCompanyAvatar(conn: Connection, companyId: number, fileName: string, fileExt: string): Promise<void> {
        
    }
}