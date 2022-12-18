import { Connection } from "mysql2/promise";
import { Company } from "../models/Company";
import { ICompanyRepo } from "./interface/ICompanyRepo";
import log from '../utils/logger';
import { ICompany } from "../interfaces/ICompany";
import { CompanySession } from "../models/CompanySession";
import { CompanyApplication } from "../models/CompanyApplication";

export class CompanyRepo implements ICompanyRepo {
    private static instance: CompanyRepo;

    static getInstance(): CompanyRepo {
        if(!this.instance){
            this.instance = new CompanyRepo();
        }
        return this.instance;
    }

   async newCompany(conn: Connection, company: Company, password: string): Promise<number> {
        const query: string = 'INSERT INTO company (category_id, name, email, password, modified_time, created_time) VALUES (?, ?, ?, PASSWORD2(?), NOW(), NOW())';
        const [ResultSetHeader]: any = await conn.execute(query, [company.getCategoryId, company.getName, company.getEmail, password]);
        return ResultSetHeader.insertId;
    }

    async getById(conn: Connection, id: number): Promise<Company> {
        let company!: Company;
        const query = `SELECT 
                        ${Company.sql()} 
                        ${Company.from()}
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

    async getCompanyByEmailAndPassword(conn: Connection, email: String, password: String): Promise<Company | null> {
        const query = `SELECT ${Company.sql()} ${Company.from()} WHERE email = ? AND password = PASSWORD2(?)`;
        const [rows] = await conn.execute<ICompany[]>(query, [email, password]);
        let company: Company | null = null;
        rows.map((row: ICompany) => company = Company.row(row));
        return company;
    }

    async insertCompanySession(conn: Connection, token: string, companyId: number): Promise<void> {
        const query = `INSERT INTO company_session (company_id, token, created_time) VALUES (?, ?, NOW())`;
        await conn.execute(query, [companyId, token]);
    } 

    async removeSession(conn: Connection, token: string): Promise<void> {
        await conn.execute('UPDATE company_session SET is_deleted = 1 WHERE token = ?', [token]);
    }

    async getCompanyBySessionId(conn: Connection, token: string): Promise<CompanySession | null> {
        const query = `SELECT ${CompanySession.sql()}, ${Company.sql()} FROM company_session 
                        LEFT JOIN company ON company.id = company_session.company_id 
                        LEFT JOIN company_avatar ON company_avatar.company_id = company.id
                        WHERE company_session.token = ? AND company_session.is_deleted = 0`;
        const [rows] = await conn.execute<any[]>(query, [token]);
        let companySession: CompanySession | null = null;
        log.info(`getCompanyBySessionId: sql: ${query} - rows.length = ${rows.length}`);
        rows.map(row => {
            log.info(row.company_session_id);
            companySession = CompanySession.row(row);
            companySession.setCompany = Company.row(row);
        });
        return companySession
    }


    async companyApplication(conn: Connection, companyApplication: CompanyApplication): Promise<void> {
        const query = `INSERT INTO company_application (first_name, surname, email, tel_number, country, city, post_code, company_name, category_id, sales_category_id, modified_date, created_date)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;
        console.log(companyApplication);
        await conn.execute(query, [companyApplication.getFirstName,
                                    companyApplication.getSurname,
                                    companyApplication.getEmail,
                                    companyApplication.getTelNumber,
                                    companyApplication.getCountry,
                                    companyApplication.getCity,
                                    companyApplication.getPostCode,
                                    companyApplication.getCompanyName,
                                    companyApplication.getCategoryId,
                                    companyApplication.getSalesCategoyId
                                ]);
    }

    async getNotAcceptedCompanyApplications(conn: Connection): Promise<CompanyApplication[]> {
        const query = `SELECT ${CompanyApplication.sql()} FROM company_application WHERE company_application.is_deleted = 0 AND company_application.acccepted = 0`;
        const [rows] = await conn.execute<any[]>(query);
        const companyApplications: CompanyApplication[] = [];
        rows.map(row => companyApplications.push(CompanyApplication.row(row)));
        return companyApplications;
    }

    async getCompanyApplicationById(conn: Connection, id: number): Promise<CompanyApplication | null> {
        const query = `SELECT ${CompanyApplication.sql()} FROM company_application WHERE company_application.id = ? AND is_deleted = 0`;
        const [rows] = await conn.execute<any[]>(query, [id]);
        let companyApplication: CompanyApplication | null = null;
        rows.map(row => companyApplication = CompanyApplication.row(row));
        return companyApplication;
    }


    async acceptCompanyApplicationById(conn: Connection, id: number): Promise<void> {
        const query = `UPDATE company_application SET acccepted = 1, modified_date = NOW() WHERE id = ?`;
        conn.execute(query, [id]);
    }
    
}