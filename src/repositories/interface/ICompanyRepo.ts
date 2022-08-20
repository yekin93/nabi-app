import { Connection } from "mysql2/promise";
import { Company } from "../../models/Company";
import { CompanySession } from "../../models/CompanySession";

export interface ICompanyRepo {
    newCompany(conn: Connection, company: Company, password: string): Promise<number>;
    getById(conn: Connection, id: number): Promise<Company>;
    activateCompanyById(conn: Connection, id: number): Promise<void>;
    getCompanyAvatarIdByCompanyId(conn: Connection, companyId: number): Promise<number>;
    insertCompanyAvatar(conn: Connection, companyId: number, fileName: string, fileExt: string): Promise<void>;
    updateCompanyAvatar(conn: Connection, companyId: number, fileName: string, fileExt: string): Promise<void>;
    getCompanyByEmailAndPassword(conn: Connection, email: String, password: String): Promise<Company | null>;
    insertCompanySession(conn: Connection, token: string, companyId: number): Promise<void>;
    removeSession(conn: Connection, token: string): Promise<void>;
    getCompanyBySessionId(conn: Connection, token: string): Promise<CompanySession | null>;

}