import { Connection } from "mysql2/promise";
import { Company } from "../../models/Company";

export interface ICompanyRepo {

    newCompany(conn: Connection, company: Company, password: string): Promise<Number>;
    getById(conn: Connection, id: number): Promise<Company>;
    activateCompanyById(conn: Connection, id: number): Promise<void>;
}